import React, { useState, useRef, useEffect, useCallback } from 'react';
import { saveFile } from '@/data'; 
import Image from 'next/image';
import { cloudupload, paperclip, ok, problem, loading, close } from '@/assets'; 

type UploadStatus = 'idle' | 'loading' | 'error' | 'success';

interface FileUploadInputProps {
  label: string;
  subtitle?: string;
  onFilesAttached: (files: File[]) => void;
  maxFiles?: number;
}

const FileUploadInput: React.FC<FileUploadInputProps> = ({ label, subtitle, onFilesAttached, maxFiles = 5 }) => {
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const successTimerRef = useRef<NodeJS.Timeout | null>(null);
  const errorTimerRef = useRef<NodeJS.Timeout | null>(null); 
  const isFileInputOpenRef = useRef(false); 

  // Effect para notificar o componente pai sobre mudanças nos arquivos
  useEffect(() => {
    onFilesAttached(attachedFiles);
  }, [attachedFiles, onFilesAttached]);

  // Effect para limpar timers ao desmontar o componente
  useEffect(() => {
    return () => {
      if (successTimerRef.current) {
        clearTimeout(successTimerRef.current);
      }
      if (errorTimerRef.current) { 
        clearTimeout(errorTimerRef.current);
      }
    };
  }, []);

  // Effect para gerenciar o estado 'loading' ao abrir janela de arquvios
  useEffect(() => {
    const handleWindowFocus = () => {
      if (isFileInputOpenRef.current && uploadStatus === 'loading' && !errorMessage) {
        setTimeout(() => {
          if (uploadStatus === 'loading' && !errorMessage) {
            setUploadStatus('idle'); 
          }
          isFileInputOpenRef.current = false;
        }, 50); 
      }
    };

    window.addEventListener('focus', handleWindowFocus);
    return () => {
      window.removeEventListener('focus', handleWindowFocus);
    };
  }, [uploadStatus, errorMessage]); 


  const handleUploadAndSave = useCallback(async (file: File) => {
    if (successTimerRef.current) {
      clearTimeout(successTimerRef.current);
      successTimerRef.current = null;
    }
    if (errorTimerRef.current) { 
      clearTimeout(errorTimerRef.current);
      errorTimerRef.current = null;
    }

    setUploadStatus('loading'); 
    setErrorMessage(null);

    // 1. Verificar o limite de arquivos antes de qualquer outra validação
    if (attachedFiles.length >= maxFiles) {
        setUploadStatus('error');
        setErrorMessage(`Limite de ${maxFiles} arquivos atingido.`);
        errorTimerRef.current = setTimeout(() => {
            setUploadStatus('idle');
            setErrorMessage(null);
        }, 2000); 
        return; 
    }

    // 2. Verificar se o arquivo já existe na lista
    const fileExists = attachedFiles.some(f => f.name === file.name && f.size === file.size);
    if (fileExists) {
        setUploadStatus('error');
        setErrorMessage(`Arquivo já selecionado.`); 
        errorTimerRef.current = setTimeout(() => {
            setUploadStatus('idle');
            setErrorMessage(null);
        }, 2000); 
        return; 
    }
    
    try {
      await saveFile(file); // Simulação do upload (mock)

      setAttachedFiles((prevFiles) => {
        if (!prevFiles.some(f => f.name === file.name && f.size === file.size) && prevFiles.length < maxFiles) {
          return [...prevFiles, file];
        }
        return prevFiles;
      });

      setUploadStatus('success');
      setErrorMessage(null);

      successTimerRef.current = setTimeout(() => {
        setUploadStatus('idle');
        setErrorMessage(null);
      }, 2000);

    } catch (error: any) {
      console.error("Erro inesperado no upload/salvamento do arquivo:", error);
      setUploadStatus('error');
      setErrorMessage(error.message || 'Falha inesperada ao anexar o arquivo.');
      errorTimerRef.current = setTimeout(() => {
        setUploadStatus('idle');
        setErrorMessage(null);
      }, 2000); 
    }
  }, [attachedFiles, maxFiles]); 


  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    isFileInputOpenRef.current = false; 
    
    if (event.target.files && event.target.files.length > 0) {
        const file = event.target.files[0];
        await handleUploadAndSave(file);
    } else {
        if (uploadStatus === 'loading' && !errorMessage) {
            setUploadStatus('idle');
            setErrorMessage(null);
        }
    }
    event.target.value = ''; 
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    // Quando começa o drag, pode ir para loading se não estiver já em um estado final
    if (uploadStatus === 'idle' || uploadStatus === 'success' || uploadStatus === 'error') {
      setUploadStatus('loading');
      setErrorMessage(null);
    }
    isFileInputOpenRef.current = true; 
  };
 
  // Para caso de desistência de drop
  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault(); 
    if (isFileInputOpenRef.current && uploadStatus === 'loading' && attachedFiles.length === 0 && !errorMessage) {
        setUploadStatus('idle');
        setErrorMessage(null);
        isFileInputOpenRef.current = false; 
    }
  };

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    isFileInputOpenRef.current = false; // O drop aconteceu, então a interação com o input terminou

    if (uploadStatus !== 'loading') { 
      setUploadStatus('loading');
      setErrorMessage(null);
    }

    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      await handleUploadAndSave(file);
    } else {
      // Se não houver arquivos no drop (e.g., arrastou algo que não é arquivo),
      // volta para idle (se não houver erro anterior ou arquivos)
      if (uploadStatus === 'loading' && !errorMessage) {
        setUploadStatus('idle');
        setErrorMessage(null);
      }
    }
  };

  const handleRemoveFile = (indexToRemove: number) => {
    // Limpa timers ao remover, para que o status não seja sobrescrito por um timer antigo
    if (successTimerRef.current) {
      clearTimeout(successTimerRef.current);
      successTimerRef.current = null;
    }
    if (errorTimerRef.current) { 
      clearTimeout(errorTimerRef.current);
      errorTimerRef.current = null;
    }

    setAttachedFiles((prevFiles) => {
      const newFiles = prevFiles.filter((_, index) => index !== indexToRemove);

      // Define o status após a remoção
      // Se não há mais arquivos, volta para idle.
      // Se era erro, limpa o erro e volta para idle.
      // Caso contrário, volta para idle.
      if (newFiles.length === 0 || uploadStatus === 'error' || uploadStatus === 'success') {
        setUploadStatus('idle');
        setErrorMessage(null);
      }
      // Se o status já era 'idle' antes da remoção, ele continua 'idle'.

      return newFiles;
    });
  };

  const handleDivClick = () => {
    if (attachedFiles.length < maxFiles) {
      setUploadStatus('loading'); // Define para loading antes de abrir o seletor
      setErrorMessage(null);
      isFileInputOpenRef.current = true; // Marca que o gerenciador de arquivos está prestes a abrir
      fileInputRef.current?.click();
    } else {
      setUploadStatus('error');
      setErrorMessage(`Limite de ${maxFiles} arquivos atingido.`);
      errorTimerRef.current = setTimeout(() => {
        setUploadStatus('idle');
        setErrorMessage(null);
      }, 2000);
    }
  };

  const borderColorClass = {
    'idle': 'border-[#89BAFF]',
    'loading': 'border-[#89BAFF]',
    'error': 'border-[#DB4437]',
    'success': 'border-[#11B163]'
  }[uploadStatus];

  const mainContent = () => {
    if (errorMessage) {
      return (
        <>
          <Image
            src={problem}
            alt="Erro ao anexar arquivo"
            width={20}
            height={20}
            className="mx-auto mb-2"
          />
          <p className="mt-2 text-sm text-center">{errorMessage}</p>
        </>
      );
    }

    switch (uploadStatus) {
      case 'idle':
        return (
          <>
            <Image
              src={cloudupload}
              alt="Ícone de upload na nuvem"
              width={20}
              height={20}
              className="mx-auto mb-2"
            />
            <p className="mt-2 text-sm text-center">Arraste e solte ou selecione o arquivo</p>
          </>
        );
      case 'loading':
        return (
          <>
            <Image
              src={loading}
              alt="Carregando..."
              width={20}
              height={20}
              className="mx-auto mb-2 animate-spin"
            />
            <p className="mt-2 text-sm text-center">Carregando...</p>
          </>
        );
      case 'success':
        return (
          <>
            <Image
              src={ok}
              alt="Carregamento concluído"
              width={20}
              height={20}
              className="mx-auto mb-2"
            />
            <p className="mt-2 text-sm text-center">Carregamento concluído</p>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mb-4">
      <label htmlFor="file-upload" className="block text-sm font-bold text-gray-700">
        {label}
      </label>
      {(subtitle || attachedFiles.length < maxFiles) && (
        <p className="text-gray-600 text-xs font-normal leading-tight mb-4">
          {subtitle}
          {subtitle && attachedFiles.length < maxFiles && ' '}
          {attachedFiles.length < maxFiles && (
            <span className="text-gray-500">
              ({`${attachedFiles.length}/${maxFiles}`})
            </span>
          )}
        </p>
      )}

      <div
        className={`
          flex flex-col items-center justify-center p-6
          border-2 border-dashed rounded-sm cursor-pointer
          ${borderColorClass} ${
            uploadStatus === 'loading' ? 'bg-[#C4DCFF]' :
            uploadStatus === 'error' ? 'bg-[#F2F5F7]' :
            uploadStatus === 'success' ? 'bg-[#F2F5F7]' :
            'bg-[#F2F5F7]'
          }
          transition-colors duration-200 ease-in-out
          py-4 px-6
          h-[136px]
        `}
        onClick={handleDivClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
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
                  alt="Ícone de Clipe de Papel"
                  width={20}
                  height={20}
                  className="mr-2"
                />
                <span className="flex-1 min-w-0 text-sm leading-5 text-[#3D3D3D] truncate">{file.name}</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveFile(index);
                }}
                type="button"
                className="text-gray-400 hover:text-gray-100 ml-auto cursor-pointer flex-shrink-0"
                aria-label={`Remover arquivo ${file.name}`}
              >
                <Image
                  src={close}
                  alt="Ícone de Fechar"
                  width={20}
                  height={20}
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