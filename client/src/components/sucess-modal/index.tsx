import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { close } from '@/assets';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
  const modalContentRef = useRef<HTMLDivElement>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true); // inicia fade-in

      const handleClickOutside = (event: MouseEvent) => {
        if (modalContentRef.current && !modalContentRef.current.contains(event.target as Node)) {
          startClosing();
        }
      };

      document.addEventListener('mousedown', handleClickOutside);

      // Fecha automaticamente após 3s
      const timer = setTimeout(() => {
        startClosing();
      }, 3000);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        clearTimeout(timer);
      };
    }
  }, [isOpen]);

  const startClosing = () => {
    setIsClosing(true); // ativa fade-out
    setTimeout(() => {
      setIsClosing(false);
      setIsVisible(false);
      onClose();
    }, 1000); 
  };

  if (!isOpen && !isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-1000 ${
        isClosing ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div
        ref={modalContentRef}
        className="bg-white rounded-sm border-[1.5px] border-[#DBDBDB] shadow-xl w-[480px] h-[224px] p-6 relative flex flex-col items-center justify-center text-center"
      >
        {/* Botão de Fechar */}
        <button
          onClick={startClosing}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer"
          aria-label="Fechar"
        >
          <Image src={close} alt="Ícone de Fechar" width={24} height={24} />
        </button>

        {/* Conteúdo */}
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
          Doação cadastrada com sucesso!
        </h2>
        <p className="text-sm md:text-base text-gray-600">
          Sua doação foi enviada para validação, quando for aprovada você será notificado.
        </p>
      </div>
    </div>
  );
}
