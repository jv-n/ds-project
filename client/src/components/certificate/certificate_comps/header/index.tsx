import Image from "next/image"
import { segoeUI } from "../.."


export default function Header() {
    return(
  
        <div className='w-full h-[45px] bg-[#EFF9FD] flex flex-row items-center justify-between border-b-2 border-[#009FE3] pb-2 p-[4px]'>
            <div>
                <Image
                   src="/logo.png"
                   alt="logo da Prefeitura do Recife"
                   width={100}
                   height={30}
                >
                </Image>
                </div>

                <div className='flex flex-col items-center justify-center text-center'>
                    <div className = 'flex flex-row items-center justify-center'>
                         <div className='text-[8px] text-[#009FE3]'>
                               <div className={segoeUI.className} style={{ fontWeight: '700' }}>
                                    PORTAL BORA IMPACTAR
                                </div>
                            </div>
                            <div className='text-[6px] text-[#99A1AF] font-bold ml-1 mr-1'>
                                <div className={segoeUI.className} style={{ fontWeight: '400' }}>em parceria com a </div>
                            </div>
                            <div className='text-[8px] text-[#009FE3] font-bold'>
                                <div className={segoeUI.className} style={{ fontWeight: '700' }}>
                                    PREFEITURA DO RECIFE
                                </div>
                            </div>
                        </div>

                    <div>
                        <div className='text-[7px] text-[#4A5565] flex flex-row items-center justify-center'>
                            <div className={segoeUI.className} style={{ fontWeight: '700' }}>
                                GOVERNO MUNICIPAL DE RECIFE
                            </div>
                            <div className='ml-1 mr-1'>|</div>
                            <div className={segoeUI.className} style={{ fontWeight: '700' }}>
                                RESPONSABILIDADE SOCIAL EMPRESARIAL
                            </div>
                        </div>

                    </div>
                </div>

                         <div className='flex flex-col items-center justify-center text-center'>
                            <div className='h-[30px] w-[30px] bg-[#009FE3] rounded-full flex items-center justify-center'>

                            </div>
                        </div>

        </div>
    )

}