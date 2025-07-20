import AuthHeader from "@/components/auth/AuthHeader";
import LoginFormOng from "./components/LoginForm";
import { Card } from "@/components/ui/Card";

export default function LoginOngPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <AuthHeader 
          title="Login para ONGs" 
          description="Acesse sua conta de organização" 
        />
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card variant="elevated" className="py-8 px-4 sm:px-10">
          <LoginFormOng />
        </Card>
      </div>
    </div>
  );
}