import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { cloudupload, paperclip, ok, problem, loading, close } from '@/assets'; 

type UploadStatus = 'idle' | 'processing' | 'error' | 'success'; // 'loading' renomeado para 'processing' para clareza local

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

  const statusTimerRef = useRef<NodeJS.Timeout | null>(null); // Um único timer para sucesso/erro

  // Effect para notificar o componente pai sobre mudanças nos arquivos
  useEffect(() => {
    onFilesAttached(attachedFiles);
  }, [attachedFiles, onFilesAttached]);

  // Effect para limpar timers ao desmontar o componente
  useEffect(() => {
    return () => {
      if (statusTimerRef.current) {
        clearTimeout(statusTimerRef.current);
      }
    };
  }, []);

  // Função para processar e adicionar um arquivo
  const handleProcessFile = useCallback((file: File) => {
    // Limpa qualquer timer de status anterior
    if (statusTimerRef.current) {
      clearTimeout(statusTimerRef.current);
      statusTimerRef.current = null;
    }

    setErrorMessage(null); // Limpa mensagens de erro anteriores

    // 1. Verificar o limite de arquivos
    if (attachedFiles.length >= maxFiles) {
      setUploadStatus('error');
      setErrorMessage(`Limite de ${maxFiles} arquivos atingido.`);
      statusTimerRef.current = setTimeout(() => {
        setUploadStatus('idle');
        setErrorMessage(null);
      }, 2000); // Exibe erro por 2 segundos
      return;
    }

    // 2. Verificar se o arquivo já existe na lista
    const fileExists = attachedFiles.some(f => f.name === file.name && f.size === file.size);
    if (fileExists) {
      setUploadStatus('error');
      setErrorMessage(`Arquivo "${file.name}" já selecionado.`);
      statusTimerRef.current = setTimeout(() => {
        setUploadStatus('idle');
        setErrorMessage(null);
      }, 2000); // Exibe erro por 2 segundos
      return;
    }
    
    // Se passou nas validações, adiciona o arquivo e define status de sucesso
    setAttachedFiles((prevFiles) => [...prevFiles, file]);
    setUploadStatus('success');
    setErrorMessage(null); // Garante que não há erro visível

    statusTimerRef.current = setTimeout(() => {
      setUploadStatus('idle'); // Volta para idle após 2 segundos
    }, 2000);

  }, [attachedFiles, maxFiles]);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setUploadStatus('processing'); // Mostra "Carregando..." enquanto processa localmente
      handleProcessFile(file);
    } else {
      // Se o usuário cancelou a seleção de arquivo, volta para idle
      setUploadStatus('idle');
      setErrorMessage(null);
    }
    event.target.value = ''; // Limpa o input para permitir selecionar o mesmo arquivo novamente
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    // Mostra "Carregando..." quando um item é arrastado sobre a área
    setUploadStatus('processing');
    setErrorMessage(null);
  };
  
  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    // Se o usuário arrastou para fora, volta para idle
    setUploadStatus('idle');
    setErrorMessage(null);
  };

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setUploadStatus('processing'); // Mostra "Carregando..." enquanto processa localmente

    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      handleProcessFile(file);
    } else {
      // Se não houver arquivos no drop (e.g., arrastou algo que não é arquivo), volta para idle
      setUploadStatus('idle');
      setErrorMessage(null);
    }
  };

  const handleRemoveFile = (indexToRemove: number) => {
    // Limpa timers ao remover, para que o status não seja sobrescrito por um timer antigo
    if (statusTimerRef.current) {
      clearTimeout(statusTimerRef.current);
      statusTimerRef.current = null;
    }

    setAttachedFiles((prevFiles) => {
      const newFiles = prevFiles.filter((_, index) => index !== indexToRemove);
      // Após remover, o status volta para idle e limpa qualquer erro
      setUploadStatus('idle');
      setErrorMessage(null);
      return newFiles;
    });
  };

  const handleDivClick = () => {
    if (attachedFiles.length < maxFiles) {
      setUploadStatus('processing'); // Define para "processing" antes de abrir o seletor
      setErrorMessage(null);
      fileInputRef.current?.click();
    } else {
      setUploadStatus('error');
      setErrorMessage(`Limite de ${maxFiles} arquivos atingido.`);
      statusTimerRef.current = setTimeout(() => {
        setUploadStatus('idle');
        setErrorMessage(null);
      }, 2000);
    }
  };

  const borderColorClass = {
    'idle': 'border-[#89BAFF]',
    'processing': 'border-[#89BAFF]', // Cor para "processando"
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
      case 'processing': // Estado para indicar processamento local
        return (
          <>
            <Image
              src={loading}
              alt="Processando..."
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
              alt="Arquivo anexado"
              width={20}
              height={20}
              className="mx-auto mb-2"
            />
            <p className="mt-2 text-sm text-center">Arquivo anexado com sucesso!</p>
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
            uploadStatus === 'processing' ? 'bg-[#C4DCFF]' : // Cor para "processing"
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
              key={file.name + file.size + index} // Melhorar key para evitar conflitos
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
                  className="ml-2" // Adicionado margem para o ícone de fechar
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