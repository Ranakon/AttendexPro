
import React, { useRef, useState } from 'react';

interface FileUploadProps {
  onFileSelect: (base64: string) => void;
  isLoading: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, isLoading }) => {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      // Remove data:image/jpeg;base64, prefix for Gemini
      const base64Content = base64.split(',')[1];
      onFileSelect(base64Content);
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
      e.target.value = ""; // Reset file input
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div 
      className={`relative group cursor-pointer border-2 border-dashed rounded-2xl p-12 transition-all duration-300 ${
        dragActive 
          ? "border-indigo-500 bg-indigo-50" 
          : "border-gray-300 hover:border-indigo-400 hover:bg-gray-50"
      } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={() => !isLoading && fileInputRef.current?.click()}
    >
      <input 
        type="file" 
        className="hidden" 
        ref={fileInputRef} 
        onChange={handleChange}
        accept="image/*"
        disabled={isLoading}
      />
      
      <div className="flex flex-col items-center justify-center text-center space-y-4">
        <div className={`p-4 rounded-full transition-colors ${dragActive ? "bg-indigo-100 text-indigo-600" : "bg-gray-100 text-gray-500 group-hover:bg-indigo-50 group-hover:text-indigo-500"}`}>
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </div>
        <div>
          <p className="text-xl font-semibold text-gray-700">
            {isLoading ? "Processing Register..." : "Upload Attendance Register"}
          </p>
          <p className="text-gray-500 mt-1">
            Drag and drop your photo here, or click to browse
          </p>
        </div>
        <div className="flex gap-2 text-xs text-gray-400 mt-4">
          <span className="px-2 py-1 bg-gray-100 rounded">JPG</span>
          <span className="px-2 py-1 bg-gray-100 rounded">PNG</span>
          <span className="px-2 py-1 bg-gray-100 rounded">WEBP</span>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
