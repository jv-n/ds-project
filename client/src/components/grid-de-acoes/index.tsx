"use client"
import React from 'react';
import Cardacao, { Cardacaoprops } from "@/components/card-de-acao";
import { useState } from 'react';
import Modalcontatos from "@/components/modal-contato"

const arrayAcoes: Omit<Cardacaoprops, 'onEntrarContato'>[] = [
    {
        nomeacao: "Sustentando Vidas",
        descricao: "Garantir o funcionamento mensal das açõe sociais da Obras Sociais Padre Romeu.",
        ods1: "Saúde e Bem-estar",
        ods2: "Educação de Qualidade",
        ods3: "Redução das Desigualdades",
        ods4: "",
        nomedaong: "Obras Sociais Padre Romeu",
        emailong: "padreromeu@contato.com.br",
        numeroong: "(81)99125003",
    },
    {
        nomeacao: "Casa Terapêutica para os Autistas",
        descricao: "Manutenção do espaço físico que oferece acolhimento e terapias especializadas para crianças com autismo.",
        ods1: "Fome Zero e Agricultura Sustentável",
        ods2: "Erradicação da Pobreza",
        ods3: "Saúde e Bem-estar",
        ods4: "",
        nomedaong: "Juntas somos mais fortes famílias de crianças autistas",
        emailong: "ctpa@contato.com.br",
        numeroong: "(81)99125003",
    },
    {
        nomeacao: "Casa Terapêutica para os Autistas",
        descricao: "Manutenção do espaço físico que oferece acolhimento e terapias especializadas para crianças com autismo.",
        ods1: "Fome Zero e Agricultura Sustentável",
        ods2: "Erradicação da Pobreza",
        ods3: "Saúde e Bem-estar",
        ods4: "",
        nomedaong: "Juntas somos mais fortes famílias de crianças autistas",
        emailong: "ctpa@contato.com.br",
        numeroong: "(81)99125003",
    },
    {
        nomeacao: "Casa Terapêutica para os Autistas",
        descricao: "Manutenção do espaço físico que oferece acolhimento e terapias especializadas para crianças com autismo.",
        ods1: "Fome Zero e Agricultura Sustentável",
        ods2: "Erradicação da Pobreza",
        ods3: "Saúde e Bem-estar",
        ods4: "",
        nomedaong: "Juntas somos mais fortes famílias de crianças autistas",
        emailong: "ctpa@contato.com.br",
        numeroong: "(81)99125003",
    },
    {
        nomeacao: "Casa Terapêutica para os Autistas",
        descricao: "Manutenção do espaço físico que oferece acolhimento e terapias especializadas para crianças com autismo.",
        ods1: "Fome Zero e Agricultura Sustentável",
        ods2: "Erradicação da Pobreza",
        ods3: "Saúde e Bem-estar",
        ods4: "",
        nomedaong: "Juntas somos mais fortes famílias de crianças autistas",
        emailong: "ctpa@contato.com.br",
        numeroong: "(81)99125003",
    },
    {
        nomeacao: "Casa Terapêutica para os Autistas",
        descricao: "Manutenção do espaço físico que oferece acolhimento e terapias especializadas para crianças com autismo.",
        ods1: "Fome Zero e Agricultura Sustentável",
        ods2: "Erradicação da Pobreza",
        ods3: "Saúde e Bem-estar",
        ods4: "",
        nomedaong: "Juntas somos mais fortes famílias de crianças autistas",
        emailong: "ctpa@contato.com.br",
        numeroong: "(81)99125003",
    },
    {
        nomeacao: "Casa Terapêutica para os Autistas",
        descricao: "Manutenção do espaço físico que oferece acolhimento e terapias especializadas para crianças com autismo.",
        ods1: "Fome Zero e Agricultura Sustentável",
        ods2: "Erradicação da Pobreza",
        ods3: "Saúde e Bem-estar",
        ods4: "",
        nomedaong: "Juntas somos mais fortes famílias de crianças autistas",
        emailong: "ctpa@contato.com.br",
        numeroong: "(81)99125003",
    },
    {
        nomeacao: "Casa Terapêutica para os Autistas",
        descricao: "Manutenção do espaço físico que oferece acolhimento e terapias especializadas para crianças com autismo.",
        ods1: "Fome Zero e Agricultura Sustentável",
        ods2: "Erradicação da Pobreza",
        ods3: "Saúde e Bem-estar",
        ods4: "",
        nomedaong: "Juntas somos mais fortes famílias de crianças autistas",
        emailong: "ctpa@contato.com.br",
        numeroong: "(81)99125003",
    },
    {
        nomeacao: "Casa Terapêutica para os Autistas",
        descricao: "Manutenção do espaço físico que oferece acolhimento e terapias especializadas para crianças com autismo.",
        ods1: "Fome Zero e Agricultura Sustentável",
        ods2: "Erradicação da Pobreza",
        ods3: "Saúde e Bem-estar",
        ods4: "",
        nomedaong: "Juntas somos mais fortes famílias de crianças autistas",
        emailong: "ctpa@contato.com.br",
        numeroong: "(81)99125003",
    },
    {
        nomeacao: "Casa Terapêutica para os Autistas",
        descricao: "Manutenção do espaço físico que oferece acolhimento e terapias especializadas para crianças com autismo.",
        ods1: "Fome Zero e Agricultura Sustentável",
        ods2: "Erradicação da Pobreza",
        ods3: "Saúde e Bem-estar",
        ods4: "",
        nomedaong: "Juntas somos mais fortes famílias de crianças autistas",
        emailong: "ctpa@contato.com.br",
        numeroong: "(81)99125003",
    },
];

const GridAcoes: React.FC = () =>{
    
    // 1. Adiciona estados
    const [modalAberto, setModalAberto] = useState(false);
    const [acaoSelecionada,setAcaoSelecionada] = useState<Omit<Cardacaoprops, 'onEntrarContato'> | null>(null);

    // 2. Adiciona as funções de controle
    const handleAbrirModal = (acao: Omit<Cardacaoprops, 'onEntrarContato'>)=> {
        setAcaoSelecionada(acao); //Guarda os dados do card clicado
        setModalAberto(true); //Abre o modal
    };
    const handleFecharModal = () => {
        setModalAberto(false); //Fecha o modal
        setAcaoSelecionada(null); //Limpa os dados que estavam armazenados
    };

    return(
        <section className="w-[825px] max-w-6xl mx-auto px-1 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {arrayAcoes.map((acao, index) =>(
                    <Cardacao 
                     key={index} 
                     {...acao} 
                     onEntrarContato={()=> handleAbrirModal(acao)}/>
                ))}
            </div>

            {modalAberto && acaoSelecionada &&(
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <Modalcontatos
                     
                     // Passando os dados do card selecionado para o modal de contato
                     nomeacao={acaoSelecionada.nomeacao}
                     nomedaong={acaoSelecionada.nomedaong}
                     emailong={acaoSelecionada.emailong}
                     numeroong={acaoSelecionada.numeroong}
                     
                     // Fechando o modal
                     onEntrarContato={handleFecharModal}
                    />
                </div>
            )} 
        </section>
    );
};

export default GridAcoes;