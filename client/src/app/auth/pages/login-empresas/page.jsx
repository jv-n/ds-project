import AuthHeader from "@/app/auth/AuthHeader";
import LoginFormEmpresa from "./components/LoginForm";
import { Card } from "@/app/auth/components/ui/Card";
import { BackButton } from "@/app/auth/components/ui/BackButton";

export default function LoginEmpresaPage() {
  return (
    <div className="min-h-screen bg-[#CBEFFF] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-40 relative">
      <BackButton />

      <div className="w-full flex justify-center">
        <Card variant="elevated" className="w-full max-w-md py-8 sm:py-12">
          <div className="mx-auto w-full">
            <AuthHeader title="Entrar" />
          </div>

          <div className="mt-6 mx-auto w-full">
            <LoginFormEmpresa />
          </div>
        </Card>
      </div>
    </div>
  );
}

