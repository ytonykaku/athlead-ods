import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import ExerciseModal from './ExerciseModal';
import '../../css/H1.css';

export default function ExerciseTable({ label1, label4, data = [] }) {
    const [selectedExerciseId, setSelectedExerciseId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (exerciseId) => {
        setSelectedExerciseId(exerciseId);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedExerciseId(null);
    };

    const handleDelete = (id) => {
        if (confirm('Você tem certeza que deseja deletar este exercício?')) {
            axios.delete(`/exercises/${id}`)
                .then(response => {
                    console.log('Exercício excluído:', response.data.message);
                    // Atualize a lista de exercícios após a exclusão
                })
                .catch(error => {
                    console.error('Erro ao excluir exercício:', error.response?.data || error.message);
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
                        data.map((sheet) => (
                            <tr key={sheet.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {sheet.name}
                                </th>
                                <td className="px-6 py-4">
                                    <button
                                        className="text-blue-600 hover:underline"
                                        onClick={() => openModal(sheet.id)}
                                    >
                                        Visualizar
                                    </button>
                                    <button
                                        className="text-red-600 hover:underline"
                                        onClick={() => handleDelete(sheet.id)}
                                    >
                                        /Deletar
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="2" className="px-6 py-4 text-center text-gray-500">
                                Nenhum exercício encontrado.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Modal de Edição/Criação */}
            <ExerciseModal
                isOpen={isModalOpen}
                onClose={closeModal}
                exerciseId={selectedExerciseId}
            />
        </div>
    );
}