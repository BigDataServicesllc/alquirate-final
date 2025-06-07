export const users = [
  {
    id: "user123",
    name: "María López",
    email: "maria@example.com",
    profilePicture: "https://randomuser.me/api/portraits/women/1.jpg",
    memberSince: "2022-01-15",
    reviewsCount: 5,
    propertiesRated: [1, 3, 5]
  },
  {
    id: "user456",
    name: "Juan Pérez",
    email: "juan@example.com",
    profilePicture: "https://randomuser.me/api/portraits/men/1.jpg",
    memberSince: "2022-03-22",
    reviewsCount: 3,
    propertiesRated: [1, 4]
  },
  {
    id: "user789",
    name: "Pedro Sánchez",
    email: "pedro@example.com",
    profilePicture: "https://randomuser.me/api/portraits/men/2.jpg",
    memberSince: "2022-05-10",
    reviewsCount: 2,
    propertiesRated: [2]
  },
  {
    id: "user101",
    name: "Ana Fernández",
    email: "ana@example.com",
    profilePicture: "https://randomuser.me/api/portraits/women/2.jpg",
    memberSince: "2021-11-05",
    reviewsCount: 7,
    propertiesRated: [3, 5, 6]
  },
  {
    id: "user202",
    name: "Diego Martínez",
    email: "diego@example.com",
    profilePicture: "https://randomuser.me/api/portraits/men/3.jpg",
    memberSince: "2022-02-18",
    reviewsCount: 4,
    propertiesRated: [4, 2]
  }
];

// Simular el usuario actualmente logueado (puedes cambiar estos datos para probar)
//  Usa este email y cualquier contraseña para iniciar sesión en la versión actual 
export const currentUser = {
  id: "userTest", // Un ID diferente para el usuario de prueba
  name: "Tu Nombre de Prueba", // ¡Pon tu nombre aquí!
  email: "ortizmontilla@gmail.com", // ¡Usa este email para iniciar sesión!
  profilePicture: "https://randomuser.me/api/portraits/men/45.jpg", // Cambia la URL si quieres otra foto
  memberSince: "2023-10-27", // Fecha de hoy
  reviewsCount: 0, // Inicialmente 0 reseñas
  propertiesRated: []
};