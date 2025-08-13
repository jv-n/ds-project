import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { format } from 'date-fns';
import { X, File, Download, CheckCircle2, XCircle } from 'lucide-react'; 
import { type RowAuditoriaProps } from '@/components/row-auditoria';
import Button from '@/components/button';
import Chip from '@/components/chip-status'

interface ModalRevisaoProps {
  isOpen: boolean;
  onClose: () => void;
  auditoria: RowAuditoriaProps | null;
}

export default function ModalRevisao({ isOpen, onClose, auditoria }: ModalRevisaoProps) {
  const [isReproving, setIsReproving] = useState(false);
  
  if (!auditoria) return null;
  
  const formattedDate = format(new Date(auditoria.dataDoacao), 'dd/MM/yyyy');
  
  const handleClose = () => {
    setIsReproving(false);
    onClose();
  };
  
  // Renderiza o conteúdo principal (detalhes e documentos)
  const renderDetailsAndDocuments = () => (
    <>
      <div className='flex gap-3 p-4 bg-[#F9FAFB] rounded-[6px]'>
        <div className='flex flex-col gap-1.5 items-start w-1/2'>
          <h3 className='font-sans text-[14px] font-semibold text-[#101828]'>Detalhes da Doação</h3>
          <div className='text-left'>
            <p className='font-sans text-[14px] font-normal text-[#0A0A0A]'><span className="font-semibold">Empresa:</span> {auditoria.nomeEmpresa}</p>
            <p className='font-sans text-[14px] font-normal text-[#0A0A0A]'><span className="font-semibold">Email:</span> {auditoria.emailEmpresa}</p>
            <p className='font-sans text-[14px] font-normal text-[#0A0A0A]'><span className="font-semibold">ONG Beneficiada:</span> {auditoria.nomeONG}</p>
          </div>
        </div>
        <div className='flex flex-col gap-1.5 items-start w-1/2'>
          <h3 className='font-sans text-[14px] font-semibold text-[#101828]'>Informações da Doação</h3>
          <div className='text-left'>
            <p className='font-sans text-[14px] font-normal text-[#0A0A0A]'><span className="font-semibold">Ação:</span> {auditoria.acao || 'Não informado'}</p>
            <p className='font-sans text-[14px] font-normal text-[#0A0A0A]'><span className="font-semibold">Tipo:</span> {auditoria.tipoDoacao}</p>
            <p className='font-sans text-[14px] font-normal text-[#0A0A0A]'><span className="font-semibold">Valor/Quantidade:</span> {auditoria.valorDoacao}</p>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-4 flex-1 min-h-0'>
        <h4 className='font-sans text-[16px] font-semibold text-[#101828]'>Documentos Anexados ({auditoria.documentos.length})</h4>
        <div className="flex flex-col gap-2.5 h-full overflow-y-auto pr-4">
          {auditoria.documentos.map((doc) => (
            <div key={doc.id} className="flex justify-between items-center p-4 border border-[#E5E7EB] rounded-[8px]"> 
              <div className="flex items-center gap-3 text-left"> 
                <div className='flex-shrink-0 flex items-center justify-center w-[34px] h-[34px] bg-[#EFF6FF] rounded-[4px]'><File size={20} className='text-[#1474FF]' /></div> 
                <div>
                  <p className="font-sans text-[#101828] text-[14px] font-semibold">{doc.nome}</p>
                  <p className="font-sans text-[#6A7282] text-[12px] font-normal">
                    {doc.tipo} • Enviado em {format(new Date(doc.dataEnvio), 'dd/MM/yyyy')}
                  </p>
                </div>
              </div>
              <a href={doc.url} download={doc.nome} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-3 py-1.5 rounded-md font-semibold text-xs transition-colors bg-white text-gray-800 border border-gray-300 hover:bg-gray-100 flex-shrink-0">
                <Download size={14} className="mr-2" /> <span>Baixar</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <Transition appear show={isOpen}>
      <Dialog as="div" className="relative z-10" onClose={handleClose}>
        <div className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="w-full max-w-3xl transform overflow-hidden rounded-[8px] bg-white p-6 text-left shadow-xl transition-all flex flex-col gap-6 max-h-[95vh]">
              <div className='flex justify-between items-start gap-4'>
                <div className="flex items-center gap-4">
                  <h2 className="font-sans text-[20px] text-black font-bold">Revisão de Documentos</h2>
                  {/* O Chip só aparece se o status não for 'aguardando' */}
                  {auditoria.status !== 'aguardando' && <Chip status={auditoria.status} />}
                </div>
                <button onClick={handleClose} className="p-1 rounded-full hover:bg-gray-100">
                  <X size={20} className='text-[#0A0A0A]' />
                </button>
              </div>
              
              
              {auditoria.status === 'aguardando' && (
                isReproving ? (
                  <div className="flex flex-col rounded-[8px] border border-[#D1D5DC] gap-3 p-4 bg-white">
                  <label htmlFor="motivo" className="font-sans text-[14px] font-semibold text-[#101828]">Motivo da Reprovação</label>
                  <textarea
                    id="motivo"
                    rows={6}
                    className="w-full rounded-[8px] border border-[#D1D5DC] shadow-sm text-[#858585] focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
                    placeholder="Descreva o motivo da reprovação dos documentos..."
                  />
                  </div>
                ) : (
                  renderDetailsAndDocuments()
                )
              )}

              {auditoria.status === 'reprovada' && (
                <div className="flex flex-col overflow-y-auto gap-6">
                   <div className="flex flex-col gap-2 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <h4 className="font-sans text-[14px] font-semibold text-red-800 flex items-center gap-2"><XCircle size={16}/> Motivo da Reprovação</h4>
                    <p className="font-sans text-sm text-red-700">{auditoria.motivoReprovacao || 'Nenhum motivo foi fornecido.'}</p>
                   </div>
                   {renderDetailsAndDocuments()}
                </div>
              )}

              {auditoria.status === 'aprovada' && (
                <div className="flex flex-col overflow-y-auto gap-6">
                  <div className="flex flex-col gap-2 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-sans text-[14px] font-semibold text-green-800 flex items-center gap-2"><CheckCircle2 size={16}/> Documentação Aprovada</h4>
                    <p className="font-sans text-sm text-green-700">Todos os documentos foram verificados e aprovados com sucesso.</p>
                  </div>
                  {renderDetailsAndDocuments()}
                </div>
              )}

              {/* O rodapé só aparece se o status for 'aguardando' */}
              {auditoria.status === 'aguardando' && (
                <div className="flex justify-end gap-4 border-t border-gray-200 pt-6">
                  {isReproving ? (
                    <>
                      <Button variant="secondary" className="flex-1" onClick={() => setIsReproving(false)}>Voltar</Button>
                      <Button variant="primary" className="flex-1" onClick={handleClose}>Reprovar e notificar</Button>
                    </>
                  ) : (
                    <>
                      <Button variant="secondary" className="flex-1" onClick={() => setIsReproving(true)}>Reprovar</Button>
                      <Button variant="primary" className="flex-1" onClick={handleClose}>Aprovar e notificar</Button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}