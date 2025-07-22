import React, { useRef, useEffect } from 'react'; 
import Image from 'next/image';
import { close } from '@/assets'; 

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
  const modalContentRef = useRef<HTMLDivElement>(null); 

  useEffect(() => {
    if (isOpen) {
      const handleClickOutside = (event: MouseEvent) => {
        if (modalContentRef.current && !modalContentRef.current.contains(event.target as Node)) {
          onClose();
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen, onClose]); 

  if (!isOpen) return null; 

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        ref={modalContentRef} 
        className="bg-white rounded-sm border-[1.5px] border-[#DBDBDB] shadow-xl w-[480px] h-[224px] p-6 relative flex flex-col items-center justify-center text-center"
      >
        
        {/* Botão de Fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer"
          aria-label="Fechar"
        >
          <Image
            src={close}
            alt="Ícone de Fechar"
            width={24}
            height={24}
          />
        </button>

        {/* Conteúdo do Modal */}
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