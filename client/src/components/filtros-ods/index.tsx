"use client"
import React, { useState } from 'react';
import { Filter, ChevronDown, X } from 'lucide-react';

const listaODS = [
    "1. Erradicação da Pobreza",
    "2. Fome zero e agricultura sustentável",
    "3. Saúde e bem-estar",
    "4. Educação de qualidade",
    "5. Igualdade de gênero",
    "6. Água potável e saneamento",
    "7. Energia limpa e acessível",
    "8. Trabalho decente e crescimento econômico",
    "9. Indústria, inovação e infraestrutura",
    "10. Redução das desigualdades",
    "11. Cidades e comunidades sustentáveis",
    "12. Consumo e produção responsáveis",
    "13. Ação contra a mudança global do clima",
    "14. Vida na água",
    "15. Vida terrestre",
    "16. Paz, justiça e instituições eficazes",
    "17. Parcerias e meios de implementação",
];

const FiltroODS: React.FC = () => {
    // 1. Controla se a lista de ações (dropdown) está visível
    const[dropDownAberto, setDropDownAberto] = useState(false);

    // 2. Armazena a lista de filtros que foram selecionados na caixinha de seleção (dropdown)
    const[filtrosAtivos, setFiltrosAtivos] = useState<string[]>([]);

    // 3. Adiciona uma ODS à lista de filtros ativos, caso ela ainda não esteja por lá
    const handleSelecaoODS = (ods: string) => {
        if (!filtrosAtivos.includes(ods)) {
            setFiltrosAtivos([... filtrosAtivos, ods])
        }
        setDropDownAberto(false); // Fecha o dropdown após a seleção
    };

    // 4. Remove uma ODS da lista de filtros ativos
    const handleRemocaoODS = (odsParaRemover: string) => {
        setFiltrosAtivos(filtrosAtivos.filter(ods => ods !==odsParaRemover))
    };

    return (
        <div className="flex flex-wrap items-center gap-4">
            {/*Rótulo e ícone do filtro estático*/}
            <div className="flex items-center gap-2 text-sm text-[#1D71B8] font-sans">
                <Filter size={16} />
                <span>Filtros:</span>
            </div>

            {/* Container do Dropdown*/}
            <div className="relative">
                {/* Botão que abre e fecha o dropdown*/}
                <button onClick={() => setDropDownAberto(!dropDownAberto)}
                    className="flex items-center justify-between w-32 px-4 py-2 text-sm font-sans font-medium text-[#1D71B8] bg-white border border-[#1D71B8] rounded-full shadow-sm hover:bg-gray-50"
                    >
                        <span>ODS</span>
                        <ChevronDown size={16}/>
                </button>

                {/*Menu DropDown - aparece apenas se 'dropdownAberto' for true*/}
                {dropDownAberto &&(
                    <div className="absolute top-full mt-2 w-72 bg-white border border-[#DBDBDB] rounded-md shadow-lg z-10">
                        <ul className="max-h-60 overflow-y-auto">
                            {listaODS.map((ods, index) => (
                                <li key={index}>
                                    <button onClick={()=> handleSelecaoODS(ods)}
                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            {ods}
                                    </button>
                                </li> 
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/*Container para as pills dos filtros que estão ativos*/}
            <div className="flex flex-wrap items-center gap-2">
                {filtrosAtivos.map((filtro, index) => (
                    <div key={index} 
                    className="flex items-center gap-2 pl-3 pr-1 py-1 text-sm font-sans font-medium bg-gray-100 text-[#1D71B8] rounded-full"
                    >
                        <span>{filtro.split('. ')[1]}/</span> {/*Mostra só o nome, sem o número */}
                        <button onClick={() => handleRemocaoODS(filtro)}
                            className="p-1 rounded-full hover:bg-gray-300">
                                <X size={14}/>
                            </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FiltroODS;