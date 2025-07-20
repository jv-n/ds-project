import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import AuthHeader from '@/components/auth/AuthHeader';

export default function EntrarPage() {
  return (
    <div className='flex items-center'>
        <div className="min-h-screen w-1/2 bg-gray-50 flex flex-col justify-center sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <AuthHeader 
                title="" 
                description="Bem vindo! Por favor, selecione abaixo como deseja acessar o portal."
                />
            </div>

            <div className="mt-1 flex sm:mx-auto sm:h-full sm:w-full sm:max-w-md">
                <div className="py-10 px-4 sm:px-10">
                <div className="flex gap-4">
                    <Link href="/login-empresas">
                    <button className="w-full bg-blue-600 text-white py-14 px-4 rounded-md border-2 hover:bg-blue-700 transition font-medium text-lg">
                        Sou uma Empresa
                    </button>
                    </Link>
                    
                    <Link href="/login-ong">
                    <button className="w-full bg-white text-blue-600 py-14 px-5 rounded-md border-2 hover:bg-gray-50 transition font-medium text-lg">
                        Sou uma ONG
                    </button>
                    </Link>
                </div>
                </div>
            </div>
        </div>
        <div className='w-1/2 bg-blue-500 min-h-screen'/>
    </div>
  );
}