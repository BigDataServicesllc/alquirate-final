import React from 'react';

const RentDetailsStep = ({ formData, handleChange, errors }) => {
  // Opciones para el tipo de ajuste de precio
  const priceAdjustmentOptions = [
    { value: '', label: 'Selecciona un tipo...' },
    { value: 'ley_alquileres_anterior', label: 'Ley Anterior (Ajuste anual ICL/BCRA)' },
    { value: 'dnu_actual_acuerdo_partes', label: 'Acuerdo entre partes (DNU vigente, ej: trimestral IPC)' },
    { value: 'temporal_precio_fijo', label: 'Alquiler Temporal (Precio fijo por período)' },
    { value: 'contrato_usd', label: 'Contrato en Dólares (Precio fijo en USD)' },
    { value: 'otro', label: 'Otro / No estoy seguro' },
  ];

  // Opciones de moneda (como las tenías, sin EUR)
  const currencyOptions = [
    { value: 'ARS', label: 'ARS' },
    { value: 'USD', label: 'USD' },
  ];

  // Opciones para condiciones de ingreso (como las tenías)
  const entryRequirementOptions = [
    { value: 'property_guarantee', label: 'Garantía propietaria' },
    { value: 'surety_insurance', label: 'Seguro de caución' },
    { value: 'cash_deposit_ars', label: 'Depósito en pesos' },
    { value: 'cash_deposit_usd', label: 'Depósito en dólares' },
    { value: 'no_guarantee_required', label: 'Sin garantía' },
    { value: 'other', label: 'Otro tipo de garantía' },
  ];

  return (
    <div>
      <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-6">Cuéntanos sobre tu alquiler</h2>
      <div className="space-y-6">

        {/* Moneda */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Moneda aceptada para el pago del alquiler</label>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {currencyOptions.map(currency => (
              <label key={currency.value} className="flex items-center p-2 rounded-md hover:bg-gray-50 cursor-pointer border border-gray-300 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50">
                <input
                  type="radio"
                  name="rentCurrency"
                  value={currency.value}
                  checked={formData.rentCurrency === currency.value}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">{currency.label}</span>
              </label>
            ))}
          </div>
          {errors.rentCurrency && <p className="text-red-500 text-xs mt-1">{errors.rentCurrency}</p>}
        </div>

        {/* Precio */}
        <div>
          <label htmlFor="rentAmount" className="block text-sm font-medium text-gray-700 mb-1">
            Precio del alquiler (en {formData.rentCurrency || '...'})
          </label>
          <input
            type="number"
            id="rentAmount"
            name="rentAmount"
            value={formData.rentAmount}
            onChange={handleChange}
            placeholder="Ej: 150000"
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm ${errors.rentAmount ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.rentAmount && <p className="text-red-500 text-xs mt-1">{errors.rentAmount}</p>}
        </div>

        {/* ***** INICIO: NUEVOS CAMPOS ***** */}
        {/* Fecha de Inicio del Contrato */}
        <div>
          <label htmlFor="contractStartDate" className="block text-sm font-medium text-gray-700 mb-1">
            Fecha de inicio del contrato (o cuando se pactó el precio)
          </label>
          <input
            type="date"
            id="contractStartDate"
            name="contractStartDate" // Este 'name' debe coincidir con la propiedad en formData
            value={formData.contractStartDate || ''} // Controlar con el estado
            onChange={handleChange} // El handleChange genérico debería funcionar
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm ${errors.contractStartDate ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.contractStartDate && <p className="text-red-500 text-xs mt-1">{errors.contractStartDate}</p>}
        </div>

        {/* Tipo de Ajuste de Precio */}
        <div>
          <label htmlFor="priceAdjustmentType" className="block text-sm font-medium text-gray-700 mb-1">
            Tipo de contrato / Régimen de actualización de precio
          </label>
          <select
            id="priceAdjustmentType"
            name="priceAdjustmentType" // Este 'name' debe coincidir con la propiedad en formData
            value={formData.priceAdjustmentType || ''} // Controlar con el estado
            onChange={handleChange} // El handleChange genérico debería funcionar
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm ${errors.priceAdjustmentType ? 'border-red-500' : 'border-gray-300'}`}
          >
            {priceAdjustmentOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          {errors.priceAdjustmentType && <p className="text-red-500 text-xs mt-1">{errors.priceAdjustmentType}</p>}
        </div>
        {/* ***** FIN: NUEVOS CAMPOS ***** */}

        {/* ¿Contrato de alquiler? */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">¿El arrendador ofreció un contrato de alquiler?</label>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {[ { label: 'Sí', value: true }, { label: 'No', value: false } ].map(option => (
              <label key={`hasRentalContract-${String(option.value)}`} className="flex items-center p-2 rounded-md hover:bg-gray-50 cursor-pointer border border-gray-300 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50">
                <input
                  type="radio"
                  name="hasRentalContract"
                  value={String(option.value)}
                  checked={formData.hasRentalContract === option.value}
                  onChange={(e) => {
                    const booleanValue = e.target.value === 'true';
                    handleChange({ target: { name: 'hasRentalContract', value: booleanValue, type: 'radio' } });
                  }}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
          {errors.hasRentalContract && <p className="text-red-500 text-xs mt-1">{errors.hasRentalContract}</p>}
        </div>
        
        {/* ¿Pago bancario? */}
         <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">¿Se puede pagar el alquiler con depósito o transferencia bancaria?</label>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {[ { label: 'Sí', value: true }, { label: 'No', value: false } ].map(option => (
              <label key={`bankPaymentAvailable-${String(option.value)}`} className="flex items-center p-2 rounded-md hover:bg-gray-50 cursor-pointer border border-gray-300 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50">
                <input
                  type="radio"
                  name="bankPaymentAvailable"
                  value={String(option.value)}
                  checked={formData.bankPaymentAvailable === option.value}
                  onChange={(e) => {
                    const booleanValue = e.target.value === 'true';
                    handleChange({ target: { name: 'bankPaymentAvailable', value: booleanValue, type: 'radio' } });
                  }}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
          {errors.bankPaymentAvailable && <p className="text-red-500 text-xs mt-1">{errors.bankPaymentAvailable}</p>}
        </div>

        {/* Condiciones de Ingreso */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Condiciones de ingreso solicitadas (selecciona todas las que apliquen)</label>
          <div className="space-y-2">
            {entryRequirementOptions.map(option => (
              <label key={option.value} className="flex items-center p-2 rounded-md hover:bg-gray-50 cursor-pointer border border-transparent has-[:checked]:border-blue-200 has-[:checked]:bg-blue-50">
                <input
                  type="checkbox"
                  name="entryRequirements"
                  value={option.value}
                  checked={(formData.entryRequirements || []).includes(option.value)}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-3 text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
            { (formData.entryRequirements || []).includes('other') && (
              <div className="mt-2 ml-7">
                <label htmlFor="entryRequirementsOtherText" className="sr-only">Especifica otra condición</label>
                <input
                  type="text"
                  name="entryRequirementsOtherText"
                  value={formData.entryRequirementsOtherText || ''}
                  onChange={handleChange}
                  placeholder="Especifica otra condición..."
                  className="w-full sm:w-2/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            )}
          </div>
          {errors.entryRequirements && <p className="text-red-500 text-xs mt-1">{errors.entryRequirements}</p>}
        </div>
      </div>
    </div>
  );
};

export default RentDetailsStep; // Asumiendo que renombraste el archivo y el componente