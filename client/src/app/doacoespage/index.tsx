import Cardcontatos from "@/components/card-cadastrar-doacao";
import Cardcadastrado from "@/components/card-acao-cadastrada";
import CadastroDoacao from "@/components/formulario-doacao";
import SearchBar from "@/components/searchbar";
import { useState } from "react";

export default function DoacoesPage() {
  const [ativocontato, setAtivoContato] = useState("acoes");
  const [mostrarModal, setMostrarModal] = useState(false);
  const [showCadastroDoacaoSidebar, setShowCadastroDoacaoSidebar] = useState(false);
  const [selectedOngName, setSelectedOngName] = useState("");
  const [selectedActionName, setSelectedActionName] = useState("");

  function abrirModal() {
    setMostrarModal(true);
  }

  function fecharModal() {
    setMostrarModal(false);
  }

  function handleOpenCadastro(ongName: string, actionName: string) {
    setSelectedOngName(ongName); 
    setSelectedActionName(actionName);
    setShowCadastroDoacaoSidebar(true);
  }

  function handleCloseCadastro() {
    setShowCadastroDoacaoSidebar(false);
    setSelectedOngName("");
    setSelectedActionName("");
  }

  const cardGridColsClass = showCadastroDoacaoSidebar ? 'lg:grid-cols-2' : 'lg:grid-cols-3';

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term: string) => {
    console.log("Termo de pesquisa recebido:", term);
    setSearchTerm(term); 
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
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
            initialValue={searchTerm}
            />
        </div>

        {/* Grid de cards */}
        <div className={`grid grid-cols-1 md:grid-cols-2 ${cardGridColsClass} gap-x-6 gap-y-8`}>
          <Cardcontatos
            nomeacao="Campanha Inverno Solidário"
            descricao="Ajude famílias em situação de vulnerabilidade com roupas e cobertores."
            email="contato@ongsocial.org"
            fone="(41) 99999-0000"
            qtdacoescadastradas="12"
            nomedaong="ONG Social Brasil"
            ativocontato={ativocontato}
            onCadastrarDoacaoClick={handleOpenCadastro}
          />

          <Cardcadastrado
            nomeacao="Campanha Inverno Solidário"
            descricao="Ajude famílias com roupas e cobertores durante o inverno."
            email="contato@ongsocial.org"
            fone="(41) 99999-0000"
            qtdacoescadastradas="12"
            nomedaong="ONG Social Brasil"
          />

          <Cardcontatos
            nomeacao="Projeto Verde Esperança"
            descricao="Foco na sustentabilidade e plantio de árvores em áreas urbanas."
            email="contato@projetoverde.org"
            fone="(41) 88888-1111"
            qtdacoescadastradas="5"
            nomedaong="Amigos da Natureza"
            ativocontato={ativocontato}
            onCadastrarDoacaoClick={handleOpenCadastro}
          />

          <Cardcadastrado
            nomeacao="Alimento para Todos"
            descricao="Distribuição de cestas básicas para comunidades carentes."
            email="contato@alimentosolidario.org"
            fone="(41) 77777-2222"
            qtdacoescadastradas="20"
            nomedaong="Mãos Amigas"
          />

          <Cardcontatos
            nomeacao="Saúde na Comunidade"
            descricao="Oferece atendimento médico e odontológico gratuito em áreas rurais."
            email="contato@saudecomunidade.org"
            fone="(41) 66666-3333"
            qtdacoescadastradas="8"
            nomedaong="Cuidar Mais"
            ativocontato={ativocontato}
            onCadastrarDoacaoClick={handleOpenCadastro}
          />

          <Cardcadastrado
            nomeacao="Educação para o Futuro"
            descricao="Apoia jovens com bolsas de estudo e material escolar."
            email="contato@educacaofuturo.org"
            fone="(41) 55555-4444"
            qtdacoescadastradas="15"
            nomedaong="Saber Viver"
          />

          <Cardcadastrado
            nomeacao="Campanha Inverno Solidário"
            descricao="Ajude famílias com roupas e cobertores durante o inverno."
            email="contato@ongsocial.org"
            fone="(41) 99999-0000"
            qtdacoescadastradas="12"
            nomedaong="ONG Social Brasil"
          />
        </div>
      </div> 

      {/* Sidebar */}
      <div className={`
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
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}