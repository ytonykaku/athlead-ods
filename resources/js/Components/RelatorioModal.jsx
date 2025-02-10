import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function RelatorioModal({ isOpen, onClose }) {
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        if (isOpen) {
            fetchRelatorio();
        }
    }, [isOpen]);

    const fetchRelatorio = async () => {
        try {
            const response = await axios.get('/calendar/show');
            
            if (response.data && Array.isArray(response.data)){
                
                setEntries(response.data.entries);
            } else {
                console.warn('A resposta não contém uma lista válida de alimentos:', response.data);
            } 
        } catch (error) {
            console.error('Erro ao buscar dados do calendário:', error);
        }

    }
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-2/3 p-6 relative overflow-hidden">
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl"
                >
                    &times;
                </button>
                
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Relatório</h2>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 border-collapse border border-gray-300">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 border border-gray-300">Data</th>
                                <th className="px-6 py-3 border border-gray-300">Ficha</th>
                                <th className="px-6 py-3 border border-gray-300">Dieta</th>
                            </tr>
                        </thead>
                        <tbody>
                            {entries.length > 0 ? (
                                entries.map((entry) => (
                                    <tr key={entry.id} className="bg-white border border-gray-300">
                                        <td className="px-6 py-3">{new Date(entry.date).toLocaleDateString()}</td>
                                        <td className="px-6 py-3">{entry.workout_sheet ? entry.workout_sheet.name : 'Sem ficha'}</td>
                                        <td className="px-6 py-3">{entry.diet ? entry.diet.name : 'Sem dieta'}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="px-6 py-3 text-center">Nenhum dado encontrado</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
