// src/components/TermsAndConditionsPage.js
import React from 'react';

const TermsAndConditionsPage = ({ setCurrentPage }) => {


  return (
    <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-xl p-6 md:p-10">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">Términos y Condiciones de Uso de AlquiRate</h1>
        
        <p className="mb-4 text-sm text-gray-600">Última actualización: Mayo de 2025</p>

        <p className="mb-4">
          Bienvenido a AlquiRate (en adelante, la "Plataforma"). Estos Términos y Condiciones de Uso (en adelante, los "Términos") rigen tu acceso y uso de la Plataforma operada por Big Data Services LLC (en adelante, "AlquiRate").
        </p>
        <p className="mb-6">
          Al acceder o utilizar la Plataforma, aceptas estar sujeto a estos Términos. Si no estás de acuerdo con alguna parte de los términos, no podrás acceder al servicio.
        </p>

        <h2 className="text-xl font-semibold text-gray-700 mt-6 mb-3">1. Descripción del Servicio</h2>
        <p className="mb-4">
          AlquiRate es una plataforma online diseñada para facilitar a los usuarios interesados en alquilar propiedades la visualización de calificaciones y opiniones, la calificación de propiedades y la consulta de rankings de precios por ubicación, tal como se describe en nuestros objetivos.
        </p>

        <h2 className="text-xl font-semibold text-gray-700 mt-6 mb-3">2. Cuentas de Usuario</h2>
        <p className="mb-2">
          Para acceder a ciertas funcionalidades de la Plataforma, como calificar propiedades, es posible que debas registrarte y crear una cuenta. Eres responsable de mantener la confidencialidad de tu contraseña y de todas las actividades que ocurran bajo tu cuenta.
        </p>
        <p className="mb-4">
          Aceptas proporcionar información veraz, actual y completa durante el proceso de registro y actualizar dicha información para mantenerla veraz, actual y completa.
        </p>

        <h2 className="text-xl font-semibold text-gray-700 mt-6 mb-3">3. Contenido Generado por el Usuario</h2>
        <p className="mb-2">
          Los usuarios pueden enviar, publicar y mostrar contenido, como calificaciones, reseñas, comentarios y otra información (en adelante, "Contenido del Usuario").
        </p>
        <p className="mb-2">
          Tú eres el único responsable de tu Contenido del Usuario y de las consecuencias de publicarlo. Al enviar Contenido del Usuario, afirmas, representas y garantizas que:
        </p>
        <ul className="list-disc list-inside mb-2 pl-4 text-gray-700 space-y-1">
          <li>Eres el creador y propietario del Contenido del Usuario o tienes las licencias, derechos, consentimientos y permisos necesarios para autorizarnos a usar tu Contenido del Usuario.</li>
          <li>Tu Contenido del Usuario no infringe ni infringirá los derechos de terceros, incluyendo derechos de autor, marcas comerciales, privacidad, publicidad u otros derechos personales o de propiedad.</li>
          <li>Tu Contenido del Usuario es veraz y se basa en tu experiencia personal.</li>
          <li>Tu Contenido del Usuario no es difamatorio, calumnioso, obsceno, pornográfico, acosador, odioso, racial o étnicamente ofensivo, o que fomente una conducta que se consideraría un delito penal, dé lugar a responsabilidad civil, viole alguna ley o sea inapropiado.</li>
        </ul>
        <p className="mb-2">
          Nos reservamos el derecho, pero no tenemos la obligación, de revisar, editar, bloquear o eliminar Contenido del Usuario a nuestra entera discreción y en cualquier momento, sin previo aviso y por cualquier motivo.
        </p>
        <p className="mb-4">
          Al publicar Contenido del Usuario en la Plataforma, otorgas a AlquiRate una licencia mundial, no exclusiva, libre de regalías, sublicenciable y transferible para usar, reproducir, distribuir, preparar trabajos derivados, mostrar y ejecutar el Contenido del Usuario en relación con la Plataforma y el negocio de AlquiRate, incluyendo, entre otros, la promoción y redistribución de parte o la totalidad de la Plataforma.
        </p>
        
        <h2 className="text-xl font-semibold text-gray-700 mt-6 mb-3">4. Conducta del Usuario</h2>
        <p className="mb-4">
          Te comprometes a no utilizar la Plataforma para ningún propósito ilegal o prohibido por estos Términos, o cualquier otra actividad que infrinja los derechos de AlquiRate o de otros.
        </p>

        <h2 className="text-xl font-semibold text-gray-700 mt-6 mb-3">5. Propiedad Intelectual</h2>
        <p className="mb-4">
          La Plataforma y su contenido original (excluyendo el Contenido del Usuario), características y funcionalidad son y seguirán siendo propiedad exclusiva de Big Data Services LLC y sus licenciantes.
        </p>

        <h2 className="text-xl font-semibold text-gray-700 mt-6 mb-3">6. Descargo de Responsabilidad</h2>
        <p className="mb-2">
          La Plataforma se proporciona "TAL CUAL" y "SEGÚN DISPONIBILIDAD". AlquiRate no ofrece garantías de ningún tipo, ya sean expresas o implícitas, sobre la operatividad de la Plataforma o la información, contenido o materiales incluidos en ella.
        </p>
        <p className="mb-2">
          AlquiRate no garantiza que la información proporcionada por los usuarios (calificaciones, comentarios, precios) sea precisa, completa, confiable, actual o libre de errores. Utilizas la información de la Plataforma bajo tu propio riesgo.
        </p>
        <p className="mb-4">
          AlquiRate no es una parte en ninguna transacción de alquiler ni actúa como agente inmobiliario o corredor. Somos una plataforma de información.
        </p>

        <h2 className="text-xl font-semibold text-gray-700 mt-6 mb-3">7. Limitación de Responsabilidad</h2>
        <p className="mb-4">
          En la máxima medida permitida por la ley aplicable, en ningún caso AlquiRate, sus directores, empleados, socios, agentes, proveedores o afiliados, serán responsables por daños indirectos, incidentales, especiales, consecuentes o punitivos, incluyendo, entre otros, pérdida de beneficios, datos, uso, buena voluntad u otras pérdidas intangibles, resultantes de (i) tu acceso o uso o incapacidad para acceder o usar la Plataforma; (ii) cualquier conducta o contenido de cualquier tercero en la Plataforma; (iii) cualquier contenido obtenido de la Plataforma; y (iv) acceso no autorizado, uso o alteración de tus transmisiones o contenido, ya sea basado en garantía, contrato, agravio (incluyendo negligencia) o cualquier otra teoría legal, ya sea que hayamos sido informados o no de la posibilidad de tales daños.
        </p>

        <h2 className="text-xl font-semibold text-gray-700 mt-6 mb-3">8. Modificaciones</h2>
        <p className="mb-4">
          Nos reservamos el derecho, a nuestra entera discreción, de modificar o reemplazar estos Términos en cualquier momento. Si una revisión es material, intentaremos proporcionar un aviso de al menos 30 días antes de que entren en vigor los nuevos términos. Lo que constituye un cambio material se determinará a nuestra entera discreción.
        </p>

        <h2 className="text-xl font-semibold text-gray-700 mt-6 mb-3">9. Ley Aplicable y Jurisdicción</h2>
        <p className="mb-4">
          Estos Términos se regirán e interpretarán de acuerdo con las leyes de la República Argentina, sin tener en cuenta sus disposiciones sobre conflicto de leyes. Para cualquier disputa, te sometes a la jurisdicción exclusiva de los tribunales competentes de la Ciudad Autónoma de Buenos Aires, Argentina.
        </p>

        <h2 className="text-xl font-semibold text-gray-700 mt-6 mb-3">10. Contacto</h2>
        <p className="mb-4">
          Si tienes alguna pregunta sobre estos Términos, por favor contáctanos en: contacto@alquirate.com
        </p>
        
        <p className="mt-8 text-xs text-gray-500">
          <strong>Aviso Importante:</strong> Este documento esta regido bajo las leyes de la República Argentina.

          Si la plataforma recopila datos personales —como opiniones, imágenes y/o información de geolocalización— deberá garantizar el cumplimiento de la Ley N.º 25.326 de Protección de los Datos Personales, su reglamentación y normativa complementaria. Esto incluye la obtención del consentimiento libre, expreso e informado del titular de los datos, el respeto del deber de confidencialidad y la implementación de medidas de seguridad adecuadas.

          Toda persona tiene derecho a acceder, rectificar y suprimir sus datos conforme al artículo 14 de la mencionada ley. El incumplimiento puede derivar en sanciones por parte de la Agencia de Acceso a la Información Pública (AAIP).

          AlquiRate se reserva el derecho de admisión y permanencia en la plataforma, así como la facultad de moderar, limitar o eliminar contenido que considere inadecuado o que vulnere los términos y condiciones de uso.
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditionsPage;