"use client";

import React, { useState } from "react";
import FloatingInput from "@/components/floating-input";
import Button from "@/app/auth/components/ui/Button";
import { validateEmail } from "@/app/auth/utils/emailUtils";
import api from "@/services/api"; 

const LoginFormPrefeitura = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validate = () => {
    const newErrors = { email: "", password: "" };
    let isValid = true;

    if (!formData.email) {
      newErrors.email = "Email é obrigatório";
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Email inválido";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Senha é obrigatória";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Senha deve ter pelo menos 6 caracteres";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      // Verifica se o email existe e se é do perfil "prefeitura"
      const checkRes = await api.get("/user/email", {
        params: { value: formData.email, perfil: "prefeitura" },
      });

      if (checkRes.status === 404) {
        setErrors({ email: "Email não cadastrado como Prefeitura", password: "" });
        return;
      }

      // Email existe e perfil correto, tenta o login
      const userPayload = {
        email: formData.email,
        senha: formData.password,
        perfil: "prefeitura",
      };

      const res = await api.post("/auth/prefeitura", userPayload, {
        withCredentials: true,
      });

      const data = res.data;
      console.log("Login Prefeitura realizado com sucesso:", data);
      localStorage.setItem("userId", data.user.id);
      router.push("/auditoria");
    } catch (err) {
      console.error("Erro login Prefeitura:", err.response?.data || err.message);

      if (err.response?.status === 401) {
        setErrors({ email: "", password: "Senha incorreta" });
      } else if (err.response?.status === 404) {
        setErrors({ email: "Email não cadastrado como Prefeitura", password: "" });
      } else {
        setErrors({ email: "Erro inesperado ao verificar email", password: "" });
      }
    }
  };


  const handleEmailChange = (value) => {
    setFormData((prev) => ({ ...prev, email: value }));
  };

  const handleChangePassword = (value) => {
    setFormData((prev) => ({ ...prev, password: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-sm mx-auto">
      <FloatingInput
        label="Email"
        placeholder="seunome@email.com"
        value={formData.email}
        onChange={handleEmailChange}
        error={errors.email}
        type="text"
      />

      <FloatingInput
        label="Senha"
        placeholder="Digite sua senha"
        value={formData.password}
        onChange={handleChangePassword}
        error={errors.password}
        type="password"
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
    </form>
  );
};

export default LoginFormPrefeitura;


