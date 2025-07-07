import React, { useState } from 'react';

export default function DetalhesPontuacao() {
  const [isOpen, setIsOpen] = useState(false); 

  const pontuacoes = [
    { label: "Ações de Conscientização e Educação Interna sobre ODSS", detalhe: "6 ações realizadas", pontos: "25 pts" },
    { label: "ODSs com Atuação da Empresa", detalhe: "7 a 8 ODS abordados", pontos: "20 pts" },
    { label: "ONGs Atingidas por Ações de Voluntariado", detalhe: "5 a 6 ONGs parceiras", pontos: "15 pts" },
    { label: "Colaboradores Engajados em Ações de Voluntariado", detalhe: "6% a 10% dos colaboradores", pontos: "4 pts" },
    { label: "Orçamento Destinado a Voluntariado e Iniciativas Sociais", detalhe: "Até 0.1% do orçamento", pontos: "4 pts" },
  ];

  const totalPontos = pontuacoes.reduce((acc, item) => {
    // Isso é uma simplificação, você precisaria de um parsing mais robusto se os pontos tivessem outra formatação
    const pontosNum = parseInt(item.pontos.replace(' pts', ''));
    return acc + pontosNum;
  }, 0);


  return (
    <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg mb-8 overflow-hidden">
      <div
        className="flex justify-between items-center p-6 cursor-pointer bg-gray-50 border-b border-gray-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-xl font-bold text-[#1B2029]">Detalhamento da Pontuação</h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`w-6 h-6 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </div>

      {isOpen && (
        <div className="p-6">
          {pontuacoes.map((item, index) => (
            <div key={index} className="flex justify-between items-center py-3 border-b last:border-b-0 border-gray-100">
              <div className="flex flex-col">
                <span className="font-semibold text-sm text-[#1B2029]">{item.label}</span>
                <span className="text-xs text-gray-500 mt-1">{item.detalhe}</span>
              </div>
              <span className="font-bold text-[#1B2029] text-sm">{item.pontos}</span>
            </div>
          ))}

          {/* Total */}
          <div className="flex justify-between items-center mt-4 p-4 rounded-b-lg bg-[#E0F2F7] text-[#009FE3] font-bold text-lg">
            <span>Total</span>
            <span>{totalPontos} pontos</span>
          </div>
        </div>
      )}
    </div>
  );
}