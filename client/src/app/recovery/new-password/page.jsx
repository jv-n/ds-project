"use client";
import React, { useState } from 'react';
import AuthHeader from "@/app/auth/AuthHeader";
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal'; 
import { Card } from "@/components/ui/Card";

export default function NewPassword(){

    const [formData, setFormData] = useState({
        password:""
    });

    const [errors, setErrors] = useState({})

    const validate = () =>{
        const newErrors = {};

        if(formData.password !== formData.comparyPassword){
            newErrors.confirmarSenha = "As senhas não coincidem";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    return(
        <div className='w-full h-full bg-gray-100 flex flex-col justify-center'>
            <Card variant = "outline" >
                <AuthHeader
                    title="Nova senha"
                    description="Escolha uma nova senha para acessar sua conta"
                />

                <Input
                label="password"
                name="password"
                placeholder="Digite uma senha de 6 ou mais dígitos"
                onChange={handleChange}
                value={formData.password}
                />

                <Input
                label="comparyPassword"
                name="comparyPassword"
                placeholder="Repita a senha"
                onChange={handleChange}
                value={formData.comparyPassword}
                error={errors.comparyPassword}
                />
                <Button
                type="submit"
                variant="secondary"
                >
                Confirmar
                </Button>

                
            </Card>

        </div>
    );
}