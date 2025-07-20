"use client";
import React, { useState } from 'react';
import AuthHeader from "@/app/auth/AuthHeader";
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal'; // Importe o Modal
import { Card } from "@/components/ui/Card";


export default function SendEmailPage() {
  const [formData, setFormData] = useState({ email: '' });
  const [errors, setErrors] = useState({ email: '' });
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar o modal

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'E-mail inválido';
    }

    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      console.log('E-mail para recuperação enviado:', formData.email);
      // Aqui você chamaria a API para enviar o e-mail
      setIsModalOpen(true); // Abre o modal após o envio
    }
  };

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col justify-center py-12 sm:px-40 lg:px-140">
       <Card variant="elevated" className="py-27">
        <div className="sm:mx-auto sm:w-full sm:max-w-md px-12">
          <AuthHeader 
            title="Esqueceu sua senha?" 
            description="Preencha seu e-mail cadastrados e enviaremos um link para definir uma nova senha"
          />
        </div>


        <form onSubmit={handleSubmit} className="flex flex-col items-center px-14 space-y-9 my-4">

              <Input
                label="E-mail"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="exemplo@empresa.com"
                error={errors.email}
                className="py-3"
              />
              <Button type="submit" variant="primary" className="w-95 py-3 text-base">
                Enviar e-mail de recuperação
              </Button>
          
        </form>

        {/* Modal de confirmação */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="text-center">
            <h2 className="text-xl font-bold mb-2">E-mail enviado!</h2>
            <p className="text-gray-600">
              Enviamos um link de recuperação para o e-mail cadastrado. 
              Verifique sua caixa de entrada e siga as instruções.
            </p>
          </div>
        </Modal>
        </Card>
    </div>
  );
}