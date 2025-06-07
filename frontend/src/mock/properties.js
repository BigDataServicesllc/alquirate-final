export const properties = [
  {
    id: 1,
    title: "Departamento luminoso en Palermo",
    description: "Hermoso departamento de 2 ambientes con balcón y excelente ubicación cerca de plazas y transporte público.",
    price: 85000,
    location: "Palermo, Buenos Aires",
    address: "Av. Santa Fe 3200",
    bedrooms: 1,
    bathrooms: 1,
    area: 45,
    imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    owner: "Carlos Rodríguez",
    ownerRating: 4.2,
    propertyRating: 4.5,
    reviews: [
      {
        id: 101,
        user: "María L.",
        rating: 5,
        comment: "Excelente departamento, muy luminoso y el dueño siempre respondió rápido a cualquier consulta.",
        date: "2023-05-15"
      },
      {
        id: 102,
        user: "Juan P.",
        rating: 4,
        comment: "Buena ubicación y cómodo, aunque el agua caliente a veces falla.",
        date: "2023-03-22"
      }
    ]
  },
  {
    id: 2,
    title: "Monoambiente moderno en Recoleta",
    description: "Monoambiente totalmente renovado con cocina integrada y baño completo. Edificio con seguridad 24hs.",
    price: 65000,
    location: "Recoleta, Buenos Aires",
    address: "Juncal 2200",
    bedrooms: 0,
    bathrooms: 1,
    area: 30,
    imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    owner: "Laura Martínez",
    ownerRating: 3.8,
    propertyRating: 4.0,
    reviews: [
      {
        id: 201,
        user: "Pedro S.",
        rating: 4,
        comment: "Departamento pequeño pero muy bien aprovechado. La dueña tardó en resolver un problema con la heladera.",
        date: "2023-04-10"
      }
    ]
  },
  {
    id: 3,
    title: "Casa amplia en Belgrano",
    description: "Casa de 3 dormitorios con patio, parrilla y cochera. Ideal para familia. Cerca de colegios y parques.",
    price: 150000,
    location: "Belgrano, Buenos Aires",
    address: "Echeverría 2800",
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    imageUrl: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    owner: "Martín Gómez",
    ownerRating: 4.7,
    propertyRating: 4.8,
    reviews: [
      {
        id: 301,
        user: "Ana F.",
        rating: 5,
        comment: "Casa espectacular, muy bien mantenida. El dueño siempre atento a cualquier necesidad.",
        date: "2023-06-05"
      },
      {
        id: 302,
        user: "Roberto D.",
        rating: 5,
        comment: "Excelente propiedad, amplia y cómoda. Muy recomendable.",
        date: "2023-02-18"
      },
      {
        id: 303,
        user: "Lucía M.",
        rating: 4,
        comment: "Muy buena casa, aunque el jardín necesita más mantenimiento.",
        date: "2023-01-30"
      }
    ]
  },
  {
    id: 4,
    title: "Departamento céntrico en Córdoba",
    description: "Departamento de 2 dormitorios en pleno centro de Córdoba. Excelente para estudiantes o jóvenes profesionales.",
    price: 70000,
    location: "Centro, Córdoba",
    address: "Av. Colón 1500",
    bedrooms: 2,
    bathrooms: 1,
    area: 60,
    imageUrl: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    owner: "Silvia Peralta",
    ownerRating: 3.5,
    propertyRating: 3.7,
    reviews: [
      {
        id: 401,
        user: "Diego M.",
        rating: 3,
        comment: "La ubicación es buena pero el departamento necesita mantenimiento. La dueña tardó en resolver un problema con la heladera.",
        date: "2023-05-20"
      },
      {
        id: 402,
        user: "Carolina P.",
        rating: 4,
        comment: "Buena relación precio-calidad. Algunos problemas con los vecinos ruidosos.",
        date: "2023-04-15"
      }
    ]
  },
  {
    id: 5,
    title: "Loft moderno en Rosario",
    description: "Loft de diseño con terminaciones de alta calidad. Cocina completa y terraza con vista al río.",
    price: 95000,
    location: "Centro, Rosario",
    address: "Córdoba 2100",
    bedrooms: 1,
    bathrooms: 1,
    area: 55,
    imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    owner: "Fernando Díaz",
    ownerRating: 4.9,
    propertyRating: 4.7,
    reviews: [
      {
        id: 501,
        user: "Valeria S.",
        rating: 5,
        comment: "Increíble loft, muy bien equipado y con una vista espectacular. El dueño es muy atento.",
        date: "2023-06-10"
      },
      {
        id: 502,
        user: "Gustavo L.",
        rating: 4,
        comment: "Excelente propiedad, aunque el precio es un poco elevado para la zona.",
        date: "2023-03-25"
      }
    ]
  },
  {
    id: 6,
    title: "Departamento en Mendoza cerca de viñedos",
    description: "Hermoso departamento de 2 dormitorios con vista a las montañas. A 15 minutos de los principales viñedos.",
    price: 80000,
    location: "Godoy Cruz, Mendoza",
    address: "San Martín 500",
    bedrooms: 2,
    bathrooms: 1,
    area: 70,
    imageUrl: "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    owner: "Patricia Sánchez",
    ownerRating: 4.3,
    propertyRating: 4.5,
    reviews: [
      {
        id: 601,
        user: "Marcelo R.",
        rating: 5,
        comment: "Departamento muy cómodo y bien ubicado. La dueña es muy amable y servicial.",
        date: "2023-05-30"
      },
      {
        id: 602,
        user: "Cecilia A.",
        rating: 4,
        comment: "Buena propiedad, aunque la calefacción podría mejorar para los meses de invierno.",
        date: "2023-02-10"
      }
    ]
  }
];

export const priceRankings = {
  "Buenos Aires": {
    "Palermo": {
      averagePrice: 90000,
      minPrice: 70000,
      maxPrice: 120000,
      trend: "up",
      comparison: "15% por encima del promedio de la ciudad"
    },
    "Recoleta": {
      averagePrice: 85000,
      minPrice: 65000,
      maxPrice: 110000,
      trend: "stable",
      comparison: "10% por encima del promedio de la ciudad"
    },
    "Belgrano": {
      averagePrice: 95000,
      minPrice: 75000,
      maxPrice: 150000,
      trend: "up",
      comparison: "20% por encima del promedio de la ciudad"
    },
    "Caballito": {
      averagePrice: 75000,
      minPrice: 60000,
      maxPrice: 95000,
      trend: "stable",
      comparison: "Igual al promedio de la ciudad"
    },
    "Almagro": {
      averagePrice: 70000,
      minPrice: 55000,
      maxPrice: 90000,
      trend: "down",
      comparison: "5% por debajo del promedio de la ciudad"
    }
  },
  "Córdoba": {
    "Capital": { // Cambiado de "Centro" a "Capital" para consistencia con departamentos
      averagePrice: 65000,
      minPrice: 50000,
      maxPrice: 85000,
      trend: "up",
      comparison: "10% por encima del promedio de la ciudad"
    },
    "Nueva Córdoba": {
      averagePrice: 70000,
      minPrice: 55000,
      maxPrice: 90000,
      trend: "up",
      comparison: "15% por encima del promedio de la ciudad"
    },
    "Güemes": {
      averagePrice: 60000,
      minPrice: 45000,
      maxPrice: 80000,
      trend: "stable",
      comparison: "5% por encima del promedio de la ciudad"
    }
  },
  "Rosario": {
    "Centro": {
      averagePrice: 60000,
      minPrice: 45000,
      maxPrice: 80000,
      trend: "stable",
      comparison: "Igual al promedio de la ciudad"
    },
    "Pichincha": {
      averagePrice: 65000,
      minPrice: 50000,
      maxPrice: 85000,
      trend: "up",
      comparison: "10% por encima del promedio de la ciudad"
    }
  },
  "Mendoza": {
    "Capital": { // Cambiado de "Ciudad" a "Capital"
      averagePrice: 55000,
      minPrice: 40000,
      maxPrice: 75000,
      trend: "up",
      comparison: "Igual al promedio de la ciudad"
    },
    "Godoy Cruz": {
      averagePrice: 50000,
      minPrice: 35000,
      maxPrice: 70000,
      trend: "stable",
      comparison: "5% por debajo del promedio de la ciudad"
    }
  }
};