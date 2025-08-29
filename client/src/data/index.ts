/* eslint-disable react-hooks/rules-of-hooks */
interface MockFile {
  name: string;
  size: number;
  type: string;
  lastModified: number;
  uploadedAt: string; // da pra colocar aqui a url quando for fazer o back 
}

const LOCAL_STORAGE_KEY = 'uploadedFilesMock'; // Chave para o localStorage

import { useState, useEffect } from 'react';

const useUploadedFiles = () => {
  const [uploadedFiles, setUploadedFiles] = useState<MockFile[]>([]);

  useEffect(() => {
    const storedFiles = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
    setUploadedFiles(storedFiles);
  }, []);

  const saveToLocalStorage = (files: MockFile[]) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(files));
  };

  return { uploadedFiles, setUploadedFiles, saveToLocalStorage };
};

export const saveFile = (file: File): Promise<{ success: true; fileName: string }> => {
 
  const uploadedFiles = useUploadedFiles().uploadedFiles;
  const saveToLocalStorage = useUploadedFiles().saveToLocalStorage;
  return new Promise((resolve) => {
    setTimeout(() => {
      uploadedFiles.push({
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified,
        uploadedAt: new Date().toISOString()
      });
      saveToLocalStorage(uploadedFiles); // Salva os props do arquivo no localStorage
      console.log("Arquivo salvo (mock e localStorage):", file.name);
      console.log("Todos os arquivos salvos (mock):", uploadedFiles.map(f => f.name));
      resolve({ success: true, fileName: file.name });
    }, 500);
  });
};

export const getUploadedFiles = (): MockFile[] => {
  const uploadedFiles = useUploadedFiles().uploadedFiles;
  return [...uploadedFiles];
};