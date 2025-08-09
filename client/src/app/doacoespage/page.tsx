"use client";

import ActionCard from "@/components/card-cadastrar-doacao";
import CadastroDoacao from "@/components/formulario-doacao";
import SearchBar from "@/components/searchbar";
import SuccessModal from "@/components/sucess-modal"; // Importe o SuccessModal
import { useState, useEffect } from "react";

// Definição da interface para os dados da Ação que esperamos da API
interface AcaoData {
  id: number;
  nome: string;
  descricao: string;
  ong: {
    id: number; // ID da ONG agora está na interface
    nome: string;
    usuario: {
      email: string;
      telefone: string;
    };
  };
  currentUserDonationCount: number;
  currentUserDonationStatus: 'PENDENTE' | 'APROVADO' | 'REJEITADO' | 'CONTATO_INICIAL' | null;
  latestApoioId: number | null; // CORREÇÃO: Nome do campo e tipo para refletir o backend
}

export default function DoacoesPage() {
  const [showCadastroDoacaoSidebar, setShowCadastroDoacaoSidebar] = useState(false);
  const [selectedOngName, setSelectedOngName] = useState("");
  const [selectedActionName, setSelectedActionName] = useState("");
  const [selectedApoioId, setSelectedApoioId] = useState<number | null>(null); // NOVO: Estado para armazenar o ID do apoio

  const [acoes, setAcoes] = useState<AcaoData[]>([]);
  const [filteredAcoes, setFilteredAcoes] = useState<AcaoData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // Novo estado para submissão
  const [showSuccessModal, setShowSuccessModal] = useState(false); // Estado para o modal de sucesso

  // Função para buscar as ações da API
  const fetchAcoes = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:3001/doacoes');
      if (!response.ok) {
        throw new Error('Falha ao buscar as doações');
      }
      const data: AcaoData[] = await response.json();
      setAcoes(data);
      setFilteredAcoes(data);
    } catch (err: any) {
      console.error("Erro ao buscar doações:", err);
      setError(err.message || 'Ocorreu um erro ao carregar as doações.');
    } finally {
      setIsLoading(false);
    }
  };

  // Efeito para buscar as ações da API quando o componente é montado
  useEffect(() => {
    fetchAcoes();
  }, []);

  // CORREÇÃO: handleOpenCadastro agora recebe o ID do apoio
  function handleOpenCadastro(ongName: string, actionName: string, apoioId: number | null) {
    setSelectedOngName(ongName);
    setSelectedActionName(actionName);
    setSelectedApoioId(apoioId); // Armazena o ID do apoio
    setShowCadastroDoacaoSidebar(true);
  }

  function handleCloseCadastro() {
    setShowCadastroDoacaoSidebar(false);
    setSelectedOngName("");
    setSelectedActionName("");
    setSelectedApoioId(null); // Limpa o ID do apoio ao fechar
  }

  // Função para fechar o modal de sucesso e o sidebar
  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    handleCloseCadastro(); // Fecha o sidebar após fechar o modal
    fetchAcoes(); // Re-busca as ações para atualizar a lista
  };

  // Função para lidar com a submissão da doação
  const handleSubmitDonation = async (data: {
    tipoAjuda: string;
    valorOuQuantidade: string;
    documentos: File[];
  }) => {
    setIsSubmitting(true);
    setError(null);

    const acaoSelecionada = acoes.find(
      (acao) => acao.nome === selectedActionName && acao.ong.nome === selectedOngName
    );

    if (!acaoSelecionada) {
      setError("Ação ou ONG selecionada não encontrada.");
      setIsSubmitting(false);
      return;
    }

    const acaoId = acaoSelecionada.id;
    const ongId = acaoSelecionada.ong.id;
    const empresaId = 2; // Mockado para teste, substitua pelo ID da empresa logada real

    const formData = new FormData();
    formData.append('tipoAjuda', data.tipoAjuda);
    formData.append('valor', data.valorOuQuantidade);
    formData.append('acaoId', acaoId.toString());
    formData.append('ongId', ongId.toString());
    formData.append('empresaId', empresaId.toString());
    formData.append('data', new Date().toISOString());
    formData.append('status', 'PENDENTE'); // O status muda para PENDENTE após o cadastro/atualização

    // Garante que 'documentacao' seja sempre anexado
    if (data.documentos && data.documentos.length > 0) {
      data.documentos.forEach((file) => {
        formData.append('documentacao', file); // Anexa o arquivo real
      });
    } else {
      // Se não houver documentos, anexa uma string padrão
      formData.append('documentacao', 'sem-documento.pdf'); 
    }

    try {
      let response;
      if (acaoSelecionada.currentUserDonationStatus === 'CONTATO_INICIAL' && acaoSelecionada.latestApoioId !== null) {
        response = await fetch(`http://localhost:3001/doacoes/${acaoSelecionada.latestApoioId}`, {
          method: 'PUT',
          body: formData,
        });
      } else {
        // Caso contrário, fazemos um POST para criar uma nova doação
        response = await fetch('http://localhost:3001/doacoes', {
          method: 'POST',
          body: formData,
        });
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Falha ao cadastrar/atualizar doação.');
      }

      setShowSuccessModal(true); // Mostra o modal de sucesso
    } catch (err: any) {
      console.error("Erro ao cadastrar/atualizar doação:", err);
      setError(err.message || 'Ocorreu um erro ao cadastrar/atualizar a doação.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const cardGridColsClass = showCadastroDoacaoSidebar ? 'lg:grid-cols-2' : 'lg:grid-cols-3';

  // Função de busca que agora filtra os dados recebidos
  const handleSearch = (term: string) => {
    if (!term) {
      setFilteredAcoes(acoes);
    } else {
      const searchTerm = term.toLowerCase();
      const results = acoes.filter(acao =>
        acao.nome.toLowerCase().includes(searchTerm) ||
        acao.descricao.toLowerCase().includes(searchTerm) ||
        acao.ong.nome.toLowerCase().includes(searchTerm)
      );
      setFilteredAcoes(results);
    }
  };

  const getCardContent = () => {
    if (isLoading) {
      return (
        <p className="text-gray-500 col-span-full text-center">Carregando ações...</p>
      );
    }
    if (error) {
      return (
        <p className="text-red-500 col-span-full text-center">Erro: {error}</p>
      );
    }
    if (filteredAcoes.length === 0) {
      return (
        <p className="text-gray-500 col-span-full text-center">Nenhuma ação disponível.</p>
      );
    }
    return filteredAcoes.map((acao) => (
      <ActionCard
        key={acao.id}
        nomeacao={acao.nome}
        descricao={acao.descricao}
        email={acao.ong.usuario.email}
        telefone={acao.ong.usuario.telefone}
        qtdacoescadastradas={acao.currentUserDonationCount}
        nomedaong={acao.ong.nome}
        statusApoio={acao.currentUserDonationStatus}
        onCadastrarDoacaoClick={(ongName, actionName) => handleOpenCadastro(ongName, actionName, acao.latestApoioId)}
      />
    ));
  };

  return (
    <div className="flex min-h-screen bg-[#F5F5F5] w-screen">
      {/* Conteúdo principal */}
      <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
        <h1 className="text-3xl font-bold text-gray-900">Minhas doações</h1>
        <p className="mt-0 text-sm text-gray-600">
          Escolha uma ONG conectada e cadastre uma doação para ela
        </p>

        {/* Barra de pesquisa */}
        <div className={`mt-8 mb-8 relative ${showCadastroDoacaoSidebar ? '' : 'lg:pr-6'}`}>
          <SearchBar
            placeholder="Pesquisar..."
            onSearch={handleSearch}
            initialValue=""
            />
          </div>

        {/* Grid de cards */}
        <div className={`grid grid-cols-1 md:grid-cols-2 ${cardGridColsClass} gap-x-6 gap-y-8`}>
          {getCardContent()}
        </div>
      </div>

        {/* Sidebar */}
        <div
          className={`
        flex-shrink-0 bg-white shadow-lg
        transition-all duration-300 ease-in-out
        ${showCadastroDoacaoSidebar ? 'w-[450px] p-3' : 'w-0 overflow-hidden'}
        sticky top-0 h-screen self-start hidden lg:block
      `}>
        {showCadastroDoacaoSidebar && (
          <div className="h-full w-full overflow-y-auto">
            <div className="p-4 flex flex-col h-full">
              <CadastroDoacao
                onClose={handleCloseCadastro}
                ongName={selectedOngName}
                actionName={selectedActionName}
                onSubmitDonation={handleSubmitDonation} // Passa a nova função de submissão
              />
            </div>
          </div>
        )}
      </div>

      {/* Modal de Sucesso */}
      <SuccessModal isOpen={showSuccessModal} onClose={handleCloseSuccessModal} />
    </div>
  );
}
