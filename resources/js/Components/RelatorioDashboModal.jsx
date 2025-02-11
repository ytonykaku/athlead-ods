import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function RelatorioDashboModal({ isOpen, onClose, data=[]}) {
    
    
    if (!isOpen) return null;

    // Função para calcular as calorias totais de cada dieta
    const calcularCalorias = (diet) => {
        return diet.meals.reduce((total, meal) => {
            if (meal.food) {
                console.log(meal.food.calories);
                const amount = parseFloat(meal.amount);  // Garantir que amount seja numérico
                const calories = parseFloat(meal.food.calories);
                console.log(amount);
                console.log(calories);    
                return total + (amount * calories);
            }
            return total;
        }, 0);
    };

    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-2/3 p-6 relative overflow-hidden">
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl"
                >
                    &times;
                </button>
                
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Relatório de calorias</h2>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 border-collapse border border-gray-300">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 border border-gray-300">Dieta</th>
                                <th className="px-6 py-3 border border-gray-300">Calorias</th>
                            </tr>
                        </thead>
                        <tbody>
    {data.map((diet) => {
        console.log("tste",diet.meals);  // Verifique se a dieta e os dados estão corretos
        return (
            <tr key={diet.id} className="bg-white border-b">
                <td className="px-6 py-3 border border-gray-300">{diet.name}</td>
                <td className="px-6 py-3 border border-gray-300">{calcularCalorias(diet)} kcal</td>
            </tr>
        );
    })}
</tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}