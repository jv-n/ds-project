"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import FloatingInput from "@/components/floating-input";
import NavbarSecundaria from "@/components/navbar-2";
import Rodape from "@/components/rodape";
import OdsImages from "./OdsImages";
import api from "@/services/api";
import { useRouter } from "next/navigation";

// Tipagem do formulário
interface FormData {
  nomeEmpresa: string;
  cnpj: string;
  email: string;
  nColaboradores: string;
  telefone: string;
  senha: string;
  confirmarSenha: string;
}

// Tipagem dos erros
type FormErrors = Partial<Record<keyof FormData | "ods", string>>;

// Tipagem dos ODS
type SelectedODS = Record<string, boolean>;

// Opções de ODS
const OdsImageOptions = Array.from({ length: 17 }, (_, i) => ({
  id: String(i + 1),
  name: String(i + 1),
  require: true,
}));

export default function EmpresaForm() {
  const [formData, setFormData] = useState<FormData>({
    nomeEmpresa: "",
    cnpj: "",
    email: "",
    nColaboradores: "",
    telefone: "",
    senha: "",
    confirmarSenha: "",
  });

  const router = useRouter();

  // Estado das ODS
  const [selectedODS, setSelectedODS] = useState<SelectedODS>(() => {
    const initial: SelectedODS = {};
    for (let i = 1; i <= 17; i++) {
      initial[String(i)] = false;
    }
    return initial;
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- Handlers adaptados para onChange: (v: string) => void ---
  const handleInputChange = (field: keyof FormData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCNPJChange = (value: string) => {
    setFormData((prev) => ({ ...prev, cnpj: formatCNPJ(value) }));
  };

  const handleTelefoneChange = (value: string) => {
    setFormData((prev) => ({ ...prev, telefone: formatTelefone(value) }));
  };

  const handleNumColaboradoresChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      nColaboradores: formatNumColaboradores(value),
    }));
  };

  // ODS continua com ChangeEvent
  const handleOdsImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setSelectedODS((prev) => ({ ...prev, [name]: checked }));
  };

  // --- Formatadores ---
  const formatNumColaboradores = (value: string) => {
    if (!value) return value;
    return /^[0-9]+$/.test(value) ? value : value.replace(/\D/g, "");
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

  // --- Validação ---
  const validate = () => {
    const newErrors: FormErrors = {};
    const selectCount = Object.values(selectedODS).filter(Boolean).length;

    if (!formData.nomeEmpresa.trim())
      newErrors.nomeEmpresa = "Nome da empresa é obrigatório";
    if (!formData.cnpj) newErrors.cnpj = "CNPJ é obrigatório";
    if (!formData.email.trim()) newErrors.email = "Email é obrigatório";
    if (!formData.telefone) newErrors.telefone = "Telefone é obrigatório";
    if (!formData.nColaboradores)
      newErrors.nColaboradores = "Número de colaboradores é obrigatório";
    if (!formData.senha.trim()) newErrors.senha = "A senha é obrigatória";
    if (formData.senha !== formData.confirmarSenha)
      newErrors.confirmarSenha = "As senhas não coincidem";
    if (selectCount > 5) newErrors.ods = "Selecione no máximo 5 ODS";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // --- Submit ---
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const userPayload = {
      email: formData.email,
      cnpj: formData.cnpj,
      telefone: formData.telefone,
      senha: formData.senha,
      perfil: "empresa",
    };

    const companyPayload = {
      nome: formData.nomeEmpresa,
      numColaboradores: parseInt(formData.nColaboradores),
      odsId: Object.keys(selectedODS)
        .filter((key) => selectedODS[key])
        .map((key) => parseInt(key)),
    };

    try {
      const [emailRes, cnpjRes] = await Promise.all([
        api
          .get("/user/email", { params: { value: userPayload.email } })
          .catch(() => ({ data: null })),
        api
          .get("/user/cnpj", { params: { value: userPayload.cnpj } })
          .catch(() => ({ data: null })),
      ]);

      if (emailRes.data) {
        setErrors((prev) => ({ ...prev, email: "Email já cadastrado" }));
        return;
      }

      if (cnpjRes.data) {
        setErrors((prev) => ({ ...prev, cnpj: "CNPJ já cadastrado" }));
        return;
      }

      const { data: userData } = await api.post("/user", userPayload);
      const usuarioId = userData.id;

      const { data: empresaData } = await api.post("/company", {
        ...companyPayload,
        usuarioId,
      });

      console.log("Usuário criado:", userData);
      console.log("Empresa criada:", empresaData);

      alert("Cadastro realizado com sucesso!");
      router.push("/entrar");
    } catch (error: any) {
      console.error("Erro no cadastro:", error.response?.data || error.message);
      alert("Erro ao cadastrar empresa");
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Render ---
  return (
    <div className="pt-[88px] flex flex-col min-h-screen bg-[#F5F5F5]">
      <NavbarSecundaria />

      <div className="flex flex-grow min-h-screen ml-8">
        <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="font-sans font-bold text-[32px] text-black mt-[10px] text-left">
            Cadastrar Empresa Parceira
          </h1>
          <p className="font-sans text-[14px] text-black mt-[5px] mb-[30px] text-left">
            Preencha os dados abaixo para cadastrar sua empresa na plataforma
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Linha 1: Nome (65%) + CNPJ (35%) */}
            <div className="flex gap-4 mb-4">
              <div className="w-[66.5%]">
                <FloatingInput
                  label="Nome fantasia da empresa"
                  type="text"
                  value={formData.nomeEmpresa}
                  onChange={handleInputChange("nomeEmpresa")}
                  placeholder="Nome como a empresa é conhecida publicamente"
                  error={errors.nomeEmpresa}
                  labelBgColor="#F5F5F5"
                />
              </div>
              <div className="w-[32.5%]">
                <FloatingInput
                  label="CNPJ"
                  type="text"
                  value={formData.cnpj}
                  onChange={handleCNPJChange}
                  placeholder="99.999.999/9999-99"
                  error={errors.cnpj}
                  labelBgColor="#F5F5F5"
                />
              </div>
            </div>

            {/* Linha 2: Email (65%) + Telefone (35%) */}
            <div className="flex gap-4 mb-4">
              <div className="w-[66.5%]">
                <FloatingInput
                  label="Email corporativo de contato"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange("email")}
                  placeholder="Ex: ana.souza@empresa.com"
                  error={errors.email}
                  labelBgColor="#F5F5F5"
                />
              </div>
              <div className="w-[32.5%]">
                <FloatingInput
                  label="Telefone"
                  type="text"
                  value={formData.telefone}
                  onChange={handleTelefoneChange}
                  placeholder="(81)9 9999-9999"
                  error={errors.telefone}
                  labelBgColor="#F5F5F5"
                />
              </div>
            </div>

            {/* Linha 3: Número de colaboradores + Senha + Confirmar senha */}
            <div className="flex gap-4 mb-4 w-full">
              <div className="flex-1">
                <FloatingInput
                  label="Número de colaboradores"
                  type="number"
                  value={formData.nColaboradores}
                  onChange={handleNumColaboradoresChange}
                  placeholder="Ex: 25"
                  error={errors.nColaboradores}
                  labelBgColor="#F5F5F5"
                />
              </div>
              <div className="flex-1">
                <FloatingInput
                  label="Senha"
                  type="password"
                  value={formData.senha}
                  onChange={handleInputChange("senha")}
                  placeholder="Digite sua senha"
                  error={errors.senha}
                  labelBgColor="#F5F5F5"
                />
              </div>
              <div className="flex-1">
                <FloatingInput
                  label="Confirmar senha"
                  type="password"
                  value={formData.confirmarSenha}
                  onChange={handleInputChange("confirmarSenha")}
                  placeholder="Digite sua senha novamente"
                  error={errors.confirmarSenha}
                  labelBgColor="#F5F5F5"
                />
              </div>
            </div>

            {/* ODS */}
            <div className="gap-2 py-1">
              <h1 className="text-lg font-sans font-bold text-[#000000]">
                ODS da ONU mais alinhadas com as causas da empresa
              </h1>
              <p className="text-sm font-sans text-[#000000]">
                Selecione até 5 causas principais:
              </p>
            </div>
            <div className="flex">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-[40px] gap-y-[10px] max-w-4xl ml-6">
                {OdsImageOptions.map((option) => (
                  <OdsImages
                    key={option.id}
                    id={option.id}
                    name={option.name}
                    imageUrl={`/images/SDG-${option.name}.svg`}
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

            {/* Termos */}
            <div className="flex items-start py-8">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded cursor-pointer"
                  required
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="terms"
                  className="font-small text-[#000000] cursor-pointer"
                >
                  Declaro que li e aceito os Termos de Uso e a Política de
                  Privacidade da plataforma.
                </label>
              </div>
            </div>

            {/* Botão */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-3/11 flex justify-center py-2 px-4 border border-transparent rounded-sm shadow-sm text-sm font-medium text-white bg-[#294BB6] hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? "Enviando..." : "Cadastrar Empresa"}
            </button>
          </form>
        </main>
      </div>

      <Rodape />
    </div>
  );
}
