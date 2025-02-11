import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ExerciseModal({ isOpen, onClose, exerciseId }) {
    const [exerciseList, setExerciseList] = useState([{ name: '' }]);

    // Carrega os dados do exercício se exerciseId estiver presente
    useEffect(() => {
        if (isOpen && exerciseId) {
            fetchExerciseData(exerciseId);
        } else {
            // Reseta o estado se o modal for aberto para criação
            setExerciseList([{ name: '' }]);
        }
    }, [isOpen, exerciseId]);

    const fetchExerciseData = async (id) => {
        try {
            const response = await axios.get(`/exercises/${id}`);
            setExerciseList([{ name: response.data.name }]);
        } catch (error) {
            console.error('Erro ao buscar exercício:', error.response?.data || error.message);
        }
    };

    const handleChange = (index, value) => {
        const newList = [...exerciseList];
        newList[index].name = value;
        setExerciseList(newList);
    };

    const handleConfirm = async () => {
        const validExercises = exerciseList.filter(exercise => exercise.name.trim() !== '');

        if (validExercises.length === 0) {
            console.error('Nenhum exercício válido para cadastrar.');
            return;
        }

        try {
            if (exerciseId) {
                // Se exerciseId existe, é uma edição (PUT)
                await axios.put(`/exercises/${exerciseId}`, {
                    name: exerciseList[0].name,
                });
                console.log('Exercício atualizado com sucesso.');
            } else {
                // Caso contrário, é uma criação (POST)
                for (const exercise of validExercises) {
                    await axios.post('/exercises', {
                        name: exercise.name,
                    });
                }
                console.log('Exercícios cadastrados com sucesso.');
            }
            onClose();
        } catch (error) {
            console.error('Erro ao enviar dados:', error.response?.data || error.message);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-lg w-2/3 p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                >
                    &times;
                </button>

                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    {exerciseId ? 'Editar Exercício' : 'Adicionar Exercício'}
                </h2>

                <div>
                    {exerciseList.map((exercise, index) => (
                        <div key={index} className="flex space-x-4 mb-4">
                            <input
                                type="text"
                                placeholder="Nome do exercício"
                                value={exercise.name}
                                onChange={(e) => handleChange(index, e.target.value)}
                                className="border-gray-300 rounded-lg p-2 w-1/2"
                                required
                            />
                        </div>
                    ))}
                </div>

                <div className="flex justify-end space-x-4">
                    <button
                        onClick={handleConfirm}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                    >
                        {exerciseId ? 'Salvar' : 'Confirmar'}
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
}