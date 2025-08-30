"use client";

import React, { useState } from "react";
import AuthHeader from "@/app/auth/AuthHeader";
import FloatingInput from "@/components/floating-input";
import Button from "@/app/auth/components/ui/Button";
import Link from "next/link";
import Modal from "@/app/auth/components/ui/Modal";
import { Card } from "@/app/auth/components/ui/Card";
import { BackButton } from "../../components/ui/BackButton";
import { validateEmail } from "@/app/auth/utils/emailUtils";
import api from "@/services/api"; 

export default function SendEmailPage() {
  const [formData, setFormData] = useState({ email: "" });
  const [errors, setErrors] = useState({ email: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (value) => {
    setFormData({ email: value });
    if (errors.email) setErrors({ email: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "E-mail é obrigatório";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Formato aceitável: "exemplo@email.com"';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const checkRes = await api.get("/user/email", {
        params: { value: formData.email },
      });
      
      if (checkRes.status === 204 || !checkRes.data) {
        // caso a API retorne 204 ou não tenha dados
        setErrors({ email: "E-mail não cadastrado"});
        return;
        }
        
      // Usando sua lógica com AXIOS
      await api.post('/password/forgot-password', {
        email: formData.email,
      });
      setIsModalOpen(true);
    } catch (error) {
      console.error("Erro ao enviar e-mail:", error);
    } finally {
      setIsLoading(false);
    }
  };

return (
    <div className="min-h-screen bg-[#CBEFFF] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-40 relative">
      <BackButton />

      <div className="w-full flex justify-center">
        <Card variant="elevated" className="w-full max-w-md py-10 px-6 sm:py-12 sm:px-8">
          <div className="mx-auto w-full">
            <AuthHeader
              title="Esqueceu sua senha?"
              description="Preencha seu e-mail cadastrado e enviaremos um link para definir uma nova senha"
            />
          </div>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col items-center gap-6 mt-6 w-full"
          >
            <FloatingInput
              label="E-mail"
              value={formData.email}
              onChange={handleChange}
              placeholder="exemplo@empresa.com"
              error={errors.email}
              type="email"
              className="w-full"
            />

            <Button type="submit" variant="primary" className="w-full py-3 text-base">
              Enviar e-mail de recuperação
            </Button>

            <Link href="/auth/pages/new-password" className="w-full">
              <Button type="button" variant="secondary" className="w-full py-3 text-base">
                Ir à página de nova senha
              </Button>
            </Link>
          </form>

          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <div className="sm:mx-auto px-6 sm:w-full sm:max-w-md">
              <AuthHeader
                title="E-mail enviado!"
                description="Confira sua caixa de entrada e acesse o link para criar uma nova senha."
              />
            </div>
          </Modal>
        </Card>
      </div>
    </div>
  );
}
