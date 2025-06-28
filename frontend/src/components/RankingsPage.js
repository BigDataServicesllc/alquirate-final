// src/components/RankingsPage.js
//import { Link } from 'react-router-dom';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { db } from '../utils/firebase';
import { collection, getDocs, query as firestoreQuery, where, orderBy } from 'firebase/firestore';
import { toast } from 'react-toastify';
import TipsSection from './TipsSection';

const formatPrice = (price, currency = 'ARS') => {
  if (price === null || typeof price === 'undefined' || isNaN(Number(price))) return 'N/A';
  return new Intl.NumberFormat('es-AR', { style: 'currency', currency, minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(price);
};

const ITEMS_PER_PAGE = 10;
const RANKINGS_COLLECTION_NAME = 'localityRankings';

const RankingsPage = ({ onLocalityClick }) => {
  const [provinces, setProvinces] = useState([]);
  const [loadingProvinces, setLoadingProvinces] = useState(true);
  const [selectedProvinceId, setSelectedProvinceId] = useState('');
  const [selectedProvinceName, setSelectedProvinceName] = useState('');
  const [rankingData, setRankingData] = useState([]);
  const [loadingRanking, setLoadingRanking] = useState(false);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'averagePriceArs', direction: 'descending' });
  const [currentPage, setCurrentPage] = useState(1);

  // ✅ CORRECCIÓN: La lógica para cargar provincias está restaurada aquí.
  useEffect(() => {
    const fetchProvincesAndSetDefault = async () => {
      setLoadingProvinces(true);
      setError(null);
      try {
        const q = firestoreQuery(collection(db, 'provinces'), orderBy('name'));
        const snapshot = await getDocs(q);
        const list = snapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().name,
          name_normalized: doc.data().name_normalized ?? '',
        }));
        setProvinces(list);

        if (list.length > 0) {
          const cabaProvince = list.find(p => p.name_normalized === "ciudad autonoma de buenos aires" || p.name === "Ciudad Autónoma de Buenos Aires");
          if (cabaProvince) {
            setSelectedProvinceId(cabaProvince.id);
            setSelectedProvinceName(cabaProvince.name);
          } else {
            setSelectedProvinceId(list[0].id);
            setSelectedProvinceName(list[0].name);
          }
        }
      } catch (err) { 
        console.error("[RankingsPage] Error fetching provinces:", err);
        setError("Error al cargar provincias.");
        toast.error("Error al cargar provincias.");
      }
      setLoadingProvinces(false);
    };
    fetchProvincesAndSetDefault();
  }, []);

  const fetchRankingData = useCallback(async () => {
    if (!selectedProvinceId) {
      setRankingData([]);
      return;
    }
    setLoadingRanking(true);
    setError(null);

    try {
      const rankingsQuery = firestoreQuery(
        collection(db, RANKINGS_COLLECTION_NAME),
        where('provinceId', '==', selectedProvinceId),
        where('priceReviewCount', '>', 0)
      );
      
      const snapshot = await getDocs(rankingsQuery);
      
      const precalculatedRankings = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setRankingData(precalculatedRankings);

    } catch (err) {
      console.error("[RankingsPage] Error fetching rankings:", err);
      setError("Error al cargar el ranking.");
      toast.error("Error al cargar el ranking.");
      setRankingData([]);
    }
    setLoadingRanking(false);
  }, [selectedProvinceId]);

  useEffect(() => {
    if (selectedProvinceId) {
      fetchRankingData();
    }
  }, [selectedProvinceId, fetchRankingData]);

  const requestSort = (key) => {
    let direction = 'descending';
    if (sortConfig.key === key && sortConfig.direction === 'descending') {
      direction = 'ascending';
    }
    setSortConfig({ key, direction });
    setCurrentPage(1);
  };
  
  const sortedRankingData = useMemo(() => {
    let sortableItems = [...rankingData];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] === null && b[sortConfig.key] === null) return 0;
        if (a[sortConfig.key] === null) return 1;
        if (b[sortConfig.key] === null) return -1;
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
      });
    }
    return sortableItems;
  }, [rankingData, sortConfig]);

  const totalPages = useMemo(() => Math.ceil(sortedRankingData.length / ITEMS_PER_PAGE), [sortedRankingData]);
  const paginatedData = useMemo(() => sortedRankingData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE), [sortedRankingData, currentPage]);

  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handlePreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  const handleProvinceChange = (e) => {
    const newSelectedProvinceId = e.target.value;
    const provinceObj = provinces.find(p => p.id === newSelectedProvinceId);
    setSelectedProvinceId(newSelectedProvinceId);
    setSelectedProvinceName(provinceObj ? provinceObj.name : '');
  };

  const getSortIndicator = (key) => sortConfig.key === key ? (sortConfig.direction === 'ascending' ? ' ▲' : ' ▼') : '';
  
  const renderTableHeaders = () => (
    <>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => requestSort('localityName')}>Localidad/Barrio{getSortIndicator('localityName')}</th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => requestSort('averagePriceArs')}>Precio Promedio{getSortIndicator('averagePriceArs')}</th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => requestSort('minPriceArs')}>Precio Mínimo{getSortIndicator('minPriceArs')}</th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => requestSort('maxPriceArs')}>Precio Máximo{getSortIndicator('maxPriceArs')}</th>
    </>
  );

  const renderTableRows = () => {
    if (loadingRanking) return null; 
    
    if (paginatedData.length === 0) {
      return (
        <tr>
          <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
            {selectedProvinceId ? "No hay datos de precios para la provincia seleccionada." : "Selecciona una provincia."}
          </td>
        </tr>
      );
    }
    return paginatedData.map((item) => (
      <tr key={item.id} className="hover:bg-gray-50">
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600 hover:text-blue-800">
          <button onClick={() => onLocalityClick(item.id)} className="text-blue-600 hover:text-blue-800 hover:underline text-left w-full">
            {item.localityName}
          </button>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatPrice(item.averagePriceArs, 'ARS')}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatPrice(item.minPriceArs, 'ARS')}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatPrice(item.maxPriceArs, 'ARS')}</td>
      </tr>
    ));
  };

  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Rankings de Precios por Ubicación</h1>
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="grid grid-cols-1">
          <div>
            <label htmlFor="provinceSelect" className="block text-gray-700 font-medium mb-2">Provincia</label>
            <select id="provinceSelect" value={selectedProvinceId} onChange={handleProvinceChange} disabled={loadingProvinces} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">{loadingProvinces ? "Cargando..." : "-- Selecciona Provincia --"}</option>
              {provinces.map(p => (<option key={p.id} value={p.id}>{p.name}</option>))}
            </select>
          </div>
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      </div>

      {selectedProvinceId && (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 bg-gray-50 border-b">
            <h2 className="text-xl font-semibold">Rankings de Precios en {selectedProvinceName || 'la provincia seleccionada'}</h2>
          </div>

          {loadingRanking && <div className="p-6 text-center text-gray-500">Cargando datos del ranking...</div>}
          
          {!loadingRanking && (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead><tr className="bg-gray-50">{renderTableHeaders()}</tr></thead>
                  <tbody className="divide-y divide-gray-200">{renderTableRows()}</tbody>
                </table>
              </div>
              {totalPages > 1 && !loadingRanking && sortedRankingData.length > 0 && (
                <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                  <div className="flex flex-1 justify-between sm:justify-end">
                    <button
                      onClick={handlePreviousPage}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Anterior
                    </button>
                    <div className="hidden sm:flex sm:items-center sm:ml-4">
                      <p className="text-sm text-gray-700">
                        Página <span className="font-medium">{currentPage}</span> de <span className="font-medium">{totalPages}</span>
                      </p>
                    </div>
                    <button
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                      className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Siguiente
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
      <div className="container mx-auto px-4 py-20">
      {/* ... (todo tu JSX anterior: h1, selectores, tabla, paginación) ... */}
      
      {selectedProvinceId && (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* ... (la tabla de rankings) ... */}
        </div>
      )}

      {/* ✅ AQUÍ AÑADIMOS LA NUEVA SECCIÓN DE CONSEJOS */}
      {selectedProvinceId && <TipsSection />}

    </div>
    </div>
  );
};

export default RankingsPage;