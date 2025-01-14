import React, { useState } from 'react';
import axios from 'axios';
import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';

export default function ExerciseModal({ isOpen, onClose }) {
    const [name, setName] = useState(''); // Novo estado para o nome da ficha
    const [formFields, setFormFields] = useState([
        { exercise: '', series: '', reps: '', weight: '' }
    ]);
    const [exerciseOptions, setExerciseOptions] = useState([]);

    useEffect(() => {
        
        if(isOpen){
            fetchExercicesOptions();
        }
    }, [isOpen]);

    const fetchExercicesOptions = async () => {
        try {
            const response = await axios.get('/exercises/show');
            if (response.data && Array.isArray(response.data)) {
                setExerciseOptions(response.data);
            } else {
                console.warn('A resposta não contém uma lista válida de exercícios:', response.data);
            }
        } catch (error) {
            console.error('Erro ao buscar opções de exercícios:', error.response?.data || error.message);
        }
    };

    const addRow = () => {
        setFormFields([...formFields, { exercise: '', series: '', reps: '', weight: '' }]);
    };

    const removeRow = (index) => {
        const newFields = [...formFields];
        newFields.splice(index, 1);
        setFormFields(newFields);
    };

    const handleChange = (index, field, value) => {
        const newFields = [...formFields];
        newFields[index][field] = value;
        setFormFields(newFields);
    };

    const handleConfirm = async () => {
        console.log('Enviando ficha:', { name, exercises: formFields });

        const exercisesWithIds = formFields.map((field) => ({
            exercise: field.exercise, // Este é o ID do exercício
            series: field.series,
            reps: field.reps,
            weight: field.weight,
        }));

        // Filter out any null entries (in case some exercises failed to get an ID)
        const validExercises = exercisesWithIds.filter(item => item !== null);

        // Now send the workout sheet with exercises and their IDs
        try {
            const response = await axios.post('/workout-sheets', {
                name, // Workout sheet name
                exercises: validExercises,  // Exercises with IDs
            });

            console.log('Ficha criada com sucesso:', response.data);
            onClose(); // Close modal after success
        } catch (error) {
            console.error('Erro ao criar ficha:', error.response?.data || error.message);
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

                <h2 className="text-lg font-semibold text-gray-800 mb-4">Adicionar Ficha</h2>

                {/* Campo para Nome da Ficha */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Nome da Ficha"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border-gray-300 rounded-lg p-2 w-full"
                        required
                    />
                </div>

                <div>
                    {formFields.map((field, index) => (
                        <div key={index} className="flex space-x-4 mb-4 items-center">
                            <select
                                value={field.exercise}
                                onChange={(e) => handleChange(index, 'exercise', e.target.value)}
                                className="border-gray-300 rounded-lg p-2 w-1/3"
                                required
                            >
                                <option value="" disabled>Nome do Exercício</option>
                                {exerciseOptions.map((exercise)=>(
                                    <option key={exercise.id} value={exercise.id}>{exercise.name}</option>
                                ))}

                            </select>
                            <input
                                type="number"
                                placeholder="Séries"
                                value={field.series}
                                onChange={(e) => handleChange(index, 'series', e.target.value)}
                                className="border-gray-300 rounded-lg p-2 w-1/6"
                                required
                            />
                            <input
                                type="number"
                                placeholder="Repetições"
                                value={field.reps}
                                onChange={(e) => handleChange(index, 'reps', e.target.value)}
                                className="border-gray-300 rounded-lg p-2 w-1/6"
                                required
                            />
                            <input
                                type="number"
                                placeholder="Carga (kg)"
                                value={field.weight}
                                onChange={(e) => handleChange(index, 'weight', e.target.value)}
                                className="border-gray-300 rounded-lg p-2 w-1/6"
                                required
                            />
                            <button 
                                onClick={() => removeRow(index)} 
                                className="text-red-600 font-medium hover:underline"
                            >
                                Remover
                            </button>
                        </div>
                    ))}
                </div>

                <button 
                    onClick={addRow} 
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
