import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";

type Props = {
  repoId: number | null;
  value: string;
  onChange: (path: string) => void;
};

const MAX_VISIBLE = 100; // render cap so huge repos don't lag

const FilePathSelect = ({ repoId, value, onChange }: Props) => {
  const [files, setFiles] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [truncated, setTruncated] = useState(false);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Fetch files whenever the selected repo changes
  useEffect(() => {
    if (!repoId) return;
    let cancelled = false;

    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `http://localhost:3000/repositories/${repoId}/files`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (cancelled) return;
        setFiles(res.data.files);
        setTruncated(res.data.truncated);
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

  // Close dropdown on outside click
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
    const list = q ? files.filter((f) => f.toLowerCase().includes(q)) : files;
    return list;
  }, [files, query]);

  const visible = filtered.slice(0, MAX_VISIBLE);

  return (
    <div className="flex flex-col gap-1 mt-2" ref={wrapperRef}>
      <label className="text-sm text-gray-400">
        File path<span className="text-red-600"> *</span>
      </label>

      <div className="relative">
        <input
          type="text"
          disabled={loading || !!error}
          placeholder={
            loading ? "Loading files..." : "Search and select a file (e.g. src/App.tsx)"
          }
          value={open ? query : value}
          onFocus={() => { setOpen(true); setQuery(""); }}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          className="w-full bg-[#0f131a] border border-gray-800 focus:border-emerald-500 outline-none rounded-lg px-3 py-2 text-white placeholder-gray-500 disabled:opacity-50"
        />

        {open && !loading && !error && (
          <div className="absolute z-20 mt-1 w-full max-h-64 overflow-y-auto rounded-lg border border-gray-800 bg-[#0f131a] shadow-lg">
            {visible.length === 0 ? (
              <p className="px-3 py-2 text-sm text-gray-500">No matching files</p>
            ) : (
              visible.map((path) => (
                <div
                  key={path}
                  onMouseDown={(e) => {
                    e.preventDefault(); // keep input from blurring first
                    onChange(path);
                    setQuery("");
                    setOpen(false);
                  }}
                  className={`px-3 py-2 text-sm cursor-pointer hover:bg-emerald-500/10 ${
                    path === value ? "text-emerald-400" : "text-gray-200"
                  }`}
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