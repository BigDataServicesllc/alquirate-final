import React, { useState } from 'react';

const ForgotPasswordPage = ({ setCurrentPage }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError('');
  };
  
  const validateEmail = () => {
    if (!email.trim()) {
      setError('El email es obligatorio');
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError('El email no es válido');
      return false;
    }
    return true;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateEmail()) {
      setIsLoading(true);
      
      // Simular una petición al servidor
      setTimeout(() => {
        setIsLoading(false);
        setIsSubmitted(true);
      }, 1500);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Recuperar contraseña</h1>
        
        <div className="bg-white rounded-xl shadow-md p-8">
          {!isSubmitted ? (
            <>
              <p className="text-gray-600 mb-6">
                Ingresa tu dirección de correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
              </p>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Correo electrónico</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                </div>
                
                <div className="mt-6">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-2 rounded-lg text-white font-medium transition-colors ${
                      isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Enviando...
                      </div>
                    ) : 'Enviar enlace de recuperación'}
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              
              <h2 className="text-2xl font-semibold mb-4">¡Correo enviado!</h2>
              <p className="text-gray-600 mb-6">
                Hemos enviado un enlace de recuperación a <span className="font-semibold">{email}</span>.
                Por favor, revisa tu bandeja de entrada y sigue las instrucciones para restablecer tu contraseña.
              </p>
              
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6 text-left">
                <p className="text-blue-700">
                  <span className="font-semibold">Nota:</span> Si no encuentras el correo en tu bandeja de entrada, revisa la carpeta de spam o correo no deseado.
                </p>
              </div>
              
              <button
                onClick={() => setCurrentPage('login')}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Volver a inicio de sesión
              </button>
            </div>
          )}
          
          <div className="mt-6 text-center">
            <button 
              onClick={() => setCurrentPage('login')}
              className="text-blue-600 hover:underline font-medium"
            >
              Volver a inicio de sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;