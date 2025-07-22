import { format } from 'date-fns';
import Chip from '@/components/chip-status';
import Button from '@/components/button';

export interface Documento {
    id: string;
    nome: string;
    tipo: string;
    dataEnvio: string;
    url: string;
}

export interface RowAuditoriaProps {
   id: string; 
   nomeEmpresa: string;
   emailEmpresa: string;
   nomeONG: string;
   tipoDoacao: string;
   valorDoacao: string;
   dataDoacao: string;
   status: 'aguardando' | 'aprovada' | 'reprovada';
   onClick?: () => void;
   documentos: Documento[];
   acao: string;
}   

export default function RowAuditoria(props: RowAuditoriaProps) {
   const formattedDate = format(new Date(props.dataDoacao), 'dd/MM/yyyy');

   return (
    <div className='flex items-center gap-6 px-6 py-4 bg-white hover:bg-[#F2F2F2] border-b border-[#E5E7EB] w-full transition-colors cursor-pointer'>
        <div className='flex flex-col flex-start w-[260px]'>
            <div className='font-sans text-sm font-semibold h-[18px] truncate text-[#101828]'>{props.nomeEmpresa}</div>
            <div className='font-sans text-[13px] font-normal h-[18px] truncate text-[#6A7282]'>{props.emailEmpresa}</div>
        </div>
        <div className='flex-1 font-sans text-sm font-normal h-[18px] truncate text-[#101828]'>{props.nomeONG}</div>
        <div className='flex flex-col flex-start w-[160px]'>
            <div className='font-sans text-sm font-normal h-[18px] truncate text-[#101828]'>{props.tipoDoacao}</div>
            <div className='font-sans text-[13px] font-normal h-[18px] truncate text-[#6A7282]'>{props.valorDoacao}</div>
        </div>
        <div className='font-sans text-[13px] font-normal h-[18px] truncate text-[#6A7282]'>{formattedDate}</div>
        <div className='w-[146px] flex justify-start'>
            <Chip status={props.status} />
        </div>
        <div className='w-auto'>
            <Button 
                variant="secondary" 
                onClick={(event) => {
                    // Impede que o clique no botão também acione o clique da linha inteira
                    event.stopPropagation();

                    // Chama a função que veio das props, se ela existir
                    if (props.onClick) {
                        props.onClick();
                    }
                }}
            >
                Revisar
            </Button>
        </div>
    </div>
   )
     
}