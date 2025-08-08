"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import StyleFillable from "./styles/StyleFillable";
import StyleTitle from "./styles/StyleTitle";
import StyleInput from "./styles/StyleInput";
import OdsImages from "./OdsImages";

// Opções das ODS (1 a 17)
const OdsImageOptions = Array.from({ length: 17 }, (_, i) => ({
  id: String(i + 1),
  name: String(i + 1),
  require: true,
}));

function EmpresaForm({ className = "" }) {
  const router = useRouter();

  // Estado do formulário (mantido para não quebrar a UI)
  const [formData, setFormData] = useState({
    nomeEmpresa: "",
    cnpj: "",
    email: "",
    nColaboradores: "",
    telefone: "",
    razao: "",
    ramoAtividade: "",
    responsavel: "",
    senha: "",
    confirmarSenha: "",
  });

  // Estado das ODS (apenas para UI)
  const [selectedODS, setSelectedODS] = useState(() => {
    const initialState: Record<string, boolean> = {};
    for (let i = 1; i <= 17; i++) initialState[String(i)] = false;
    return initialState;
  });

  // Handlers simples (mantidos para máscaras/UX)
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOdsImagesChange = (e: any) => {
    const { name, checked } = e.target;
    setSelectedODS((prev) => ({ ...prev, [name]: checked }));
  };

  const formatTelefone = (value: string) => {
    if (!value) return value;
    const nums = value.replace(/\D/g, "");
    if (nums.length <= 2) return `(${nums}`;
    if (nums.length <= 3) return `(${nums.slice(0, 2)})${nums.slice(2)}`;
    if (nums.length <= 7)
      return `(${nums.slice(0, 2)})${nums.slice(2, 3)} ${nums.slice(3)}`;
    if (nums.length <= 11)
      return `(${nums.slice(0, 2)})${nums.slice(2, 3)} ${nums.slice(
        3,
        7
      )}-${nums.slice(7)}`;
    return `(${nums.slice(0, 2)})${nums.slice(2, 3)} ${nums.slice(
      3,
      7
    )}-${nums.slice(7, 11)}`;
  };

  const handleTelefoneChange = (e: any) => {
    const formatted = formatTelefone(e.target.value);
    setFormData((prev) => ({ ...prev, telefone: formatted }));
  };

  const formatCNPJ = (value: string) => {
    if (!value) return value;
    const nums = value.replace(/\D/g, "");
    if (nums.length <= 2) return nums;
    if (nums.length <= 5) return `${nums.slice(0, 2)}.${nums.slice(2)}`;
    if (nums.length <= 8)
      return `${nums.slice(0, 2)}.${nums.slice(2, 5)}.${nums.slice(5)}`;
    if (nums.length <= 12)
      return `${nums.slice(0, 2)}.${nums.slice(2, 5)}.${nums.slice(
        5,
        8
      )}/${nums.slice(8)}`;
    return `${nums.slice(0, 2)}.${nums.slice(2, 5)}.${nums.slice(
      5,
      8
    )}/${nums.slice(8, 12)}-${nums.slice(12, 14)}`;
  };

  const handleCNPJChange = (e: any) => {
    const formatted = formatCNPJ(e.target.value);
    setFormData((prev) => ({ ...prev, cnpj: formatted }));
  };

  // 🚀 Sem validação: apenas redireciona para /acoes
  const handleSubmit = (e: any) => {
    e.preventDefault();
    router.push("/acoes");
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Cadastrar Empresa parceira
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Seção de Informações Básicas */}
        <StyleFillable>
          <div>
            <StyleTitle>Nome fantasia da empresa</StyleTitle>
            <StyleInput
              type="text"
              name="nomeEmpresa"
              value={formData.nomeEmpresa}
              onChange={handleChange}
              placeholder="Nome como a empresa é conhecida publicamente"
            />
          </div>

          <div>
            <StyleTitle>CNPJ</StyleTitle>
            <StyleInput
              type="text"
              value={formData.cnpj}
              onChange={handleCNPJChange}
              placeholder="99.999.999/9999-99"
            />
          </div>
        </StyleFillable>

        {/* Contato */}
        <StyleFillable>
          <div>
            <StyleTitle>Email corporativo de contato</StyleTitle>
            <StyleInput
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Ex: ana.souza@empresa.com"
            />
          </div>

          <div>
            <StyleTitle>Telefone</StyleTitle>
            <StyleInput
              type="text"
              value={formData.telefone}
              onChange={handleTelefoneChange}
              placeholder="(81)9 9999-9999"
            />
          </div>
        </StyleFillable>

        {/* Razão social */}
        <div>
          <StyleTitle>Razão social (opcional)</StyleTitle>
          <StyleInput
            type="text"
            name="razao"
            value={formData.razao}
            onChange={handleChange}
          />
        </div>

        {/* Ramo, Responsável e número de colaboradores */}
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <StyleTitle>Ramo de Atividade</StyleTitle>
            <select
              name="ramoAtividade"
              value={formData.ramoAtividade}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-600 text-sm p-2 border"
            >
              <option value="">Selecione...</option>
              <option value="alimentos">Alimentos</option>
              <option value="vestuario">Vestuário</option>
              <option value="tecnologia">Tecnologia</option>
              <option value="servicos">Serviços</option>
              <option value="outros">Outros</option>
            </select>
          </div>

          <div>
            <StyleTitle>Número de colaboradores</StyleTitle>
            <select
              name="nColaboradores"
              value={formData.nColaboradores}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-600 text-sm p-2 border"
            >
              <option value="">Selecione...</option>
              <option value="ate10">Entre 1-10</option>
              <option value="ate20">Entre 11-20</option>
              <option value="ate30">Entre 21-30</option>
              <option value="maior30">Maior que 30</option>
            </select>
          </div>

          <div>
            <StyleTitle>Responsável</StyleTitle>
            <StyleInput
              type="text"
              name="responsavel"
              value={formData.responsavel}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Senha */}
        <StyleFillable>
          <div>
            <StyleTitle>Senha</StyleTitle>
            <StyleInput
              type="password"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
            />
          </div>

          <div>
            <StyleTitle>Confirmar Senha</StyleTitle>
            <StyleInput
              type="password"
              name="confirmarSenha"
              value={formData.confirmarSenha}
              onChange={handleChange}
            />
          </div>
        </StyleFillable>

        {/* ODS */}
        <div className="gap-2 py-5">
          <h1 className="font-sans font-bold text-gray-800">
            ODS da ONU mais alinhadas com as causas da empresa
          </h1>
          <p className="font-medium text-gray-800">
            selecione até 5 causas principais (opcional)
          </p>
        </div>

        <div className="max-h-md max-w-full bg-white">
          <div className="grid grid-cols-2 md:grid-cols-9 gap-3">
            {OdsImageOptions.map((option) => (
              <OdsImages
                key={option.id}
                id={option.id}
                name={option.name}
                imageUrl={`/images/SDG-${option.name}.png`}
                checked={!!selectedODS[option.name]}
                onChange={handleOdsImagesChange}
                disabled={
                  !selectedODS[option.name] &&
                  Object.values(selectedODS).filter(Boolean).length >= 5
                }
              />
            ))}
          </div>
        </div>

        {/* Termos e Condições (sem required) */}
        <div className="flex items-start py-8">
          <div className="flex items-center h-5 ">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="terms" className="font-medium text-gray-700">
              Concordo com os termos e condições
            </label>
          </div>
        </div>

        {/* Botão de Envio */}
        <div>
          <button
            type="submit"
            className="w-3/11 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#294BB6] hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cadastrar Empresa
          </button>
        </div>
      </form>
    </div>
  );
}

export default EmpresaForm;
