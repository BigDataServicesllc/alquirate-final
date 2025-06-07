AlquiRate - Frontend
Bienvenido al proyecto AlquiRate, una plataforma donde los inquilinos pueden calificar su experiencia y consultar rankings de precios de alquileres por zona.
🚀 Tecnologías utilizadas
React 18
Tailwind CSS
Framer Motion (animaciones)
Firebase Auth + Firestore
Google Maps API (autocompletado de dirección)
Docker (para entorno local y despliegue)
📁 Estructura del proyecto
alquiratedocker/                 # Raíz del proyecto (parece un monorepo)
├── backend/                     # (Contenido no visible en las capturas, pero la carpeta existe)
├── cors-setup/
│   └── cors.json                # Configuración CORS, probablemente para Firebase Functions o Storage
├── db/                          # (Contenido no visible, pero la carpeta existe)
├── frontend/                    # Proyecto React
│   ├── build/                   # Carpeta de la compilación de producción (generada)
│   ├── node_modules/            # Dependencias del proyecto (generada, usualmente en .gitignore)
│   ├── public/
│   │   ├── icons/
│   │   │   ├── apple.svg
│   │   │   ├── facebook.svg
│   │   │   └── google.svg
│   │   ├── _redirects.txt       # Probablemente para Netlify/Vercel u otro hosting
│   │   ├── favicon.ico
│   │   ├── index.html           # Plantilla HTML principal
│   │   └── test-google-login.html # Página de prueba para el login con Google
│   ├── src/                     # Código fuente de la aplicación React
│   │   ├── components/          # Componentes de React
│   │   │   ├── AddReviewPage.js
│   │   │   ├── CustomToast.js
│   │   │   ├── EmailAuthForm.js
│   │   │   ├── EmailLogin.js
│   │   │   ├── FavoritesPage.js
│   │   │   ├── ForgotPasswordPage.js
│   │   │   ├── HomePage.js
│   │   │   ├── LayoutFooter.js
│   │   │   ├── LayoutHeader.js
│   │   │   ├── ListingsPage.js
│   │   │   ├── LoginModal.js
│   │   │   ├── LoginPage.js
│   │   │   ├── MyReviewsPage.js
|   |   |   ├── PleaseVerifyEmailPage.js
│   │   │   ├── ProfileMenu.js
│   │   │   ├── ProfilePage.js
│   │   │   ├── RankingsPage.js
│   │   │   ├── RatingStars.js
│   │   │   ├── RegisterPage.js
│   │   │   ├── ReviewSubmitted.js
│   │   │   ├── SimpleContent.js
│   │   │   └── SimpleHeader.js
│   │   ├── contexts/
│   │   │   └── AuthContext.js
│   │   ├── mock/                # Datos de prueba (mock data)
│   │   │   ├── properties.js
│   │   │   ├── reviews.js
│   │   │   └── users.js
|   │   ├── Pages/
│   │   │   ├── PrivacyPolicyPage.js
|   |   |   └── TermsAndConditionsPage.js
|   │   ├── steps/
│   │   │   ├── AddressStep.js          # step 0
│   │   │   ├── FinalReview.js          # step 4
│   │   │   ├── PropertyConditions.js   # step 2
│   │   │   ├── RentDetails.js          # step 1
│   │   │   ├── ZoneEnvironment.js      # step 3
│   │   ├── utils/               # Funciones de utilidad
│   │   │   ├── firebase.js      # Configuración y funciones de Firebase
│   │   │   └── formatters.js    # Funciones para formatear datos (fechas, moneda, etc.)
│   │   ├── App.js               # Componente principal de la aplicación
│   │   ├── index.js             # Punto de entrada de la aplicación React
│   │   └── styles.css           # Estilos globales o base (quizás importando Tailwind)
│   ├── .dockerignore            # Archivos a ignorar por Docker al construir la imagen
│   ├── Dockerfile               # Definición para construir la imagen Docker del frontend
│   ├── nginx.conf               # Configuración de Nginx (probablemente para servir el frontend en Docker)
│   ├── package-lock.json        # Versiones exactas de las dependencias
│   ├── package.json             # Metadatos del proyecto y dependencias
│   ├── postcss.config.js        # Configuración de PostCSS (usado por Tailwind)
│   └── tailwind.config.js       # Configuración de Tailwind CSS
├── docker-compose.yml           # Orquestación de los contenedores Docker (frontend, backend, db)
└── README.md                    # Documentación del proyecto