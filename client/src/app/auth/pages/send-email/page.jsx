"use client";
import React, { useState } from "react";
import AuthHeader from "@/app/auth/AuthHeader";
import Input from "@/app/auth/components/ui/Input";
import Button from "@/app/auth/components/ui/Button";
import Modal from "@/app/auth/components/ui/Modal";
import { Card } from "@/app/auth/components/ui/Card";
import { BackButton } from "../../components/ui/BackButton";
import axios from "axios";

export default function SendEmailPage() {
  const [formData, setFormData] = useState({ email: "" });
  const [errors, setErrors] = useState({ email: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors.email) {
      setErrors({ email: "" });
    }
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
      // Usando sua lógica com AXIOS
      await axios.post('http://localhost:3001/password/forgot-password', {
        email: formData.email,
      });
      setIsModalOpen(true);
    } catch (error) {
      console.error("Erro ao enviar e-mail:", error);
      // Fornece uma mensagem de erro mais genérica e amigável
      setErrors({ email: "E-mail não encontrado ou erro no servidor." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Container principal responsivo
    <div className="min-h-screen bg-blue-100 flex flex-col justify-center items-center p-4 relative">
      <BackButton />
      <Card variant="elevated" className="w-full max-w-lg p-6 sm:p-8 md:p-12">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <AuthHeader
            title="Esqueceu sua senha?"
            description="Preencha seu e-mail cadastrado e enviaremos um link para definir uma nova senha"
          />
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col items-center gap-7 mt-8 sm:mx-auto sm:w-full sm:max-w-md"
        >
          <Input
            label="E-mail"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="exemplo@empresa.com"
            error={errors.email}
            className="w-full" // Layout responsivo
          />
          <Button
            type="submit"
            variant="primary"
            className="w-full py-3 text-base" // Layout responsivo
            disabled={isLoading}
          >
            {isLoading ? 'Enviando...' : 'Enviar e-mail de recuperação'}
          </Button>
        </form>

        <Modal isOpen={isModalOpen}>
          <div className="p-4">
            <AuthHeader
              title="E-mail enviado!"
              description="Confira sua caixa de entrada e acesse o link para criar uma nova senha."
            />
          </div>
        </Modal>
      </Card>
    </div>
  );
}
