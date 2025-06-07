import React from 'react';

const LayoutFooter = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        {/* Quitamos los enlaces y redes sociales por ahora */}
        {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">AlquiRate</h3>
            <p className="text-gray-300 mb-4">
              Empoderando a los inquilinos con información transparente para tomar mejores decisiones.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm4.957 7.571h-1.65c-.614 0-.857.42-.857.824v1.429h2.393l-.321 2.5h-2.143v6.429h-2.5v-6.429H9.571v-2.5h2.143v-1.643c0-2.071 1.286-3.214 3.214-3.214 1.214 0 1.857.107 2.143.143v2.461z"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm5.636 13.636c-.214.214-.5.321-.786.321s-.571-.107-.786-.321L12 12.571l-4.064 4.064c-.214.214-.5.321-.786.321s-.571-.107-.786-.321c-.429-.429-.429-1.143 0-1.571L10.429 11l6.364-6.936c-.429-.429-.429-1.143 0-1.571.429-.429 1.143-.429 1.571 0L12 9.429l4.064-4.064c.429-.429 1.143-.429 1.571 0 .429.429.429 1.143 0 1.571L13.571 11l4.064 4.064c.429.429.429 1.143 0 1.571z"></path>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Enlaces</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Inicio</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Propiedades</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Rankings</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Calificar</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Recursos</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Guía para inquilinos</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Derechos del inquilino</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Preguntas frecuentes</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-2 mt-0.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                <span className="text-gray-300">contacto@alquirate.com</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-2 mt-0.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                <span className="text-gray-300">+54 11 1234-5678</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-2 mt-0.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <span className="text-gray-300">Buenos Aires, Argentina</span>
              </li>
            </ul>
          </div>
        </div> */}
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; 2023 AlquiRate. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default LayoutFooter;