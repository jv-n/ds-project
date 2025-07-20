// src/services/authService.js
export const loginOng = async (cnpj, password) => {
    try {
      const response = await fetch('https://sua-api.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cnpj, password }),
      });
  
      if (!response.ok) throw new Error('Credenciais inválidas');
      return await response.json(); // Retorna os dados da ONG (ex: token, nome, etc.)
    } catch (error) {
      throw error; // Lança o erro para ser tratado no componente
    }
  };