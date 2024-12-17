import React, { useState } from 'react';
import axios from 'axios';

export default function DietModal({ isOpen, onClose }) {
    const [name, setName] = useState(''); // Novo estado para o nome da ficha
    const [formFields, setFormFields] = useState([
        { meal: '', amount: '', shift: '' }
    ]);

    const addRow = () => {
        setFormFields([...formFields, { meal: '', amount: '', shift: '' }]);
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

    const getMealId = async (mealName) => {
        try {
            const response = await axios.get(`/meals/id`, { params: { name: mealName } });
            return response.data.id;  // Assuming the response has the exercise ID
        } catch (error) {
            console.error('Error fetching exercise ID:', error.response?.data || error.message);
            return null;  // Return null if an error occurs
        }
    };

    const handleConfirm = async () => {
        console.log('Enviando ficha:', { name, meals: formFields });

        // First, map the exercises to get their IDs
        const mealsWithIds = await Promise.all(formFields.map(async (field) => {
            const mealId = await getMealId(field.meal);
            if (mealId) {
                return { meal_id: mealId, amount: field.amount, shift: field.shift };
            }
            return null; // Return null if the exercise ID is not found
        }));

        // Filter out any null entries (in case some exercises failed to get an ID)
        const validMeals = mealsWithIds.filter(item => item !== null);

        // Now send the workout sheet with exercises and their IDs
        try {
            const response = await axios.post('/diets', {
                name, // Workout sheet name
                meals: validMeals,  // Exercises with IDs
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

                <h2 className="text-lg font-semibold text-gray-800 mb-4">Adicionar Refeição</h2>

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
                                value={field.meal}
                                onChange={(e) => handleChange(index, 'meal', e.target.value)}
                                className="border-gray-300 rounded-lg p-2 w-1/3"
                                required
                            >
                                <option value="" disabled>Nome da Refeição</option>
                                <option value="Arroz">Arroz</option>
                                <option value="Feijão">Feijão</option>
                                <option value="Beterraba">Beterraba</option>
                            </select>
                            <input
                                type="number"
                                placeholder="Quantidade (em 100g)"
                                value={field.amount}
                                onChange={(e) => handleChange(index, 'amount', e.target.value)}
                                className="border-gray-300 rounded-lg p-2 w-1/6"
                                required
                            />
                            <input
                                type="time"
                                placeholder="Horário"
                                value={field.shift}
                                onChange={(e) => handleChange(index, 'shift', e.target.value)}
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
                    + Adicionar linha
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
