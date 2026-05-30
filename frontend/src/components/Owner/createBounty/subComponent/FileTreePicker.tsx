import React, { useState, useEffect, useCallback } from 'react';
import { FaFolder, FaFolderOpen, FaFile, FaChevronRight, FaChevronDown, FaSpinner } from 'react-icons/fa';

type TreeNode = {
  path: string;
  mode: string;
  type: 'blob' | 'tree';
  sha: string;
  size?: number;
  url: string;
};

type TreeEntry = {
  name: string;
  path: string;
  type: 'blob' | 'tree';
  children?: TreeEntry[];
  expanded?: boolean;
};

type FileTreePickerProps = {
  repoUrl: string;
  selectedPath: string;
  onSelect: (path: string) => void;
};

/**
 * Parse a flat list of GitHub tree entries into a nested tree structure.
 * Only includes blob (file) and tree (directory) entries.
 */
function buildTree(entries: TreeNode[]): TreeEntry[] {
  const root: TreeEntry[] = [];
  const dirMap = new Map<string, TreeEntry>();

  // Sort: directories first, then files, alphabetically
  const sorted = [...entries].sort((a, b) => {
    if (a.type !== b.type) return a.type === 'tree' ? -1 : 1;
    return a.path.localeCompare(b.path);
  });

  for (const entry of sorted) {
    const parts = entry.path.split('/');
    const name = parts[parts.length - 1];

    const treeEntry: TreeEntry = {
      name,
      path: entry.path,
      type: entry.type,
      children: entry.type === 'tree' ? [] : undefined,
      expanded: false,
    };

    if (parts.length === 1) {
      root.push(treeEntry);
      if (entry.type === 'tree') {
        dirMap.set(entry.path, treeEntry);
      }
    } else {
      const parentPath = parts.slice(0, -1).join('/');
      const parent = dirMap.get(parentPath);
      if (parent && parent.children) {
        parent.children.push(treeEntry);
      } else {
        // Parent not found (shouldn't happen with sorted input), add to root
        root.push(treeEntry);
      }
      if (entry.type === 'tree') {
        dirMap.set(entry.path, treeEntry);
      }
    }
  }

  return root;
}

/**
 * Extract owner/repo from a GitHub URL.
 * Supports: https://github.com/owner/repo, git@github.com:owner/repo.git
 */
function parseRepoUrl(url: string): { owner: string; repo: string } | null {
  // HTTPS format
  const httpsMatch = url.match(/github\.com\/([^/]+)\/([^/.]+)/);
  if (httpsMatch) {
    return { owner: httpsMatch[1], repo: httpsMatch[2] };
  }
  // SSH format
  const sshMatch = url.match(/github\.com:([^/]+)\/([^/.]+)/);
  if (sshMatch) {
    return { owner: sshMatch[1], repo: sshMatch[2] };
  }
  return null;
}

const FileTreePicker: React.FC<FileTreePickerProps> = ({ repoUrl, selectedPath, onSelect }) => {
  const [tree, setTree] = useState<TreeEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(new Set());

  const fetchTree = useCallback(async () => {
    const parsed = parseRepoUrl(repoUrl);
    if (!parsed) {
      setError('Invalid repository URL');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const apiUrl = `https://api.github.com/repos/${parsed.owner}/${parsed.repo}/git/trees/main?recursive=1`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        // Try 'master' branch as fallback
        const masterResponse = await fetch(
          `https://api.github.com/repos/${parsed.owner}/${parsed.repo}/git/trees/master?recursive=1`
        );
        if (!masterResponse.ok) {
          throw new Error(`Failed to fetch file tree: ${response.status}`);
        }
        const data = await masterResponse.json();
        setTree(buildTree(data.tree.filter((n: TreeNode) => n.type === 'blob' || n.type === 'tree')));
        return;
      }

      const data = await response.json();
      setTree(buildTree(data.tree.filter((n: TreeNode) => n.type === 'blob' || n.type === 'tree')));
    } catch (err: any) {
      setError(err.message || 'Failed to load file tree');
    } finally {
      setLoading(false);
    }
  }, [repoUrl]);

  useEffect(() => {
    if (repoUrl) {
      fetchTree();
    }
  }, [repoUrl, fetchTree]);

  const toggleExpand = (path: string) => {
    setExpandedPaths((prev) => {
      const next = new Set(prev);
      if (next.has(path)) {
        next.delete(path);
      } else {
        next.add(path);
      }
      return next;
    });
  };

  const renderEntry = (entry: TreeEntry, depth: number = 0): React.ReactNode => {
    const isExpanded = expandedPaths.has(entry.path);
    const isSelected = selectedPath === entry.path;
    const isDir = entry.type === 'tree';

    return (
      <div key={entry.path}>
        <div
          className={`flex items-center gap-1 px-2 py-1 cursor-pointer rounded text-sm
            ${isSelected ? 'bg-emerald-500/20 text-emerald-400' : 'text-gray-300 hover:bg-white/5'}
          `}
          style={{ paddingLeft: `${depth * 16 + 8}px` }}
          onClick={() => {
            if (isDir) {
              toggleExpand(entry.path);
            } else {
              onSelect(entry.path);
            }
          }}
        >
          {isDir ? (
            <>
              {isExpanded ? (
                <FaChevronDown size={10} className="text-gray-500 flex-shrink-0" />
              ) : (
                <FaChevronRight size={10} className="text-gray-500 flex-shrink-0" />
              )}
              {isExpanded ? (
                <FaFolderOpen size={14} className="text-yellow-500 flex-shrink-0" />
              ) : (
                <FaFolder size={14} className="text-yellow-500 flex-shrink-0" />
              )}
            </>
          ) : (
            <>
              <span className="w-[10px] flex-shrink-0" />
              <FaFile size={14} className="text-blue-400 flex-shrink-0" />
            </>
          )}
          <span className="truncate ml-1">{entry.name}</span>
        </div>
        {isDir && isExpanded && entry.children && (
          <div>
            {entry.children.map((child) => renderEntry(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-gray-400 py-4">
        <FaSpinner className="animate-spin" />
        <span>Loading file tree...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-400 text-sm py-2">
        <p>{error}</p>
        <button
          onClick={fetchTree}
          className="text-emerald-400 hover:underline mt-1"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="border border-gray-800 rounded-lg bg-[#0f131a] max-h-64 overflow-auto">
      {tree.length === 0 ? (
        <p className="text-gray-500 text-sm p-3">No files found</p>
      ) : (
        <div className="py-1">
          {tree.map((entry) => renderEntry(entry))}
        </div>
      )}
      {selectedPath && (
        <div className="border-t border-gray-800 px-3 py-2 text-xs text-emerald-400">
          Selected: {selectedPath}
        </div>
      )}
    </div>
  );
};

export default FileTreePicker;
