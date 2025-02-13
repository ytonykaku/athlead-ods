import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function DietModal({ isOpen, onClose }) {
    const [name, setName] = useState(''); // Novo estado para o nome da Dieta
    const [formFields, setFormFields] = useState([
        { food: '', amount: '', shift: '' }
    ]);

    const [mealOptions, setMealOptions] = useState([]);

    useEffect(() => {   

        if(isOpen){
            fetchMealsOptions();
        }
    }, [isOpen]);

    const fetchMealsOptions = async () => {
        try {
            const response = await axios.get('/foods/show');
            
            if (response.data && Array.isArray(response.data)) {
                setMealOptions(response.data);
            } else {            
                console.warn('A resposta não contém uma lista válida de alimentos:', response.data);
            }
        
        } catch (error) {
            console.error('Error fetching meals:', error.response?.data || error.message);
        }
    };

    const addRow = () => {
        setFormFields([...formFields, { food: '', amount: '', shift: '' }]);
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

    // const getMealId = async (mealName) => {
    //     try {
    //         const response = await axios.get(`/meals/id`, { params: { name: mealName } });
    //         return response.data.id;  // Assuming the response has the exercise ID
    //     } catch (error) {
    //         console.error('Error fetching exercise ID:', error.response?.data || error.message);
    //         return null;  // Return null if an error occurs
    //     }
    // };

    const handleConfirm = async () => {
        console.log('Enviando Dieta:', { name, food: formFields });

        // First, map the exercises to get their IDs
        const mealsWithIds = formFields.map((field) => ({
            food: field.food, // Este é o ID do exercício
            amount: field.amount,
            shift: field.shift,
        }));

        console.log('Refeições com IDs:', mealsWithIds);

        // Filter out any null entries (in case some exercises failed to get an ID)
        const validMeals = mealsWithIds.filter(item => item !== null);

        // Now send the workout sheet with exercises and their IDs
        try {
            const response = await axios.post('/diet', {
                name, // Workout sheet name
                meals: validMeals,  // Exercises with IDs
            });

            console.log('Dieta criada com sucesso:', response.data);
            onClose(); // Close modal after success
        } catch (error) {
            console.error('Erro ao criar Dieta:', error.response?.data || error.message);
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

                <h2 className="text-lg font-semibold text-gray-800 mb-4">Criar Dieta</h2>

                {/* Campo para Nome da Dieta */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Nome da Dieta"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border-gray-300 rounded-lg p-2 w-full"
                        required
                    />
                </div>

                
                {/* Headers da tabela */}
                <div className="grid grid-cols-5 gap-4 text-sm font-medium text-gray-700 mb-2">
                    <span>Nome da Refeição</span>
                    <span>Quantidade (em 100g)</span>
                    <span>Horário</span>
                </div>

                <div>
                    {formFields.map((field, index) => (
                        <div key={index} className="flex space-x-4 mb-4 items-center">
                            <select
                                value={field.food}
                                onChange={(e) => handleChange(index, 'food', e.target.value)}
                                className="border-gray-300 rounded-lg p-2 w-1/3"
                                required
                            >
                                <option value="" disabled>Nome da Refeição</option>
                                {mealOptions.map((option) => (
                                    <option key={option.id} value={option.id}>{option.name}</option>
                                ))}
                                
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
                    + Adicionar refeição
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
