// src/components/PrivacyPolicyPage.js
import React from 'react';

const PrivacyPolicyPage = ({ setCurrentPage }) => { 

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-xl p-6 md:p-10">
        {/* Botón Volver en la parte superior */}
        <div className="mb-6">
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">Política de Privacidad de AlquiRate</h1>
        <p className="mb-4 text-sm text-gray-600">Última actualización: Mayo de 2025</p>

        <p className="mb-4">
          En AlquiRate (en adelante, "Nosotros", "Nuestro", o la "Plataforma"), operada por Big Data Services LLC, respetamos tu privacidad y nos comprometemos a proteger tu información personal. Esta Política de Privacidad explica cómo recolectamos, usamos, compartimos y protegemos tu información cuando visitas o utilizas nuestra plataforma.
        </p>
        <p className="mb-6">
          Al utilizar AlquiRate, aceptas la recopilación y el uso de información de acuerdo con esta política.
        </p>

        <h2 className="text-xl font-semibold text-gray-700 mt-6 mb-3">1. Información que Recopilamos</h2>
        <p className="mb-2">Podemos recopilar y procesar los siguientes datos sobre ti:</p>
        <ul className="list-disc list-inside mb-4 pl-4 text-gray-700 space-y-1">
          <li><strong>Información de Registro:</strong> Cuando creas una cuenta, podemos recopilar tu nombre, apellido, dirección de correo electrónico y contraseña.</li>
          <li><strong>Información de Perfil:</strong> Información adicional que elijas proporcionar en tu perfil, como número de teléfono, dirección, ciudad, tipo de vivienda, y foto de perfil.</li>
          <li><strong>Contenido Generado por el Usuario:</strong> Calificaciones, reseñas, comentarios, y cualquier otra información que publiques sobre propiedades o propietarios.</li>
          <li><strong>Información de Propiedades:</strong> incluye detalles sobre las propiedades que calificás, como la dirección, características y tu experiencia como inquilino. Esta información no será visible públicamente ni estará vinculada a tu identidad. Su único propósito es alimentar los rankings y análisis que dan sustento a la plataforma, con el objetivo de brindar información útil y anónima a la comunidad.</li>
          <li><strong>Datos de Uso:</strong> Información sobre cómo utilizas nuestra Plataforma, como las búsquedas que realizas, las páginas que visitas, y tus interacciones con las funcionalidades.</li>
          <li><strong>Información Técnica:</strong> Dirección IP, tipo de navegador, sistema operativo, información del dispositivo, y datos de cookies (ver sección de Cookies).</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-700 mt-6 mb-3">2. Cómo Usamos tu Información</h2>
        <p className="mb-2">Utilizamos la información que recopilamos para diversos fines, que incluyen:</p>
        <ul className="list-disc list-inside mb-4 pl-4 text-gray-700 space-y-1">
          <li>Proporcionar, operar y mantener nuestra Plataforma.</li>
          <li>Permitirte crear y gestionar tu cuenta.</li>
          <li>Mostrar tus calificaciones y comentarios a otros usuarios (de forma anónima o asociada a un alias si así lo configuras, o a tu nombre según se indique).</li>
          <li>Generar rankings de precios de alquiler por zona (utilizando datos agregados y/o anónimos).</li>
          <li>Mejorar y personalizar tu experiencia en la Plataforma.</li>
          <li>Entender y analizar cómo utilizas nuestra Plataforma para mejorarla.</li>
          <li>Comunicarnos contigo, incluyendo responder a tus consultas y enviarte información sobre el servicio o notificaciones (si has optado por recibirlas).</li>
          <li>Prevenir fraudes y garantizar la seguridad de nuestra Plataforma.</li>
          <li>Cumplir con obligaciones legales.</li>
        </ul>
        <p className="mb-4">
          Específicamente, la información de calificaciones sobre propiedades y propietarios tiene como objetivo empoderar a los inquilinos y mejorar la transparencia en el mercado de alquileres.
        </p>

        <h2 className="text-xl font-semibold text-gray-700 mt-6 mb-3">3. Cómo Compartimos tu Información</h2>
        <p className="mb-2">Podemos compartir tu información en las siguientes circunstancias:</p>
        <ul className="list-disc list-inside mb-4 pl-4 text-gray-700 space-y-1">
          <li><strong>Con Otros Usuarios:</strong> Tus calificaciones y comentarios sobre propiedades serán visibles para otros usuarios de la Plataforma. Dependiendo de la configuración, esto podría ser anónimo, con un alias, o con tu nombre de perfil. Sé consciente de la información que compartes públicamente.</li>
          <li><strong>Datos Agregados y Anónimos:</strong> Podemos compartir información agregada o anónima (que no te identifica personalmente) con terceros para análisis, investigación, generación de rankings de precios, o marketing.</li>
          <li><strong>Proveedores de Servicios:</strong> Podemos compartir información con proveedores de servicios externos que nos ayudan a operar la Plataforma (ej. hosting, análisis de datos, servicios de correo electrónico). Estos proveedores solo tendrán acceso a tu información para realizar estas tareas en nuestro nombre y están obligados a no divulgarla ni utilizarla para ningún otro propósito.</li>
          <li><strong>Requisitos Legales:</strong> Podemos divulgar tu información si así lo exige la ley o en respuesta a solicitudes válidas de autoridades públicas.</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-700 mt-6 mb-3">4. Seguridad de tus Datos</h2>
        <p className="mb-4">
          La seguridad de tus datos es importante para nosotros. Utilizamos medidas de seguridad razonables para proteger tu información personal contra el acceso no autorizado, la alteración, la divulgación o la destrucción. Sin embargo, recuerda que ningún método de transmisión por Internet o método de almacenamiento electrónico es 100% seguro.
        </p>

        <h2 className="text-xl font-semibold text-gray-700 mt-6 mb-3">5. Tus Derechos de Protección de Datos (Ley 25.326)</h2>
        <p className="mb-2">
          De acuerdo con la Ley de Protección de Datos Personales N° 25.326 de Argentina, tienes ciertos derechos sobre tus datos personales, incluyendo:
        </p>
        <ul className="list-disc list-inside mb-4 pl-4 text-gray-700 space-y-1">
          <li><strong>Derecho de Acceso:</strong> El derecho a solicitar acceso a los datos personales que tenemos sobre ti.</li>
          <li><strong>Derecho de Rectificación:</strong> El derecho a solicitar la corrección de cualquier información personal que consideres inexacta o incompleta.</li>
          <li><strong>Derecho de Supresión (Olvido):</strong> El derecho a solicitar la eliminación de tus datos personales bajo ciertas condiciones.</li>
          <li><strong>Derecho de Actualización:</strong> El derecho a solicitar la actualización de tus datos personales.</li>
        </ul>
        <p className="mb-4">
          Para ejercer estos derechos, puedes contactarnos a través de contacto@alquirate.com. La Agencia de Acceso a la Información Pública, en su carácter de Órgano de Control de la Ley N° 25.326, tiene la atribución de atender las denuncias y reclamos que interpongan quienes resulten afectados en sus derechos por incumplimiento de las normas vigentes en materia de protección de datos personales.
        </p>

        <h2 className="text-xl font-semibold text-gray-700 mt-6 mb-3">6. Cookies y Tecnologías Similares</h2>
        <p className="mb-4">
          Podemos utilizar cookies y tecnologías de seguimiento similares para rastrear la actividad en nuestra Plataforma y mantener cierta información. Las cookies son archivos con una pequeña cantidad de datos que pueden incluir un identificador único anónimo. Puedes indicar a tu navegador que rechace todas las cookies o que te avise cuándo se envía una cookie. Sin embargo, si no aceptas cookies, es posible que no puedas utilizar algunas partes de nuestra Plataforma.
        </p>

        <h2 className="text-xl font-semibold text-gray-700 mt-6 mb-3">7. Privacidad de los Niños</h2>
        <p className="mb-4">
          Nuestra Plataforma no está dirigida a personas menores de 18 años ("Niños"). No recopilamos deliberadamente información de identificación personal de Niños. Si eres padre o tutor y sabes que tu hijo nos ha proporcionado Datos Personales, contáctanos.
        </p>

        <h2 className="text-xl font-semibold text-gray-700 mt-6 mb-3">8. Cambios a esta Política de Privacidad</h2>
        <p className="mb-4">
          Podemos actualizar nuestra Política de Privacidad de vez en cuando. Te notificaremos cualquier cambio publicando la nueva Política de Privacidad en esta página y actualizando la fecha de "Última actualización" en la parte superior. Se te aconseja revisar esta Política de Privacidad periódicamente para cualquier cambio.
        </p>

        <h2 className="text-xl font-semibold text-gray-700 mt-6 mb-3">9. Contáctanos</h2>
        <p className="mb-4">
          Si tienes alguna pregunta sobre esta Política de Privacidad, por favor contáctanos en: contacto@alquirate.com
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

export default PrivacyPolicyPage;