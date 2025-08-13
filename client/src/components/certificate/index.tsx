"use client";
// This file is a placeholder for the certificate component.
import * as React from 'react';
import localFont from 'next/font/local';
import Header from './certificate_comps/header';
import Image from 'next/image';
import {Prata, Ouro, Bronze} from '@/assets';

import Signature from './certificate_comps/signature';
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

    function levelColor(): string {
        if( props.level.toLowerCase() === 'prata') {
            return '#C0C0C0';
        }
        if( props.level.toLowerCase() === 'ouro') {
            return '#FFD700';
        }
        if( props.level.toLowerCase() === 'bronze') {
            return '#CD7F32';
        } else return '#009FE3';
    }

    function getBadge():string {
        if( props.level.toLowerCase() === 'prata'){
            return Prata;
        }
        if( props.level.toLowerCase() === 'ouro') {
            return Ouro;
        }
        if( props.level.toLowerCase() === 'bronze') {
            return Bronze;
        } else return Prata;
    }

    return(
        <div className='w-[45rem] h-[32rem] bg-white p-[10px] shadow-lg flex items-center justify-center'>
            <div className='w-full h-full flex flex-col items-center justify-center gap-4 border-4 border-[#009FE3] p-[2px]'>
                <div className='w-full h-full flex items-center justify-start bg-[#FFFFFF] border-1 border-[#D1D5DC] flex flex-col p-[1px]'>
                    <Header />
                    <div className='w-full flex flex-col items-center justify-center p-[8px]'>
                        <div className={segoeUI.className} style={{ fontWeight: '700', fontSize: '14px', color: '#4A5565' }}>
                            CERTIFICADO DE IMPACTO SOCIAL
                        </div>
                        
                        <div className={segoeUI.className} style={{ fontWeight: '400', fontSize: '8px', color: '#4A5565' }}>
                            SELO DE RESPONSABILIDADE SOCIAL EMPRESARIAL
                        </div>
                        <div className='w-full h-[7rem] bg-[#f9fafb] mt-2 flex flex-col items-center justify-center border-1 border-[#f0f0f0] p-2 rounded-[9px]'>
                            <Image src={getBadge()} alt='Logo' width={54} height={54} className='w-[54px] h-[54px] mb-2' />
                            <div className={segoeUI.className} style={{ fontWeight: '700', fontSize: '12px', color: levelColor() }}>
                                Nivel {props.level}
                            </div>
                        </div>
                        <div className='w-full mt-4 flex items-center justify-center flex-col gap-2'>
                            <div className={segoeUI.className} style={{ fontWeight: '400', fontSize: '12px', color: '#4A5565' }}>
                                Certificamos que a empresa
                            </div>
                            <div className = 'w-full flex items-center justify-center gap-2 bg-sky-500/5 p-2 rounded-[4px] border-l-4 border-[#009FE3]'>
                                <div className={segoeUI.className} style={{ fontWeight: '700', fontSize: '16px', color: '#4A5565' }}>
                                    {props.empresa}
                                </div>
                            </div>
                            <div className='flex items-center justify-center text-center w-3/4'>
                                 <div className={segoeUI.className} style={{ fontWeight: '400', fontSize: '12px', color: '#4A5565' }}>
                                     alcançou o <span className='font-bold' style={{color: levelColor()}}>Nivel {props.level.toUpperCase()}</span> em responsabilidade social empresarial, demonstrando compromisso genuíno com o impacto social e desenvolvimento sustentável da cidade do Recife.
                                </div>
                            </div>
                            <div className='flex flex-col mt-2 items-center justify-center text-center w-full h-[81px] mb-0 pb-0'>
                                <div className={segoeUI.className} style={{ fontWeight: '400', fontSize: '8px', color: '#4A5565' }}>
                                    AUTORIDADES RESPONSAVEIS
                                </div>
                                <div className='w-full h-[81px] flex flex-row items-center justify-between gap-6 p-8'>
                                    <div className='flex flex-col items-center justify-center w-1/3 '>
                                        <Image src='/images/signature.png' alt='signature' width={41} height={15} className='w-[41px] h-[15px] mb-1' />
                                        <Signature orgao='Portal Bora Impactar' cargo='Coordenacao Tecnica' />
                                    </div>
                                    <div className='flex flex-col items-center justify-center w-1/3'>
                                        <Image src='/images/signature.png' alt='signature' width={41} height={15} className='w-[41px] h-[15px] mb-1' />
                                        <Signature orgao='Prefeitura do Recife' cargo='Secretário de Desenvolvimento Social' />
                                    </div>
                                    <div className='flex flex-col items-center justify-center w-1/3'>
                                        <Image src='/images/signature.png' alt='signature' width={41} height={15} className='w-[41px] h-[15px] mb-1' />
                                        <Signature orgao='Prefeitura do Recife' cargo='Secretário de Desenvolvimento Social' />
                                    </div>
                                </div>
                            </div>
                            <div className='w-full static flex flex-row items-center justify-between rounded-[4px] bg-[#f9fafb] border-1 border-[#D1D5DC] p-1 h-1/4 mb-1'>
                                <div className='w-4/5 flex flex-col items-start justify-center text-center ml-2'>
                                    <div className={segoeUI.className} style={{ fontWeight: '400', fontSize: '8px', color: '#4A5565' }}>
                                        Certificado pode ser verificado em: <a href='https://portal.boraimpactar.recife.pe.gov.br/verificar' style={{ color: '#4A5565', fontFamily: 'monospace'}}>portal.boraimpactar.recife.pe.gov.br/verificar</a> 
                                    </div>
                                    <div className={segoeUI.className} style={{ fontWeight: '400', fontSize: '7px', color: '#4A5565' }}>
                                        Este documento possui validade digital e reconhecimento oficial da Prefeitura do Recife • Emitido conforme Lei Municipal de Responsabilidade Social Empresarial
                                    </div>
                                </div>
                                <div className='w-1/5 flex flex-col text-right items-end justify-center'>
                                    <div className={segoeUI.className} style={{ fontWeight: '400', fontSize: '6px', color: '#4A5565' }}>
                                        ID: {props.id} 
                                    </div>
                                     <div className={segoeUI.className} style={{ fontWeight: '400', fontSize: '6px', color: '#4A5565' }}>
                                        Data de Emissão: {props.data_emissao}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
