// src/components/auth/AuthHeader.jsx
import Image from 'next/image';

const AuthHeader = ({ title, description, logo = true }) => {
  return (
    <div className="text-center">
      {logo && (
        <div className="flex justify-center mb-8">
          <Image 
            src="/images/RECIFEDOBEM.svg" 
            alt="Logo Recife do Bem" 
            width={120} 
            height={120}
            className="w-auto h-24" // Ajuste conforme necessário
          />
        </div>
      )}
      <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
      <p className="mt-10 text-gray-600">{description}</p>
    </div>
  );
};

export default AuthHeader;