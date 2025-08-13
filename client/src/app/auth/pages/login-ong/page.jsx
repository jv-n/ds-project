import AuthHeader from "@/app/auth/AuthHeader";
import LoginFormOng from "./components/LoginForm";
import { Card } from "@/app/auth/components/ui/Card";
import { BackButton } from "../../components/ui/BackButton";

export default function LoginOngPage() {
  return (
    <div className="min-h-screen bg-blue-100 flex flex-col justify-center py-12 sm:px-40 lg:px-140 relative">
      <BackButton />
      <Card variant="elevated" className="py-27">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <AuthHeader title="Entrar" />
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <LoginFormOng />
        </div>
      </Card>
    </div>
  );
}
