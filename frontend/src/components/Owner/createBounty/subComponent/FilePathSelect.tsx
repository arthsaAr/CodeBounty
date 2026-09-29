import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";

type Props = {
  repoId: number | null;
  value: string;
  onChange: (path: string) => void;
};

const MAX_VISIBLE = 100;

const FilePathSelect = ({ repoId, value, onChange }: Props) => {
  const [files, setFiles] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [truncated, setTruncated] = useState(false);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [highlight, setHighlight] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setFiles([]);
    setError(null);
    if (!repoId) return; // no repo selected -> nothing to fetch
    let cancelled = false;

    const load = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `http://localhost:3000/repositories/${repoId}/files`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (cancelled) return;
        console.log("files response:", res.data); // remove once it works
        setFiles(res.data.files ?? []);
        setTruncated(!!res.data.truncated);
      } catch (err: any) {
        if (cancelled) return;
        setError(err.response?.data?.message || "Failed to load files");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => { cancelled = true; };
  }, [repoId]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? files.filter((f) => f.toLowerCase().includes(q)) : files;
  }, [files, query]);

  const visible = filtered.slice(0, MAX_VISIBLE);

  const select = (path: string) => {
    onChange(path);
    setQuery("");
    setOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setHighlight((h) => Math.min(h + 1, visible.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault(); // also stops any surrounding form from submitting
      if (open && visible[highlight]) select(visible[highlight]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const emptyMessage = !repoId
    ? "No repository selected. Go back and pick one."
    : files.length === 0
    ? "This repository has no files to show."
    : "No matching files";

  return (
    <div className="flex flex-col gap-1 mt-2" ref={wrapperRef}>
      <label className="text-sm text-gray-400">
        File path<span className="text-red-600"> *</span>
      </label>

      <div className="relative">
        <input
          type="text"
          disabled={loading || !!error}
          placeholder={loading ? "Loading files..." : "Search and select a file (e.g. src/App.tsx)"}
          value={open ? query : value}
          onFocus={() => { setOpen(true); setQuery(""); setHighlight(0); }}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); setHighlight(0); }}
          onKeyDown={handleKeyDown}
          className="w-full bg-[#0f131a] border border-gray-800 focus:border-emerald-500 outline-none rounded-lg px-3 py-2 text-white placeholder-gray-500 disabled:opacity-50"
        />

        {open && !loading && !error && (
          <div className="absolute z-20 mt-1 w-full max-h-64 overflow-y-auto rounded-lg border border-gray-800 bg-[#0f131a] shadow-lg">
            {visible.length === 0 ? (
              <p className="px-3 py-2 text-sm text-gray-500">{emptyMessage}</p>
            ) : (
              visible.map((path, i) => (
                <div
                  key={path}
                  onMouseDown={(e) => { e.preventDefault(); select(path); }}
                  onMouseEnter={() => setHighlight(i)}
                  className={`px-3 py-2 text-sm cursor-pointer ${
                    i === highlight ? "bg-emerald-500/10" : ""
                  } ${path === value ? "text-emerald-400" : "text-gray-200"}`}
                >
                  {path}
                </div>
              ))
            )}
            {filtered.length > MAX_VISIBLE && (
              <p className="px-3 py-2 text-xs text-gray-500 border-t border-gray-800">
                Showing first {MAX_VISIBLE} of {filtered.length}. Keep typing to narrow down.
              </p>
            )}
          </div>
        )}
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}
      {truncated && (
        <p className="text-xs text-yellow-500">
          This repo is very large, so the file list may be incomplete.
        </p>
      )}
    </div>
  );
};

export default FilePathSelect;