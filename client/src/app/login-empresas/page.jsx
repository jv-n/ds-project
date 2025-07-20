import AuthHeader from "@/components/auth/AuthHeader";
import LoginFormEmpresa from "./components/LoginForm";
import { Card } from "@/components/ui/Card";

export default function LoginEmpresaPage() {
  return (
    <div className="min-h-screen bg-blue-100 flex flex-col justify-center py-12 sm:px-40 lg:px-140">
      <Card variant="elevated" className="py-27">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <AuthHeader 
          title="Entrar" 
        />
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <LoginFormEmpresa />
      </div>
      </Card>
    </div>
  );
}