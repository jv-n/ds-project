"use client";

import ActionCard from "@/components/card-cadastrar-doacao";
import CadastroDoacao from "@/components/formulario-doacao";
import Navbar from "@/components/navbar";
import Rodape from "@/components/rodape";
import SearchBar from "@/components/searchbar";
import SuccessModal from "@/components/sucess-modal";
import DoacoesPageSemAcoes from "@/app/doacoespage/pages/sem_acoes";
import api from "@/services/api";
import { useState, useEffect, useCallback } from "react";

interface AcaoData {
  acaoId: number;
  empresaId: number;
  nome: string;
  descricao: string;
  nomeOng: string;
  emailOng: string;
  telefoneOng: string;
  odsAcao: number[];
  doacoes: Array<{
    id: number;
    data: string;
    valor: number;
    tipo: string;
    status: "Pendente" | "Aprovado" | "Rejeitado";
    motivoReprovacao: string | null;
    empresaId: number;
    acaoId: number;
    createdAt: string;
    updatedAt: string;
  }>;
  statusApoio: "Pendente" | "Aprovado" | "Rejeitado" | null;
  latestApoioId: number | null;
}

export default function DoacoesPage() {
  const [showCadastroDoacaoSidebar, setShowCadastroDoacaoSidebar] = useState(false);
  const [selectedOngName, setSelectedOngName] = useState("");
  const [selectedActionName, setSelectedActionName] = useState("");
  const [selectedApoioId, setSelectedApoioId] = useState<number | null>(null);

  const [acoes, setAcoes] = useState<AcaoData[]>([]);
  const [filteredAcoes, setFilteredAcoes] = useState<AcaoData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [companyId, setCompanyId] = useState<number | null>(null);

  // Ler companyId do localStorage
  useEffect(() => {
    const storedId = localStorage.getItem("companyId");
    if (storedId) setCompanyId(Number(storedId));
  }, []);

  const fetchAcoes = useCallback(async () => {
    if (!companyId) return; // só faz a chamada se companyId existir
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.get<AcaoData[]>(`/actions/company/${companyId}`);
      const data = response.data;

      if (Array.isArray(data)) {
        const mappedAcoes: AcaoData[] = data.map((item) => {
          const latestDoacao =
            item.doacoes.length > 0
              ? [...item.doacoes].sort(
                  (a, b) => new Date(b.data).getTime() - new Date(a.data).getTime()
                )[0]
              : null;

          return {
            ...item,
            statusApoio: latestDoacao ? latestDoacao.status : null,
            latestApoioId: latestDoacao ? latestDoacao.id : null,
          };
        });

        setAcoes(mappedAcoes);
        setFilteredAcoes(mappedAcoes);
      } else {
        console.error("Resposta da API não é um array:", data);
        setAcoes([]);
        setFilteredAcoes([]);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Erro ao carregar as doações");
      setAcoes([]);
      setFilteredAcoes([]);
    } finally {
      setIsLoading(false);
    }
  }, [companyId]);

  useEffect(() => {
    fetchAcoes();
  }, [fetchAcoes]);

  // ---- funções de abrir/fechar cadastro, submit, search ----
  const handleOpenCadastro = (ongName: string, actionName: string, apoioId: number | null) => {
    setSelectedOngName(ongName);
    setSelectedActionName(actionName);
    setSelectedApoioId(apoioId);
    setShowCadastroDoacaoSidebar(true);
  };

  const handleCloseCadastro = () => {
    setShowCadastroDoacaoSidebar(false);
    setSelectedOngName("");
    setSelectedActionName("");
    setSelectedApoioId(null);
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    handleCloseCadastro();
  };

  const handleSubmitDonation = async (data: { tipoAjuda: string; valorOuQuantidade: string; documentos: File[] }) => {
    setIsSubmitting(true);
    try {
      const acaoSelecionada = acoes.find(
        (acao) => acao.nome === selectedActionName && acao.nomeOng === selectedOngName
      );
      if (!acaoSelecionada) {
        setError("Ação ou ONG não encontrada");
        return;
      }

      const formData = new FormData();
      formData.append("data", new Date().toISOString());
      formData.append("valor", data.valorOuQuantidade);
      formData.append("tipo", data.tipoAjuda);
      formData.append("empresaId", String(acaoSelecionada.empresaId));
      formData.append("acaoId", String(acaoSelecionada.acaoId));

      if (data.documentos?.length) {
        data.documentos.forEach((file) => formData.append("documents", file));
      }

      await api.post("/donations", formData, { headers: { "Content-Type": "multipart/form-data" } });

      handleCloseCadastro();
      await fetchAcoes();
      setShowSuccessModal(true);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Erro no envio");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSearch = (term: string) => {
    const searchTerm = term.toLowerCase();
    setFilteredAcoes(
      !term
        ? acoes
        : acoes.filter(
            (acao) =>
              acao.nome.toLowerCase().includes(searchTerm) ||
              acao.descricao.toLowerCase().includes(searchTerm) ||
              acao.nomeOng.toLowerCase().includes(searchTerm)
          )
    );
  };

  const cardGridColsClass = showCadastroDoacaoSidebar ? "lg:grid-cols-2" : "lg:grid-cols-3";

  return (
    <div className="pt-[88px] flex flex-col min-h-screen bg-[#F5F5F5]">
      <Navbar ativo="minhas doacoes" companyId={companyId || 0} />

      <div className="flex flex-grow min-h-screen">
        <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="font-sans font-bold text-[32px] text-black mt-[10px] text-left">Minhas doações</h1>
          <p className="font-sans text-[14px] text-black mt-[5px] mb-[30px] text-left">
            Escolha uma ONG conectada e cadastre uma doação para ela
          </p>

          {!isLoading && filteredAcoes.length > 0 && (
            <div className={`mt-8 mb-8 relative ${showCadastroDoacaoSidebar ? "" : "lg:pr-6"}`}>
              <SearchBar placeholder="Pesquisar..." onSearch={handleSearch} initialValue="" />
            </div>
          )}

          <div className={`grid grid-cols-1 md:grid-cols-2 gap-[25px] ${cardGridColsClass}`}>
            {isLoading ? (
              <p className="text-gray-500 col-span-full text-center">Carregando ações...</p>
            ) : error ? (
              <p className="text-red-500 col-span-full text-center">Erro: {error}</p>
            ) : filteredAcoes.length === 0 ? (
              <DoacoesPageSemAcoes />
            ) : (
              filteredAcoes.map((acao) => (
                <ActionCard
                  key={acao.acaoId}
                  nomeacao={acao.nome}
                  descricao={acao.descricao}
                  email={acao.emailOng}
                  telefone={acao.telefoneOng}
                  qtdacoescadastradas={acao.doacoes.length}
                  nomedaong={acao.nomeOng}
                  status={acao.statusApoio}
                  onCadastrarDoacaoClick={() =>
                    handleOpenCadastro(acao.nomeOng, acao.nome, acao.latestApoioId)
                  }
                />
              ))
            )}
          </div>
        </main>

        {showCadastroDoacaoSidebar && (
          <div className="flex-shrink-0 bg-white shadow-lg transition-all duration-300 ease-in-out w-[450px] p-3 sticky top-[88px] h-screen self-start hidden lg:block">
            <div className="h-full w-full overflow-y-auto">
              <div className="p-4 flex flex-col h-full">
                <CadastroDoacao
                  onClose={handleCloseCadastro}
                  ongName={selectedOngName}
                  actionName={selectedActionName}
                  onSubmitDonation={handleSubmitDonation}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <Rodape />
      <SuccessModal isOpen={showSuccessModal} onClose={handleCloseSuccessModal} />
    </div>
  );
}
