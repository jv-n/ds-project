'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function DetalhesPontuacao() {
  const [isOpen, setIsOpen] = useState(false);
  const [pontuacoes, setPontuacoes] = useState<{
    pontuacaoONGs: number;
    pontuacaoODS: number;
    pontuacaoDoacoes: number;
    pontuacaoTotal: number;
  } | null>(null);

  useEffect(() => {
    const fetchPontuacoes = async () => {
      try {
        const userId = localStorage.getItem('user_id'); // ou a forma correta que seu app usa
        if (!userId) return;
        const { data } = await axios.get(`/users/${userId}/tier`);
        setPontuacoes(data);
      } catch (error) {
        console.error('Erro ao buscar pontuação:', error);
      }
    };

    fetchPontuacoes();
  }, []);

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
          {pontuacoes ? (
            <>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <div className="flex flex-col">
                  <span className="font-semibold text-sm text-[#1B2029]">
                    ONGs diferentes apoiadas
                  </span>
                  <span className="text-xs text-gray-500 mt-1">
                    Pontuação com base no número de ONGs únicas impactadas
                  </span>
                </div>
                <span className="font-bold text-[#1B2029] text-sm">{pontuacoes.pontuacaoONGs} pts</span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <div className="flex flex-col">
                  <span className="font-semibold text-sm text-[#1B2029]">
                    ODSs diferentes apoiadas
                  </span>
                  <span className="text-xs text-gray-500 mt-1">
                    Pontuação baseada na variedade de ODSs apoiadas
                  </span>
                </div>
                <span className="font-bold text-[#1B2029] text-sm">{pontuacoes.pontuacaoODS} pts</span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <div className="flex flex-col">
                  <span className="font-semibold text-sm text-[#1B2029]">
                    Valor total doado
                  </span>
                  <span className="text-xs text-gray-500 mt-1">
                    Quanto maior a contribuição, maior a pontuação
                  </span>
                </div>
                <span className="font-bold text-[#1B2029] text-sm">{pontuacoes.pontuacaoDoacoes} pts</span>
              </div>

              <div className="flex justify-between items-center mt-4 p-4 rounded-b-lg bg-[#E0F2F7] text-[#009FE3] font-bold text-lg">
                <span>Total</span>
                <span>{pontuacoes.pontuacaoTotal} pontos</span>
              </div>
            </>
          ) : (
            <p className="text-sm text-gray-500">Carregando pontuação...</p>
          )}
        </div>
      )}
    </div>
  );
}
