import AuthHeader from "@/components/auth/AuthHeader";
import LoginFormEmpresa from "./components/LoginForm";
import { Card } from "@/components/ui/Card";

export default function LoginEmpresaPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <AuthHeader 
          title="Login para Empresas" 
          description="Acesse sua conta corporativa" 
        />
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card variant="elevated" className="py-8 px-4 sm:px-10">
          <LoginFormEmpresa />
        </Card>
      </div>
    </div>
  );
}