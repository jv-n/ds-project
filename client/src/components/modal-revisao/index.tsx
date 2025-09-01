import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { format } from "date-fns";
import { X, File, Download, CheckCircle2, XCircle } from "lucide-react";
import { type RowAuditoriaProps } from "@/components/row-auditoria";
import Button from "@/components/button";
import Chip from "@/components/chip-status";
import api from "@/services/api";

interface ModalRevisaoProps {
  isOpen: boolean;
  onClose: () => void;
  auditoria: RowAuditoriaProps | null;
  onSuccess: (newStatus: "aprovada" | "reprovada") => void;
}

export default function ModalRevisao({
  isOpen,
  onClose,
  auditoria,
  onSuccess,
}: ModalRevisaoProps) {
  const [isReproving, setIsReproving] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // URL do Backend construída dinamicamente
  const getBaseURL = () => {
    if (typeof window !== "undefined") {
      return process.env.NEXT_PUBLIC_API_BASE_URL; // ou use uma variável de ambiente se necessário
    }
    return "";
  };

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setIsReproving(false);
        setRejectionReason("");
      }, 300);
    }
  }, [isOpen]);

  if (!auditoria) return null;

  const handleClose = () => {
    if (isSubmitting) return;
    onClose();
  };

  const handleApprove = async () => {
    if (!auditoria) return;
    setIsSubmitting(true);
    try {
      const numericId = auditoria.id.replace("aud-", "");
      await api.patch(`/donation/${numericId}/audit/approve/`);

      onSuccess("aprovada");
      handleClose();
    } catch (error: any) {
      console.error("Erro ao aprovar:", error);
      alert(
        `Ocorreu um erro ao aprovar a doação: ${
          error.response?.data?.error || error.message
        }`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReject = async () => {
    if (!auditoria) return;
    setIsSubmitting(true);
    try {
      const numericId = auditoria.id.replace("aud-", "");
      await api.patch(`/donation/${numericId}/audit/reject/`, {
        motivo: rejectionReason,
      });

      onSuccess("reprovada");
      handleClose();
    } catch (error: any) {
      console.error("Erro ao rejeitar:", error);
      alert(
        `Ocorreu um erro ao rejeitar a doação: ${
          error.response?.data?.error || error.message
        }`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderDetailsAndDocuments = () => (
    <>
      <div className="flex gap-3 p-4 bg-[#F9FAFB] rounded-[6px]">
        <div className="flex flex-col gap-1.5 items-start w-1/2">
          <h3 className="font-sans text-[14px] font-semibold text-[#101828]">
            Detalhes da Doação
          </h3>
          <div className="text-left">
            <p className="font-sans text-[14px] font-normal text-[#0A0A0A]">
              <span className="font-semibold">Empresa:</span>{" "}
              {auditoria.nomeEmpresa}
            </p>
            <p className="font-sans text-[14px] font-normal text-[#0A0A0A]">
              <span className="font-semibold">Email:</span>{" "}
              {auditoria.emailEmpresa}
            </p>
            <p className="font-sans text-[14px] font-normal text-[#0A0A0A]">
              <span className="font-semibold">ONG Beneficiada:</span>{" "}
              {auditoria.nomeONG}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-1.5 items-start w-1/2">
          <h3 className="font-sans text-[14px] font-semibold text-[#101828]">
            Informações da Doação
          </h3>
          <div className="text-left">
            <p className="font-sans text-[14px] font-normal text-[#0A0A0A]">
              <span className="font-semibold">Ação:</span>{" "}
              {auditoria.acao || "Não informado"}
            </p>
            <p className="font-sans text-[14px] font-normal text-[#0A0A0A]">
              <span className="font-semibold">Tipo:</span>{" "}
              {auditoria.tipoDoacao}
            </p>
            <p className="font-sans text-[14px] font-normal text-[#0A0A0A]">
              <span className="font-semibold">Valor/Quantidade:</span>{" "}
              {auditoria.valorDoacao}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 flex-1 min-h-0">
        <h4 className="font-sans text-[16px] font-semibold text-[#101828]">
          Documentos Anexados ({auditoria.documentos.length})
        </h4>
        <div className="flex flex-col gap-2.5 h-full overflow-y-auto pr-4">
          {auditoria.documentos.map((doc) => {
            // ================== CORREÇÃO APLICADA AQUI ==================
            const docUrl = `http://vm-cinboraimpactar2.cin.ufpe.br/seloresponsaback/donation/${auditoria.id}/audit/documents/${doc.id}`;

            return (
              <div
                key={doc.id}
                className="flex justify-between items-center p-4 border border-[#E5E7EB] rounded-[8px]"
              >
                <div className="flex items-center gap-3 text-left">
                  <div className="flex-shrink-0 flex items-center justify-center w-[34px] h-[34px] bg-[#EFF6FF] rounded-[4px]">
                    <File size={20} className="text-[#1474FF]" />
                  </div>
                  <div>
                    {/* Usa a propriedade correta 'storedName' */}
                    <p className="font-sans text-[#101828] text-[14px] font-semibold">
                      {doc.storedName}
                    </p>
                    <p className="font-sans text-[#6A7282] text-[12px] font-normal">
                      {/* Usa a propriedade correta 'mimetype' */}
                      {doc.mimetype} • Enviado em{" "}
                      {format(new Date(auditoria.dataDoacao), "dd/MM/yyyy")}
                    </p>
                  </div>
                </div>
                {/* Usa a URL construída e o nome correto para o download */}
                <a
                  href={docUrl}
                  download={doc.storedName}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-3 py-1.5 rounded-md font-semibold text-xs transition-colors bg-white text-gray-800 border border-gray-300 hover:bg-gray-100 flex-shrink-0"
                >
                  <Download size={14} className="mr-2" /> <span>Baixar</span>
                </a>
              </div>
            );
            // ============================================================
          })}
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
              <div className="flex justify-between items-start gap-4">
                <div className="flex items-center gap-4">
                  <h2 className="font-sans text-[20px] text-black font-bold">
                    Revisão de Documentos
                  </h2>
                  {auditoria.status !== "aguardando" && (
                    <Chip status={auditoria.status} />
                  )}
                </div>
                <button
                  onClick={handleClose}
                  className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  <X size={20} className="text-[#0A0A0A]" />
                </button>
              </div>

              {auditoria.status === "aguardando" &&
                (isReproving ? (
                  <div className="flex flex-col rounded-[8px] border border-[#D1D5DC] gap-3 p-4 bg-white">
                    <label
                      htmlFor="motivo"
                      className="font-sans text-[14px] font-semibold text-[#101828]"
                    >
                      Motivo da Reprovação
                    </label>
                    <textarea
                      id="motivo"
                      rows={6}
                      className="w-full rounded-[8px] border border-[#D1D5DC] shadow-sm text-[#858585] focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
                      placeholder="Descreva o motivo da reprovação dos documentos..."
                      value={rejectionReason}
                      onChange={(e) => setRejectionReason(e.target.value)}
                      disabled={isSubmitting}
                    />
                  </div>
                ) : (
                  renderDetailsAndDocuments()
                ))}

              {auditoria.status === "reprovada" && (
                <div className="flex flex-col overflow-y-auto gap-6">
                  <div className="flex flex-col gap-2 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <h4 className="font-sans text-[14px] font-semibold text-red-800 flex items-center gap-2">
                      <XCircle size={16} /> Motivo da Reprovação
                    </h4>
                    <p className="font-sans text-sm text-red-700">
                      {auditoria.motivoReprovacao ||
                        "Nenhum motivo foi fornecido."}
                    </p>
                  </div>
                  {renderDetailsAndDocuments()}
                </div>
              )}

              {auditoria.status === "aprovada" && (
                <div className="flex flex-col overflow-y-auto gap-6">
                  <div className="flex flex-col gap-2 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-sans text-[14px] font-semibold text-green-800 flex items-center gap-2">
                      <CheckCircle2 size={16} /> Documentação Aprovada
                    </h4>
                    <p className="font-sans text-sm text-green-700">
                      Todos os documentos foram verificados e aprovados com
                      sucesso.
                    </p>
                  </div>
                  {renderDetailsAndDocuments()}
                </div>
              )}

              {auditoria.status === "aguardando" && (
                <div className="flex justify-end gap-4 border-t border-gray-200 pt-6">
                  {isReproving ? (
                    <>
                      <Button
                        variant="secondary"
                        className="flex-1"
                        onClick={() => setIsReproving(false)}
                        disabled={isSubmitting}
                      >
                        Voltar
                      </Button>
                      <Button
                        variant="primary"
                        className="flex-1"
                        onClick={handleReject}
                        disabled={isSubmitting}
                      >
                        {isSubmitting
                          ? "Reprovando..."
                          : "Reprovar e notificar"}
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="secondary"
                        className="flex-1"
                        onClick={() => setIsReproving(true)}
                        disabled={isSubmitting}
                      >
                        Reprovar
                      </Button>
                      <Button
                        variant="primary"
                        className="flex-1"
                        onClick={handleApprove}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Aprovando..." : "Aprovar e notificar"}
                      </Button>
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
