"use client";

import ActionCard from "@/components/card-cadastrar-doacao";
import CadastroDoacao from "@/components/formulario-doacao";
import Navbar from "@/components/navbar";
import Rodape from "@/components/rodape";
import SearchBar from "@/components/searchbar";
import SuccessModal from "@/components/sucess-modal";
import { useState, useEffect } from "react";

interface AcaoData {
  id: number;
  nome: string;
  descricao: string;
  ong: {
    id: number;
    nome: string;
    usuario: {
      email: string;
      telefone: string;
    };
  };
  currentUserDonationCount: number;
  currentUserDonationStatus:
    | "PENDENTE"
    | "APROVADO"
    | "REJEITADO"
    | "CONTATO_INICIAL"
    | null;
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

  // Efeito para buscar as ações da API
  useEffect(() => {
    const fetchAcoes = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch("http://localhost:3001/doacoes");
        if (!response.ok) throw new Error("Falha ao buscar as doacoes");
        const data: AcaoData[] = await response.json();
        setAcoes(data);
        setFilteredAcoes(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Erro ao carregar as doacoes");
      } finally {
        setIsLoading(false);
      }
    };
    fetchAcoes();
  }, []);

  const handleOpenCadastro = (
    ongName: string,
    actionName: string,
    apoioId: number | null
  ) => {
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

  async function uploadFiles(apoioId: number, files: File[]) {
  if (!files || files.length === 0) return null;

  const formData = new FormData();
  files.forEach((f) => formData.append("file", f)); // campo "file" -> multer.array('file', 5)
  formData.append("apoioId", String(apoioId));

  const res = await fetch("http://localhost:3001/file/upload", {
    method: "POST",
    body: formData,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: "Erro upload" }));
    throw new Error(err.message || "Erro no upload dos arquivos");
  }
  return res.json();
}

  // Função para lidar com a submissão da doação
const handleSubmitDonation = async (data: {
  tipoAjuda: string;
  valorOuQuantidade: string;
  documentos: File[]; // Recebe a lista de arquivos do formulário
}) => {
  setIsSubmitting(true);
  try {
    const acaoSelecionada = acoes.find(
      (acao) => acao.nome === selectedActionName && acao.ong.nome === selectedOngName
    );
    if (!acaoSelecionada) {
      setError("Ação ou ONG não encontrada");
      return;
    }

    const isUpdate =
      acaoSelecionada.currentUserDonationStatus === "CONTATO_INICIAL" &&
      acaoSelecionada.latestApoioId;

    if (isUpdate && acaoSelecionada.latestApoioId) {
      // 1) atualizar apoio existente
      const putRes = await fetch(`http://localhost:3001/doacoes/${acaoSelecionada.latestApoioId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tipoAjuda: data.tipoAjuda,
          valor: data.valorOuQuantidade,
          status: "PENDENTE",
          acaoId: acaoSelecionada.id,
          ongId: acaoSelecionada.ong.id,
          empresaId: 2
        }),
      });
      if (!putRes.ok) throw new Error("Erro ao atualizar apoio");

      // 2) enviar arquivos vinculando ao apoio atual
      if (data.documentos?.length) {
        await uploadFiles(acaoSelecionada.latestApoioId, data.documentos);
      }
    } else {
      // Criar novo apoio
      const postRes = await fetch("http://localhost:3001/doacoes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tipoAjuda: data.tipoAjuda,
          valor: data.valorOuQuantidade,
          status: "PENDENTE",
          acaoId: acaoSelecionada.id,
          ongId: acaoSelecionada.ong.id,
          empresaId: 2
        }),
      });
      if (!postRes.ok) {
        const err = await postRes.json().catch(() => null);
        throw new Error(err?.message || "Erro ao criar apoio");
      }
      const created = await postRes.json();
      const novoApoioId = created.id;

      if (data.documentos?.length) {
        await uploadFiles(novoApoioId, data.documentos);
      }
    }

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
              acao.ong.nome.toLowerCase().includes(searchTerm)
          )
    );
  };
  
  const cardGridColsClass = showCadastroDoacaoSidebar
    ? "lg:grid-cols-2"
    : "lg:grid-cols-3";

  return (
    <div className="pt-[88px] flex flex-col min-h-screen bg-[#F5F5F5]">
      <Navbar ativo="minhas doacoes" />

      <div className="flex flex-grow min-h-screen">
        <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="font-sans font-bold text-[32px] text-black mt-[25px] text-left">
            Minhas doações
          </h1>
          <p className="font-sans text-[14px] text-black mt-[5px] mb-[30px] text-left">
            Escolha uma ONG conectada e cadastre uma doação para ela
          </p>

          <div className={`mt-8 mb-8 relative ${showCadastroDoacaoSidebar ? "" : "lg:pr-6"}`}>
            <SearchBar placeholder="Pesquisar..." onSearch={handleSearch} initialValue="" />
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-2 gap-[25px] ${cardGridColsClass}`}>
            {isLoading ? (
              <p className="text-gray-500 col-span-full text-center">
                Carregando ações...
              </p>
            ) : error ? (
              <p className="text-red-500 col-span-full text-center">
                Erro: {error}
              </p>
            ) : filteredAcoes.length === 0 ? (
              <p className="text-gray-500 col-span-full text-center">
                Nenhuma ação disponível.
              </p>
            ) : (
              filteredAcoes.map((acao) => (
                <ActionCard
                  key={acao.id}
                  nomeacao={acao.nome}
                  descricao={acao.descricao}
                  email={acao.ong.usuario.email}
                  telefone={acao.ong.usuario.telefone}
                  qtdacoescadastradas={acao.currentUserDonationCount}
                  nomedaong={acao.ong.nome}
                  statusApoio={acao.currentUserDonationStatus}
                  onCadastrarDoacaoClick={() =>
                    handleOpenCadastro(acao.ong.nome, acao.nome, acao.latestApoioId)
                  }
                />
              ))
            )}
          </div>
        </main>

        {showCadastroDoacaoSidebar && (
          <div
            className={`
              flex-shrink-0 bg-white shadow-lg
              transition-all duration-300 ease-in-out
              w-[450px] p-3
              sticky top-[88px] h-screen self-start hidden lg:block
            `}
          >
            <div className="h-full w-full overflow-y-auto">
              <div className="p-4 flex flex-col h-[full]">
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
