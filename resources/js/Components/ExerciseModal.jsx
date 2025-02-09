import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ExerciseModal({isOpen, onClose}) {
    const [name, setName] = useState('');
    const [exerciseList, setExerciseList] = useState([
        { name: ''}
    ]);

    const addExercise = () => {
        setExerciseList([...exerciseList, { name: '' }]);
    };

    const removeExercise = (index) => {
        const newList = [...exerciseList];
        newList.splice(index, 1);
        setExerciseList(newList);
    };

    const handleChange = (index, field, value) => {
        const newList = [...exerciseList];
        newList[index][field] = value;
        setExerciseList(newList);
    };

    const handleConfirm = async () => {
        console.log('Enviando dados:',{exercise: name, exercises :exerciseList});

        const exerciseWithId = exerciseList.map((exercise) => ({ 
            name: exercise.name,
        }));

        console.log('Exercícios IDs:', exerciseWithId);

        const validExercises = exerciseWithId.filter(item => item !== null);

        try {
            const response = await axios.post('/exercises', { 
                exercise: name,
                exercises: validExercises
            });

            console.log('Exercício cadastrado com sucesso:', response.data);
            onClose();
        }
        catch (error) {
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

                <h2 className="text-lg font-semibold text-gray-800 mb-4">Adicionar Exercícios</h2>

                <div>
                    {exerciseList.map((exercise, index) => (
                        <div key={index} className="flex space-x-4 mb-4">
                            <input
                                type="text"
                                placeholder="Nome do exercício"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="border-gray-300 rounded-lg p-2 w-1/2"
                                required
                            />
                            <button
                                onClick={() => removeExercise(index)}
                                className="text-red-600 font-medium hover:underline"
                            >
                                Remover
                            </button>
                        </div>
                    ))}
                </div>

                <button
                    onClick={addExercise}
                    className="text-blue-600 font-medium hover:underline mb-4"
                >
                    + Adicionar exercício
                </button>

                <div className="flex justify-end space-x-4">
                    <button
                        onClick={handleConfirm}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                    >
                        Confirmar
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
