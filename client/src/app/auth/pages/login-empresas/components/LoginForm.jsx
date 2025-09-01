"use client";

import React, { useState } from "react";
import FloatingInput from "@/components/floating-input";
import Button from "@/app/auth/components/ui/Button";
import { formatCNPJ, validateCNPJ } from "@/app/auth/utils/cnpjUtils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "@/services/api";

const LoginFormEmpresa = () => {
  const [formData, setFormData] = useState({ cnpj: "", password: "" });
  const [errors, setErrors] = useState({ cnpj: "", password: "" });
  const router = useRouter();

  const validate = () => {
    const newErrors = { cnpj: "", password: "" };
    let isValid = true;

    if (!formData.cnpj) {
      newErrors.cnpj = "CNPJ é obrigatório";
      isValid = false;
    } else if (!validateCNPJ(formData.cnpj)) {
      newErrors.cnpj = "CNPJ inválido";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Senha é obrigatória";
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = "Senha deve ter pelo menos 8 caracteres";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      // Verifica se o CNPJ existe e se é do perfil "empresa"
      const checkRes = await api.get("/user/cnpj", {
        params: { value: formData.cnpj, perfil: "empresa" },
      });

      if (checkRes.status === 204 || !checkRes.data) {
        // caso a API retorne 204 ou não tenha dados
        setErrors({ cnpj: "CNPJ não cadastrado como Empresa", password: "" });
        return;
      }

      // CNPJ existe e perfil correto, tenta o login
      const userPayload = {
        cnpj: formData.cnpj,
        senha: formData.password,
        perfil: "empresa",
      };

      const res = await api.post("/sessions/empresa", userPayload, {
        withCredentials: true, // substitui o credentials: "include"
      });

      const data = res.data;
      console.log("Login Empresa realizado com sucesso:", data);

      localStorage.setItem("companyId", data.company.id);
      localStorage.setItem("userId", data.user.id);

      // redirecionar para a dashboard da empresa
      router.push("/acoes");
    } catch (err) {
      if (err.response?.status === 404) {
        setErrors({ cnpj: "CNPJ não cadastrado como Empresa", password: "" });
      } else if (err.response?.status === 401) {
        setErrors({ cnpj: "", password: "Senha incorreta" });
      } else {
        console.error("Erro login Empresa:", err.response?.data || err.message);
        setErrors({ cnpj: "Erro inesperado ao verificar CNPJ", password: "" });
      }
    }
  };

  const handleCNPJChange = (value) => {
    const formatted = formatCNPJ(value);
    setFormData((prev) => ({ ...prev, cnpj: formatted }));
  };

  const handleChangePassword = (value) => {
    setFormData((prev) => ({ ...prev, password: value }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-sm mx-auto w-full px-4"
    >
      {/* CNPJ */}
      <FloatingInput
        label="CNPJ*"
        value={formData.cnpj}
        onChange={handleCNPJChange}
        placeholder="00.000.000/0000-00"
        error={errors.cnpj}
      />

      {/* Senha */}
      <FloatingInput
        label="Senha*"
        type="password"
        value={formData.password}
        onChange={handleChangePassword}
        placeholder="Digite sua senha"
        error={errors.password}
      />

      {/* Esqueceu senha */}
      <div className="text-center">
        <a
          href="/auth/pages/send-email"
          className="text-sm text-[#1474FF] hover:underline"
        >
          Esqueceu a senha?
        </a>
      </div>

      {/* Botão Entrar */}
      <Button
        type="submit"
        variant="primary"
        className="w-full bg-[#294BB6] text-white py-3 rounded-sm hover:bg-blue-900 transition cursor-pointer"
      >
        Entrar
      </Button>

      {/* Criar conta */}
      <div className="text-center space-y-3 mt-6">
        <p className="text-base text-gray-600">Não possui cadastro?</p>
        <Link href="/auth/pages/formulario-empresas" className="block">
          <Button
            variant="outline"
            className="w-full border-2 border-[#294BB6] text-[#294BB6] py-3 rounded-sm hover:bg-gray-50 transition cursor-pointer"
          >
            Criar conta
          </Button>
        </Link>
      </div>
    </form>
  );
};

export default LoginFormEmpresa;
