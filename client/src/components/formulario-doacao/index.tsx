import React, { useCallback, useState } from 'react';
import FileUploadInput from '../file-uploader';
import SuccessModal from '../sucess-modal';

interface CadastroDoacaoProps {
  onClose: () => void;
  ongName: string;
  actionName: string;
}

export default function CadastroDoacao({ onClose, ongName, actionName }: CadastroDoacaoProps) {
  const [valueOrQuantity, setValueOrQuantity] = useState('');
  const [documentosComprobatorios, setDocumentosComprobatorios] = useState<File[]>([]);

  const handleDocumentosAttached = useCallback((files: File[]) => {
    setDocumentosComprobatorios(files);
  }, []);

  const [isDonationTypeDropdownOpen, setIsDonationTypeDropdownOpen] = useState(false);
  const [selectedDonationType, setSelectedDonationType] = useState('');

  const donationTypesOptions = ["Dinheiro", "Alimento", "Roupa", "Serviço"];
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    onClose();
  };
  const handleSelectDonationType = (type: string) => {
    setSelectedDonationType(type);
    setIsDonationTypeDropdownOpen(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log({
      ongName,
      actionName,
      selectedDonationType,
      valueOrQuantity,
      documentosComprobatorios: documentosComprobatorios.map(f => f.name),
    });
    setShowSuccessModal(true);
  };

  return (
    <div className="bg-white flex flex-col h-full">

      {/* Cabeçalho do Formulário */}
      <div className="flex justify-between items-start px-0 pt-0 pb-6 flex-shrink-0">
        <div>
          <h3 className="text-xl font-bold text-[#000000] mb-1">Cadastrar doação</h3>
          <p className="text-gray-600 text-xs font-normal leading-tight mb-1">ONG {ongName}</p>
          <p className="text-gray-600 text-xs font-normal leading-tight">Ação: {actionName}</p>
        </div>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Formulário principal */}
      <form onSubmit={handleSubmit} className="flex-grow flex flex-col"> 
        <div className="space-y-5 flex-grow"> 
          {/* Tipo de doação */}
          <div className="relative pt-2">
            <label
              htmlFor="tipoDoacao"
              className="absolute left-4 top-0 text-xs font-medium text-[#898B8F] bg-white px-1 -mt-px z-10"
            >
              Tipo de doação*
            </label>
            <div
              id="tipoDoacao"
              className="
                flex justify-between items-center px-4 py-2 text-base
                border-[1.5px] border-gray-900 rounded-sm shadow-sm bg-white cursor-pointer
                focus:outline-none focus:ring-1 focus:ring-[#009FE3] focus:border-[#009FE3]
                hover:border-gray-900
                h-[48px]
              "
              onClick={() => setIsDonationTypeDropdownOpen(!isDonationTypeDropdownOpen)}
              tabIndex={0}
              onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                      setIsDonationTypeDropdownOpen(!isDonationTypeDropdownOpen);
                  }
              }}
            >
              <span className={`${selectedDonationType ? 'text-gray-700' : 'text-gray-400'}`}>
                {selectedDonationType || 'Placeholder'}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`w-6 h-6 text-gray-900 transition-transform duration-300 ${isDonationTypeDropdownOpen ? 'rotate-180' : ''}`}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </div>

            <div
              className={`absolute z-20 w-full bg-white border border-gray-900 rounded-sm mt-1 overflow-hidden transition-all duration-300 ${isDonationTypeDropdownOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}
            >
              <div className="py-1">
                {donationTypesOptions.map((option) => (
                  <div
                    key={option}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700 text-base"
                    onClick={() => handleSelectDonationType(option)}
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            handleSelectDonationType(option);
                        }
                    }}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Valor ou quantidade */}
          <div className="relative pt-2">
            <label
              htmlFor="valorQuantidade"
              className="absolute left-4 top-0 text-xs font-medium text-[#898B8F] bg-white px-1 -mt-px z-10"
            >
              Valor ou quantidade*
            </label>
            <input
              type="text"
              id="valorQuantidade"
              name="valorQuantidade"
              placeholder="Placeholder"
              value={valueOrQuantity}
              onChange={(e) => setValueOrQuantity(e.target.value)}
              className="
                block w-full px-4 py-2 text-base
                text-gray-700
                border-[1.5px] border-gray-900 rounded-sm shadow-sm
                focus:outline-none focus:ring-1 focus:ring-[#009FE3] focus:border-[#009FE3]
                placeholder:text-gray-400
                hover:border-gray-900
                h-[48px]
              "
            />
          </div>

          {/* Documentos Comprobatórios */}
          <FileUploadInput
            label="Documentos Comprobatórios"
            subtitle="Anexe até 5 documentos que comprovem a doação"
            onFilesAttached={handleDocumentosAttached}
            maxFiles={5}
          />
        </div>

        {/* Botão de Enviar */}
        <button
          type="submit"
          className="
            flex flex-row items-center justify-center
            w-full h-[48px]
            bg-[#1474FF] text-white py-3 px-6 rounded-sm font-normal text-base hover:bg-[#1B2029] transition-colors
            mt-auto 
            mb-0 
            flex-shrink-0 /* Garante que o botão não encolha em altura */
            cursor-pointer
          "
        >
          Enviar para validação
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6 ml-3"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
          </svg>
        </button>
      </form>
      <SuccessModal isOpen={showSuccessModal} onClose={handleCloseSuccessModal} />
    </div>
  );
}