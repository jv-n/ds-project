import React, { useCallback, useState } from 'react';
import FileUploadInput from '../file-uploader';
import FloatingInput from '../floating-input';

interface CadastroDoacaoProps {
  onClose: () => void;
  ongName: string;
  actionName: string;
  onSubmitDonation: (data: {
    tipoAjuda: string;
    valorOuQuantidade: string;
    documentos: File[];
  }) => void;
}

export default function CadastroDoacao({ onClose, ongName, actionName, onSubmitDonation }: CadastroDoacaoProps) {
  const [valueOrQuantity, setValueOrQuantity] = useState('');
  const [documentosComprobatorios, setDocumentosComprobatorios] = useState<File[]>([]);
  const [isDonationTypeDropdownOpen, setIsDonationTypeDropdownOpen] = useState(false);
  const [selectedDonationType, setSelectedDonationType] = useState('');
  const [errors, setErrors] = useState<{ tipo?: string; valor?: string }>({});
  const [forceFileError, setForceFileError] = useState<string | null>(null);

  const donationTypesOptions = ["Dinheiro", "Serviço"];

  const handleDocumentosAttached = useCallback((files: File[]) => {
    setDocumentosComprobatorios(files);
  }, []);

  const handleSelectDonationType = (type: string) => {
    setSelectedDonationType(type);
    setIsDonationTypeDropdownOpen(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setForceFileError(null);
    const newErrors: typeof errors = {};

    if (!selectedDonationType) newErrors.tipo = "Selecione o tipo de doação.";
    if (!valueOrQuantity.trim()) newErrors.valor = "Informe o valor ou quantidade.";
    if (documentosComprobatorios.length === 0) {
      setForceFileError("Anexe pelo menos um documento.");
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0 || documentosComprobatorios.length === 0) return;

    onSubmitDonation({
      tipoAjuda: selectedDonationType,
      valorOuQuantidade: valueOrQuantity,
      documentos: documentosComprobatorios,
    });
  };

  return (
    <div className="bg-white flex flex-col h-full max-w-[400px] mx-auto w-full px-2 text-sm">
      {/* Cabeçalho */}
      <div className="flex justify-between items-start px-0 pt-0 pb-6 flex-shrink-0">
        <div>
          <h3 className="text-xl font-bold text-[#000000] mb-1">Cadastrar Doação</h3>
          <p className="text-gray-600 text-xs">ONG {ongName}</p>
          <p className="text-gray-600 text-xs">Ação: {actionName}</p>
        </div>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Formulário */}
      <form onSubmit={handleSubmit} className="flex-grow flex flex-col">
        <div className="space-y-5 flex-grow overflow-y-auto">
          {/* Tipo */}
          <FloatingInput
            label="Tipo de doação*"
            value={selectedDonationType || ""}
            onChange={(v) => setSelectedDonationType(v)}
            options={donationTypesOptions} // ativa o comportamento de dropdown
            error={errors.tipo}
            placeholder='Selecione um tipo de doação'
            />

          {/* Valor */}
          <FloatingInput
            label="Valor ou quantidade*"
            value={valueOrQuantity}
            onChange={setValueOrQuantity}
            error={errors?.valor}
            placeholder='Informe o valor ou quantidade'
            />

          {/* Documentos */}
          <FileUploadInput
            label="Documentos Comprobatórios*"
            subtitle="Anexe até 5 documentos que comprovem a doação"
            onFilesAttached={handleDocumentosAttached}
            maxFiles={5}
            forceErrorMessage={forceFileError ?? undefined}
          />
        </div>

        {/* Botão */}
        <button
          type="submit"
          className="flex flex-row items-center justify-center w-full h-[48px]
                     bg-[#1474FF] text-white py-3 px-6 rounded-sm font-normal text-base 
                     hover:bg-[#1B2029] transition-colors mt-auto mb-0 flex-shrink-0 cursor-pointer"
        >
          Enviar para validação
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            strokeWidth={2} stroke="currentColor" className="w-6 h-6 ml-3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
          </svg>
        </button>
      </form>
    </div>
  );
}
