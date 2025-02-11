import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import FoodModal from './FoodModal'; // Importe o modal
import '../../css/H1.css';

export default function FoodTable({ label1, label4, data = [] }) {
    const [selectedFoodId, setSelectedFoodId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (foodId) => {
        setSelectedFoodId(foodId);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedFoodId(null);
    };

    const handleDelete = (id) => {
        if (confirm('Você tem certeza que deseja deletar este alimento?')) {
            axios.delete(`/foods/${id}`)
                .then(response => {
                    console.log('Alimento excluído:', response.data.message);
                    // Atualize a lista de alimentos após a exclusão
                })
                .catch(error => {
                    console.error('Erro ao excluir alimento:', error.response?.data || error.message);
                });
        }
    };

    return (
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">{label1}</th>
                        <th scope="col" className="px-6 py-3">{label4}</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((food) => (
                            <tr key={food.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {food.name}
                                </th>
                                <td className="px-6 py-4">
                                    <button
                                        className="text-blue-600 hover:underline"
                                        onClick={() => openModal(food.id)}
                                    >
                                        Visualizar
                                    </button>
                                    <button
                                        className="text-red-600 hover:underline"
                                        onClick={() => handleDelete(food.id)}
                                    >
                                        /Deletar
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="2" className="px-6 py-4 text-center text-gray-500">
                                Nenhum alimento encontrado.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Modal de Edição/Criação */}
            <FoodModal
                isOpen={isModalOpen}
                onClose={closeModal}
                foodId={selectedFoodId}
            />
        </div>
    );
}