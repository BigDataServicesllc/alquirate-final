import React from 'react';

const LayoutFooter = ({ setCurrentPage }) => {
    return (
    <footer className="bg-gray-800 text-white py-10 mt-auto">
      <div className="container mx-auto px-4">
        {/* Contenedor principal para las columnas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-center md:text-left">
          
          {/* Columna 1: Logo y descripción */}
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold mb-2">AlquiRate</h3>
            <p className="text-gray-400 text-sm">
              Decisiones informadas, alquileres más justos.
            </p>
          </div>

          {/* Columnas de enlaces */}
          <div className="md:col-span-2 grid grid-cols-2 gap-8">
            {/* Columna 2: Legal */}
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => setCurrentPage('terminos')} className="text-gray-300 hover:text-white transition-colors duration-200">
                    Términos y Condiciones
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentPage('privacidad')} className="text-gray-300 hover:text-white transition-colors duration-200">
                    Política de Privacidad
                  </button>
                </li>
              </ul>
            </div>
            
            {/* Columna 3: Contacto */}
            <div>
              <h4 className="font-semibold mb-4">Contacto</h4>
              <ul className="space-y-2">
                <li>
                  <a href="mailto:contacto@alquirate.com" className="text-gray-300 hover:text-white transition-colors duration-200">
                    Contáctanos
                  </a>
                </li>
                 <li>
                  <a href="mailto:contacto@alquirate.com?subject=Sugerencia para AlquiRate" className="text-gray-300 hover:text-white transition-colors duration-200">
                    Enviar Sugerencia
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Divisor y Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>© {new Date().getFullYear()} AlquiRate. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default LayoutFooter;