export const formatPrice = (price) => {
  // Asegurarse de que price sea un número antes de formatear
  const numericPrice = typeof price === 'number' ? price : parseFloat(price);
  if (isNaN(numericPrice)) {
    return 'Precio no disponible';
  }
  // Formatear como moneda argentina
  return `$${numericPrice.toLocaleString('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
};

export const formatDate = (dateString) => {
  try {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-AR', options);
  } catch (error) {
    console.error("Error formatting date:", dateString, error);
    return dateString || 'Fecha no disponible';
  }
};

export const formatRating = (rating) => {
   // Asegurarse de que rating sea un número válido
  const numericRating = typeof rating === 'number' ? rating : parseFloat(rating);
  if (isNaN(numericRating)) {
    return 'N/A';
  }
  return numericRating.toFixed(1);
};

export const truncateText = (text, maxLength) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};