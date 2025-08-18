"use client";
import { BackButton } from "@/app/auth/components/ui/BackButton";
function FormContainer({ children }) {
  return (
    <main className="min-h-screen py-12 bg-gray-50 relative">
      <BackButton />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </main>
  );
}
export default FormContainer;
