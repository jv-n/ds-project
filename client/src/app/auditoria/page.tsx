// arquivo: app/auditoria/page.tsx
import Button from '@/components/button';
import { Download } from 'lucide-react'; 

export default function AuditoriaPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white p-24">
      <div className="flex flex-col items-start gap-4">
        
        <h1 className="text-2xl font-bold mb-4">
          Testando o Componente Button
        </h1>

        {/* --- Testes --- */}
        <Button variant="primary" icon={<Download size={16} />}>
          Baixar Certificado
        </Button>
        
        <Button variant="secondary" icon={<Download size={16} />}>
          Baixar Certificado
        </Button>
        
        <Button variant="primary">
          Apenas Texto
        </Button>

        <Button variant="secondary" disabled>
          Botão Desabilitado
        </Button>

      </div>
    </main>
  );
}