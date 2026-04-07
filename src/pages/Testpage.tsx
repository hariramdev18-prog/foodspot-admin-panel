import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const Testpage = () => {
  const [files, setFiles] = useState<File[]>([]);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prev) => [...prev, ...acceptedFiles]);
  }, []);
  // Initialize the hook
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
      "application/pdf": [".pdf"],
    },
    multiple: true,
  });
  const handleSubmit = () => {
    console.log("Submitted");
    const formData = new FormData();
    formData.append("image",files);
  };

  return (
    <div>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Upload with useDropzone</h1>

        <div
          {...getRootProps()}
          className={`h-64 w-full flex flex-col items-center justify-center border-2 border-dashed rounded-xl transition-all cursor-pointer
            ${
              isDragActive
                ? "border-emerald-500 bg-emerald-500/10 scale-[1.02]"
                : "border-slate-700 bg-slate-800/50 hover:bg-slate-800"
            }`}
        >
          <input {...getInputProps()} />

          <div className="text-center">
            {isDragActive ? (
              <p className="text-emerald-400 text-lg font-semibold animate-pulse">
                Drop the files here...
              </p>
            ) : (
              <>
                <p className="text-lg font-semibold text-slate-200">
                  <span className="text-emerald-400 font-bold">
                    Click to upload
                  </span>{" "}
                  or drag & drop
                </p>
                <p className="text-slate-400 text-sm mt-2">
                  Images or PDFs are welcome
                </p>
              </>
            )}
          </div>
        </div>

        {/* FILE PREVIEW LIST */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {files.map((file, index) => (
            <div
              key={index}
              className="p-4 bg-slate-800 border border-slate-700 rounded-lg flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">
                  {file.type.includes("pdf") ? "📄" : "🖼️"}
                </span>
                <div>
                  <p className="text-sm font-medium truncate w-40">
                    {file.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
              <button
                onClick={() => setFiles(files.filter((_, i) => i !== index))}
                className="text-slate-500 hover:text-red-400 transition-colors"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testpage;
