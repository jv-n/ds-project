import React from 'react';

export interface ChipProps {
  status: 'aguardando' | 'aprovada' | 'reprovada';
}

export default function Chip({ status }: ChipProps) {
  switch (status) {
    case 'aguardando':
      return (
        <div className="inline-flex items-center px-2 py-1 rounded-full font-medium text-xs gap-x-1 font-sans bg-[#FEF9C2] text-[#894B00]">
          <span className="w-2 h-2 rounded-full bg-[#FDC700]"></span>
          <span>Aguardando Revisão</span>
        </div>
      );
      
    case 'aprovada':
      return (
        <div className="inline-flex items-center px-2 py-1 rounded-full font-medium text-xs gap-x-1 font-sans bg-[#E5FFEE] text-[#116415]">
          <span className="w-2 h-2 rounded-full bg-[#7CDD81]"></span>
          <span>Aprovada</span>
        </div>
      );
      
    case 'reprovada':
      return (
        <div className="inline-flex items-center px-2 py-1 rounded-full font-medium text-xs gap-x-1 font-sans bg-[#FFE7E7] text-[#972323]">
          <span className="w-2 h-2 rounded-full bg-[#FF6467]"></span>
          <span>Reprovada</span>
        </div>
      );
      
    default:
      
      return null; 
  }
}