"use client";
// This file is a placeholder for the certificate component.
import * as React from 'react';
import Image from 'next/image';
import localFont from 'next/font/local';
import Header from './certificate_comps/header';
// import { useRouter } from 'next/navigation';

export const segoeUI = localFont({
   src: [
        {
            path: './seguihis.ttf',
            weight: '400',
            style: 'normal',
        },
        {
            path: './segoeuib.ttf',
            weight: '700',
            style: 'normal',
        },
        {
            path:'./segoeuii.ttf',
            weight: '400',
            style: 'italic',
        },
        {
            path:'./segoeuiz.ttf',
            weight: '700',
            style: 'italic',
        }
   ]

});

export interface CertificateProps {
    empresa: string;
    level: string;
    id: string;
    data_emissao: string;
}

export default function Certificate(props: CertificateProps) {
    return(
        <div className='w-[720px] h-[516px] bg-white mt-60 p-[10px] shadow-lg flex items-center justify-center'>
            <div className='w-full h-full flex flex-col items-center justify-center gap-4 border-4 border-[#009FE3] p-[2px]'>
                <div className='w-full h-full flex items-center justify-start bg-[#FFFFFF] border-1 border-[#D1D5DC] flex flex-col p-[1px]'>
                    <Header />
                    <div className='w-full flex flex-col items-center justify-center p-[8px]'>
                        <div className={segoeUI.className} style={{ fontWeight: '700', fontSize: '14px', color: '#4A5565' }}>
                            CERTIFICADO DE IMPACTO SOCIAL
                        </div>
                        <div>

                        </div>
                        <div className={segoeUI.className} style={{ fontWeight: '400', fontSize: '8px', color: '#4A5565' }}>
                            SELO DE RESPONSABILIDADE SOCIAL EMPRESARIAL
                        </div>    
                    </div>
                </div>
            </div>


        </div>
    )
}
