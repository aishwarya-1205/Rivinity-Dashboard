import { createContext, useContext, useState } from "react";

interface FileContextType {
  files: File[];
  addFiles: (newFiles: File[]) => void;
  removeFile: (index: number) => void;
}

const FileContext = createContext<FileContextType | null>(null);

export const FileProvider = ({ children }: { children: React.ReactNode }) => {
  const [files, setFiles] = useState<File[]>([]);

  const addFiles = (newFiles: File[]) => {
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <FileContext.Provider value={{ files, addFiles, removeFile }}>
      {children}
    </FileContext.Provider>
  );
};

export const useFiles = () => {
  const ctx = useContext(FileContext);
  if (!ctx) throw new Error("useFiles must be used inside FileProvider");
  return ctx;
};
