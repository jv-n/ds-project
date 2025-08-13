import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { lupa } from '@/assets'; 

interface SearchbarProps {
  placeholder?: string;
  initialValue?: string; 
  onSearch: (text: string) => void;
}

export default function Searchbar({ placeholder = 'Pesquisar...', initialValue = '', onSearch }: SearchbarProps) {
  const [searchText, setSearchText] = useState(initialValue);

  useEffect(() => {
    setSearchText(initialValue);
  }, [initialValue]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setSearchText(newValue);
    onSearch(newValue);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <div className="border-b border-[#DBDBDB] pb-5 mb-4"> 
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          placeholder={placeholder}
          value={searchText}
          onChange={handleInputChange}
          className="w-full pr-10 pl-4 py-2 border-[1.5px] border-[#E8E8E8] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#294BB6] focus:border-transparent bg-white"
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <Image
            src={lupa}
            alt="Ícone de busca"
            width={40} 
            height={40} 
          />
        </div>
      </form>
    </div>
  );
}