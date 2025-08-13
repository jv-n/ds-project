"use client";
import StyleFillable from "./styles/StyleFillable";
import StyleTitle from "./styles/StyleTitle";
import StyleInput from "./styles/StyleInput";
import OdsImages from "./OdsImages";
import { useState } from "react";

// Esse método cria um novo array apartir de um objeto iterável
// OBS: isso foi super importante fazer, pois colocando o objeto diretamente em EmpresaForm, a cada atualização da TemplateContext, iria recriar
// todas as ods's e o useState, o que diminuiria muito o desempenho do programa final, mas isso aqui embaixo so é
// possível porque as ODS's são estáticas!!!
const OdsImageOptions = Array.from({ length: 17 }, (_, i) => ({
  id: String(i + 1),
  name: String(i + 1),
  require: true,
}));

const initialODSState = OdsImageOptions.reduce((acumulator, option) => {
  acumulator[option.name] = false;
  return acumulator;
});

function EmpresaForm({ className = "" }) {
  // formData é um objeto que armazna todos os dados do formulário
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
  const [selectedODS, setSelectedODS] = useState(() => {
    const initialState = {};
    for (let i = 1; i <= 17; i++) {
      initialState[i] = false; // Inicializa todos como false
    }
    return initialState;
  });

  const handleOdsImagesChange = (e) => {
    const { name, checked } = e.target;
    setSelectedODS((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCNPJChange = (e) => {
    const formatted = formatCNPJ(e.target.value);
    setFormData({ ...formData, cnpj: formatted });
  };

  const handleTelefoneChange = (e) => {
    const formatted = formatTelefone(e.target.value);
    setFormData({ ...formData, telefone: formatted });
  };

  const formatTelefone = (value) => {
    if (!value) return value;

    // Remove tudo que não é dígito
    const nums = value.replace(/\D/g, "");

    // Só aceita essa forma: (81)9 9999-9999
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

  const formatCNPJ = (value) => {
    if (!value) return value;
    const nums = value.replace(/\D/g, "");

    // Só pode essa forma: 99.999.999/9999-99
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

  const validate = () => {
    const newErrors = {};

    // Conta quantos ods foram selecionados
    const selectCount = Object.values(selectedODS).filter(Boolean).length;

    // let selectCount = 0;
    // const values = Object.values(selectedODS);
    // for(let i=0; i<values.length;i++){
    //   if(values[i]) selectCount++;
    // }

    // Atribui os erros para cada variável
    if (!formData.nomeEmpresa.trim())
      newErrors.nomeEmpresa = "Nome da empresa é obrigatório";
    if (!formData.cnpj) newErrors.cnpj = "CNPJ é obrigatório";
    if (!formData.email.trim()) newErrors.email = "Email é obrigatório";
    if (!formData.telefone) newErrors.telefone = "Telefone é obrigatório";
    if (!formData.senha.trim()) newErrors.senha = "A senha é obrigatória";
    if (formData.senha !== formData.confirmarSenha) {
      newErrors.confirmarSenha = "As senhas não coincidem";
    }
    if (selectCount > 5) {
      newErrors.ods = "Selecione no máximo 5 ODS";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Campo de envio dos dados
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Opções selecionadas:", selectedODS);
      setIsSubmitting(true);
      try {
        // aqui pode enviar as opcoes para a api
        // await axios.post("...",formData);
        console.log("Dados enviados:", formData);
        alert("Cadastro realizado com sucesso!");
      } catch (error) {
        console.error("Erro no cadastro:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
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
            <StyleTitle>Nome fantasia da empresa *</StyleTitle>
            <StyleInput
              type="text"
              name="nomeEmpresa"
              value={formData.nomeEmpresa}
              onChange={handleChange}
              placeholder="Nome como a empresa é conhecida publicamente"
              errors={errors.nomeEmpresa}
            />
          </div>

          <div>
            <StyleTitle>CNPJ *</StyleTitle>
            <StyleInput
              type="text"
              value={formData.cnpj}
              onChange={handleCNPJChange}
              placeholder="99.999.999/9999-99"
              errors={errors.cnpj}
            />
          </div>
        </StyleFillable>

        {/* Contato */}
        <StyleFillable>
          <div>
            <StyleTitle>Email corporativo de contato *</StyleTitle>
            <StyleInput
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Ex: ana.souza@empresa.com"
              errors={errors.email}
            />
          </div>

          <div>
            <StyleTitle>Telefone *</StyleTitle>
            <StyleInput
              type="text"
              value={formData.telefone}
              onChange={handleTelefoneChange}
              placeholder="(81)9 9999-9999"
              errors={errors.telefone}
            />
          </div>
        </StyleFillable>

        {/* Endereço */}
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
              <option value="maior30">maior que 30</option>
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
            <StyleTitle>Senha*</StyleTitle>
            <StyleInput
              type="password"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              errors={errors.senha}
            />
          </div>

          <div>
            <StyleTitle>Confirmar Senha*</StyleTitle>
            <StyleInput
              type="password"
              name="confirmarSenha"
              value={formData.confirmarSenha}
              onChange={handleChange}
              errors={errors.confirmarSenha}
            />
          </div>
        </StyleFillable>
        <div className="gap-2 py-5">
          <h1 className="font-sans font-bold text-gray-800">
            ODS da ONU mais alinhadas com as causas da empresa
          </h1>
          <p className="font-medium text-gray-800">
            selecione até 5 causas principais
          </p>
        </div>

        {/* recebe as informações ods */}
        <div className="max-h-md max-w-full bg-white">
          <div className="grid grid-cols-2 md:grid-cols-9 gap-3">
            {OdsImageOptions.map((option) => (
              <OdsImages
                key={option.id}
                id={option.id}
                name={option.name}
                imageUrl={`/images/SDG-${option.name}.png`}
                checked={selectedODS[option.name]}
                onChange={handleOdsImagesChange}
                disabled={
                  !selectedODS[option.name] &&
                  Object.values(selectedODS).filter(Boolean).length >= 5
                }
              />
            ))}
          </div>
        </div>

        {/* Termos e Condições */}
        <div className="flex items-start py-8">
          <div className="flex items-center h-5 ">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
              required
            />
          </div>
          <div className="ml-3 text-sm">
            <StyleTitle htmlFor="terms" className="font-medium text-gray-700">
              Concordo com os termos e condições
            </StyleTitle>
          </div>
        </div>

        {/* Botão de Envio */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className=" w-3/11 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#294BB6] hover:bg-blue-700  focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isSubmitting ? "Enviando..." : "Cadastrar Empresa"}
          </button>
        </div>
      </form>
    </div>
  );
}
export default EmpresaForm;
