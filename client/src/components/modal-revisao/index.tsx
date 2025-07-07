import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { format } from 'date-fns';
import { X, File, Download } from 'lucide-react'; 
import { type RowAuditoriaProps } from '@/components/row-auditoria';
import Button from '@/components/button';

interface ModalRevisaoProps {
  isOpen: boolean;
  onClose: () => void;
  auditoria: RowAuditoriaProps | null;
}

export default function ModalRevisao({ isOpen, onClose, auditoria }: ModalRevisaoProps) {
  const [isReproving, setIsReproving] = useState(false);

  if (!auditoria) {
    return null;
  }
  const formattedDate = format(new Date(auditoria.dataDoacao), 'dd/MM/yyyy');
  
  const handleClose = () => {
    setIsReproving(false);
    onClose();
  };
  
  return (
    <Transition appear show={isOpen}>
      <Dialog as="div" className="relative z-10" onClose={handleClose}>
        <div className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <div
              className="
                w-full max-w-3xl transform overflow-hidden rounded-[8px] bg-white p-6 text-left
                align-middle shadow-xl transition-all flex flex-col gap-6 max-h-[90vh]
              "
            >
              {/* --- INÍCIO DO CONTEÚDO DO MODAL --- */}

              {/* Bloco 1: Cabeçalho */}
              <div className='flex justify-between items-start'>
                <div>
                  <h2 className="font-sans text-[20px] text-black font-bold">Revisão de Documentos</h2>
                  <p className="font-sans text-[13px] text-[#4A5565]">
                    Submissão de {auditoria.nomeEmpresa} - {formattedDate}
                  </p>
                </div>
                <button onClick={handleClose} className="p-1 rounded-full hover:bg-gray-100">
                  <X size={20} className='text-[#0A0A0A]' />
                </button>
              </div>

              {/* Bloco 2: Lógica de Troca de Tela */}
              {isReproving ? (
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
                    <div className="flex flex-col gap-2.5 overflow-y-auto pr-6">
                      {auditoria.documentos.map((doc) => (
                        <div key={doc.id} className="flex justify-between items-center p-4 border border-[#E5E7EB] rounded-[8px] bg-white hover:bg-[#F9FAFB] transition-colors duration-200 gap-4">
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
              )}

              {/* Bloco 3: Rodapé com os botões de ação */}
              <div className="flex justify-end gap-4  pt-6">
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

              {/* --- FIM DO CONTEÚDO DO MODAL --- */}
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
