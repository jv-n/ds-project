import Link from "next/link";
import { Card } from "@/app/auth/components/ui/Card";
import close from "@/assets/close.svg";
import Image from "next/image";

const Modal = ({ isOpen, closeLink = "/entrar", children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-100 bg-opacity-50 flex items-center justify-center z-50">
      <Card variant="elevated" className="py-27 relative">
        {/* Botão de fechar como Link, usando closeLink */}
        <Link
          href={closeLink}
          className="absolute top-3 right-3 w-8 h-8 p-1 hover:bg-gray-200 rounded-full transition"
        >
          <Image src={close} alt="Ícone de Fechar" width={28} height={28} />
        </Link>

        <div className="mb-5">{children}</div>
      </Card>
    </div>
  );
};

export default Modal;


