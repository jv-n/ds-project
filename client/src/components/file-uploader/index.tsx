import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { cloudupload, paperclip, ok, problem, loading, close } from '@/assets';

type UploadStatus = 'idle' | 'processing' | 'error' | 'success';

interface FileUploadInputProps {
  label: string;
  subtitle?: string;
  onFilesAttached: (files: File[]) => void;
  maxFiles?: number;
  onStartUploadInteraction?: () => void;
  forceErrorMessage?: string;
}

const FileUploadInput: React.FC<FileUploadInputProps> = ({
  label,
  subtitle,
  onFilesAttached,
  maxFiles = 5,
  onStartUploadInteraction,
  forceErrorMessage,
}) => {
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const statusTimerRef = useRef<NodeJS.Timeout | null>(null);

  const clearStatus = useCallback(() => {
    if (statusTimerRef.current) {
      clearTimeout(statusTimerRef.current);
      statusTimerRef.current = null;
    }
    setUploadStatus('idle');
    setErrorMessage(null);
  }, []);

  const showError = useCallback(
    (msg: string, duration = 2000) => {
      if (statusTimerRef.current) clearTimeout(statusTimerRef.current);
      setUploadStatus('error');
      setErrorMessage(msg);
      statusTimerRef.current = setTimeout(clearStatus, duration);
    },
    [clearStatus]
  );

  useEffect(() => {
    if (forceErrorMessage) {
      if (statusTimerRef.current) clearTimeout(statusTimerRef.current);
      setUploadStatus('error');
      setErrorMessage(forceErrorMessage);
    }
  }, [forceErrorMessage, clearStatus]);

  useEffect(() => {
    onFilesAttached(attachedFiles);
  }, [attachedFiles, onFilesAttached]);

  useEffect(() => {
    return () => {
      if (statusTimerRef.current) clearTimeout(statusTimerRef.current);
    };
  }, []);

  const handleProcessFile = useCallback(
    (file: File) => {
      clearStatus();
      onStartUploadInteraction?.();

      if (attachedFiles.length >= maxFiles) {
        showError(`Limite de ${maxFiles} arquivos atingido.`);
        return;
      }

      const exists = attachedFiles.some(
        f => f.name === file.name && f.size === file.size
      );
      if (exists) {
        showError(`Arquivo "${file.name}" já selecionado.`);
        return;
      }

      setAttachedFiles(prev => [...prev, file]);
      setUploadStatus('success');
      statusTimerRef.current = setTimeout(clearStatus, 2000);
    },
    [attachedFiles, maxFiles, showError, clearStatus, onStartUploadInteraction]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadStatus('processing');
      setErrorMessage(null);
      handleProcessFile(e.target.files[0]);
    } else {
      // Se usuário abrir e fechar sem escolher arquivo
      clearStatus();
    }
    e.target.value = '';
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    onStartUploadInteraction?.();
    setUploadStatus('processing');
    setErrorMessage(null);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    clearStatus();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    onStartUploadInteraction?.();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setUploadStatus('processing');
      setErrorMessage(null);
      handleProcessFile(e.dataTransfer.files[0]);
    } else {
      clearStatus();
    }
  };

  const handleRemoveFile = (index: number) => {
    clearStatus();
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const openFileDialog = () => {
    onStartUploadInteraction?.();
    if (attachedFiles.length < maxFiles) {
      setUploadStatus('processing');
      setErrorMessage(null);
      fileInputRef.current?.click();
    } else {
      showError(`Limite de ${maxFiles} arquivos atingido.`);
    }
  };

  const borderColorClass = {
    idle: 'border-[#89BAFF]',
    processing: 'border-[#89BAFF]',
    error: 'border-[#DB4437]',
    success: 'border-[#11B163]',
  }[uploadStatus];

  const mainContent = () => {
    if (errorMessage) {
      return (
        <>
          <Image
            src={problem}
            alt="Erro"
            width={20}
            height={20}
            className="mx-auto mb-2"
          />
          <p className="mt-2 text-sm text-center text-red-600">
            {errorMessage}
          </p>
        </>
      );
    }

    switch (uploadStatus) {
      case 'idle':
        return (
          <>
            <Image
              src={cloudupload}
              alt="Upload"
              width={20}
              height={20}
              className="mx-auto mb-2"
            />
            <p className="mt-2 text-sm text-center">
              Arraste e solte ou selecione o arquivo
            </p>
          </>
        );
      case 'processing':
        return (
          <>
            <Image
              src={loading}
              alt="Processando"
              width={20}
              height={20}
              className="mx-auto mb-2 animate-spin"
            />
            <p className="mt-2 text-sm text-center">Processando arquivo...</p>
          </>
        );
      case 'success':
        return (
          <>
            <Image
              src={ok}
              alt="Sucesso"
              width={20}
              height={20}
              className="mx-auto mb-2"
            />
            <p className="mt-2 text-sm text-center">
              Arquivo anexado com sucesso!
            </p>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mb-4 text-sm">
      <label
        htmlFor="file-upload"
        className="block text-sm font-bold text-gray-700"
        onClick={e => e.stopPropagation()} // impede abrir ao clicar no label
      >
        {label}
      </label>
      {(subtitle || attachedFiles.length < maxFiles) && (
        <p
          className="text-gray-600 text-xs font-normal leading-tight mb-4"
          onClick={e => e.stopPropagation()} // impede abrir ao clicar no subtítulo
        >
          {subtitle}
          {subtitle && attachedFiles.length < maxFiles && ' '}
          {attachedFiles.length < maxFiles && (
            <span className="text-gray-500">
              ({attachedFiles.length}/{maxFiles})
            </span>
          )}
        </p>
      )}

      <div
        className={`
          border-2 border-dashed rounded-sm
          ${borderColorClass}
          ${uploadStatus === 'processing' ? 'bg-[#C4DCFF]' : 'bg-[#F2F5F7]'}
          transition-colors duration-200 ease-in-out
          py-3 px-4
          h-[136px]
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div
          className="flex flex-col items-center justify-center w-full h-full cursor-pointer"
          onClick={openFileDialog}
        >
          <input
            id="file-upload"
            name="file-upload"
            type="file"
            className="sr-only"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*,.pdf,.doc,.docx"
          />
          {mainContent()}
        </div>
      </div>

      {attachedFiles.length > 0 && (
        <div className="mt-6 space-y-2 w-full">
          {attachedFiles.map((file, index) => (
            <div
              key={file.name + file.size + index}
              className="flex items-center justify-between px-4 py-2 border-[1.5px] border-[#E6E6E6] rounded-sm text-gray-700 bg-[#F2F5F7] h-[38px]"
            >
              <div className="flex items-center flex-grow min-w-0">
                <Image
                  src={paperclip}
                  alt="Clipe"
                  width={20}
                  height={20}
                  className="mr-2"
                />
                <span className="flex-1 min-w-0 text-sm text-[#3D3D3D] truncate">
                  {file.name}
                </span>
              </div>
              <button
                onClick={e => {
                  e.stopPropagation();
                  handleRemoveFile(index);
                }}
                type="button"
                className="text-gray-400 hover:text-gray-100 ml-auto cursor-pointer flex-shrink-0"
              >
                <Image
                  src={close}
                  alt="Fechar"
                  width={20}
                  height={20}
                  className="ml-2"
                />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUploadInput;
