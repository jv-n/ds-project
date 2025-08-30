"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AuthHeader from "@/app/auth/AuthHeader";
import FloatingInput from "@/components/floating-input";
import Button from "@/app/auth/components/ui/Button";
import Modal from "@/app/auth/components/ui/Modal";
import { Card } from "@/app/auth/components/ui/Card";
import { BackButton } from "@/app/auth/components/ui/BackButton";
import api from "@/services/api"; 

export default function NewPassword() {
  const [formData, setFormData] = useState({
    password: "",
    comparyPassword: "",
  });

  const [errors, setErrors] = useState({ password: "", comparyPassword: "" });
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Este código roda apenas no lado do cliente, onde 'window' está disponível
    const params = new URLSearchParams(window.location.search);
    const tokenFromUrl = params.get("token");
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    } else {
      console.error("Token não encontrado na URL");
    }
  }, []);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const newErrors = { password: "", confirmPassword: "" };
    let isValid = true;

    if (!formData.password) {
      newErrors.password = "Senha é obrigatória";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Senha deve ter pelo menos 6 caracteres";
      isValid = false;
    }

    if (!formData.comparyPassword) {
      newErrors.comparyPassword = "Confirmação de senha é obrigatória";
      isValid = false;
    } else if (formData.password !== formData.comparyPassword) {
      newErrors.comparyPassword = "As senhas não coincidem";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      if (!token) {
        setErrors({ general: "Token de redefinição inválido ou ausente." });
        return;
      }

      try {
        await api.post(`/password/reset-password?token=${token}`, {
          password: formData.password,
        });

        setIsSuccessModalOpen(true);
      } catch (error) {
        console.error("Erro ao redefinir a senha:", error);
        setErrors({ general: "Token inválido, expirado ou erro no servidor." });
      }
    }
  };

  const handleSuccessModalClose = () => {
    setIsSuccessModalOpen(false);
    router.push("/auth/pages/login-empresas");
  };

  return (
    <div className="min-h-screen bg-[#CBEFFF] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-40 relative">
      <BackButton />

      <div className="w-full flex justify-center">
        <Card variant="elevated" className="w-full max-w-md py-10 px-6 sm:py-12 sm:px-8">
          <div className="mx-auto w-full">
            <AuthHeader
              title="Nova Senha"
              description="Preencha os campos abaixo para definir sua nova senha"
            />
          </div>

        <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col items-center gap-6 mt-6 w-full"
        >

            <FloatingInput
              label="Nova senha"
              value={formData.password}
              onChange={(v) => handleChange("password", v)}
              placeholder="Digite sua nova senha"
              error={errors.password}
              type="password"
              className="w-full"
            />

            <FloatingInput
              label="Confirme a senha"
              value={formData.confirmPassword}
              onChange={(v) => handleChange("confirmPassword", v)}
              placeholder="Confirme sua senha"
              error={errors.confirmPassword}
              type="password"
              className="w-full"
            />
          <Button
            type="submit"
            variant="primary"
            className="w-full py-3 text-base mt-2"
            disabled={isLoading}
          >
            {isLoading ? 'Salvando...' : 'Confirmar'}
          </Button>
        </form>

        <Modal isOpen={isSuccessModalOpen} onClose={handleSuccessModalClose}>
          <div className="p-4">
            <AuthHeader
              title="Senha alterada com sucesso!"
              description="Agora você pode fazer login com sua nova senha."
            />
            <div className="mt-4 flex justify-center">
              <Button
                variant="primary"
                onClick={handleSuccessModalClose}
                className="w-full"
              >
                Ir para o login
              </Button>
            </div>
          </div>
        </Modal>
      </Card>
    </div>
  </div>
  );
}
