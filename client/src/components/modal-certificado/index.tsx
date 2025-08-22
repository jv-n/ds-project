import React from 'react';
import { useRef } from 'react';
import Certificate from '@/components/certificate';
import { CertificateProps } from '@/components/certificate';
import { Dialog, Transition } from '@headlessui/react';
import { DM_Sans } from 'next/font/google';
import Image from 'next/image';
import { Fechar, Olho, Download} from '@/assets';
import html2canvas from 'html2canvas-pro';

export interface ModalCertificadoProps {
    certificado: CertificateProps;
    isOpen: boolean;
    onClose: () => void;
}

const dm_sans = DM_Sans({
    subsets: ['latin'],
    weight: ['400', '700'],
    display: 'swap',
    variable: '--font-dm-sans'
});


export default function ModalCertificado({ certificado, isOpen, onClose }: ModalCertificadoProps) {
    
    const componentRef = useRef<HTMLDivElement | null>(null);

   const handleExportImage = async () => {
    const element = componentRef.current;
    if (!element) return; // Guard clause to make sure the ref is available

    // Generate the image using html2canvas
    const canvas = await html2canvas(element);
    
    // Convert the canvas to an image data URL (PNG format)
    const imgData = canvas.toDataURL('image/png');
    
    // Create a link element to trigger the download
    const link = document.createElement('a');
    link.href = imgData;
    link.download = 'certificate.png'; // Set the file name for download

    // Programmatically trigger the download
    link.click();
};

    if (!certificado || !certificado.id) {
        return null; 
    }
    return (
        <Transition appear show={isOpen} as={React.Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={React.Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                </Transition.Child>
                <div className={dm_sans.className}>
                    <div className="fixed inset-0 flex items-center justify-center p-4 rounded-lg">
                        <Dialog.Panel className="mx-auto w-[90%] h-[100%] rounded-md bg-[#F3F4F6] shadow-lg flex items-center justify-center overflow-auto">
                            <div className="rounded-md flex flex-col w-full items-center justify-start gap-2 h-full">
                                <div className="flex flex-col w-full pt-[1rem] pb-[1rem] pr-[1.5rem] pl-[1.5rem] items-start justify-start bg-white color-black mb-2">
                                    <div className='flex flex-row items-center justify-between w-full mb-2'>
                                        <div className='flex flex-row items-center justify-start gap-2'>
                                            <Image src={Olho} alt='olho' width={21} height={21} />
                                            <h1 className="text-[16px]">Vizualização do Certificado</h1>
                                        </div>
                                        <button
                                            className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:cursor-pointer"
                                            onClick={onClose}
                                        > 
                                            <Image src={Fechar} alt="Close" width={24} height={24}/>
                                        </button>
                                    </div>
                                    <div>
                                        <p className="text-gray-600 text-sm">
                                            Confira os dados do seu certificado antes de fazer o download
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center mb-4" ref={componentRef}>
                                    <Certificate {...certificado} />
                                </div>
                                <div className="flex flex-row items-center justify-center w-full pb-3">
                                    <button className='flex items-center justify-center h-[30px] w-[30px] hover:cursor-pointer rounded-full hover:bg-gray-200' onClick={() => handleExportImage()}>
                                        <Image src={Download} alt="baixar" width={24} height={24} />
                                    </button>
                                </div>
                            </div>
                        </Dialog.Panel>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}