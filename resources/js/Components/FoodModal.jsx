import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function FoodModal({ isOpen, onClose}) {
    const [name, setName] = useState('');
    const [foodList, setFoodList] = useState([
        { name: '', calories: '', carbs: '', proteins: '', fats: '' }
    ]);

    const addFood = () => {
        setFoodList([...foodList, { name: '', calories: '', carbs: '', proteins: '', fats: '' }]);
    };

    const removeFood = (index) => {
        const newList = [...foodList];
        newList.splice(index, 1);
        setFoodList(newList);
    };

    const handleChange = (index, field, value) => {
        const newList = [...foodList];
        newList[index][field] = value;
        setFoodList(newList);
    };

    const handleConfirm = async () => {
        console.log('Enviando dados:',{food: name, foods :foodList});

        const foodWithId = foodList.map((food) => ({ 
            name: food.name,
            calories: food.calories,
            carbs: food.carbs,
            proteins: food.proteins,
            fats: food.fats
        }));

        console.log('Comidas IDs:', foodWithId);

        const validFoods = foodWithId.filter(item => item !== null);

        try {
            const response = await axios.post('/foods', { 
                food: name,
                foods: validFoods
            });

            console.log('Comida cadastrada com sucesso:', response.data);
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

                <h2 className="text-lg font-semibold text-gray-800 mb-4">Adicionar Alimentos</h2>

                <div>
                    {foodList.map((food, index) => (
                        <div key={index} className="flex space-x-4 mb-4">
                            <input
                                type="text"
                                placeholder="Nome do alimento"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="border-gray-300 rounded-lg p-2 w-1/2"
                                required
                            />
                            <input
                                type="number"
                                placeholder="Calorias"
                                value={food.calories}
                                onChange={(e) => handleChange(index, 'quantity', e.target.value)}
                                className="border-gray-300 rounded-lg p-2 w-1/3"
                                required
                            />
                            <input
                                type="number"
                                placeholder="Carboidratos"
                                value={food.carbs}
                                onChange={(e) => handleChange(index, 'quantity', e.target.value)}
                                className="border-gray-300 rounded-lg p-2 w-1/3"
                                required
                            />
                            <input
                                type="number"
                                placeholder="Proteínas"
                                value={food.proteins}
                                onChange={(e) => handleChange(index, 'quantity', e.target.value)}
                                className="border-gray-300 rounded-lg p-2 w-1/3"
                                required
                            />
                            <input
                                type="number"
                                placeholder="Gorduras"
                                value={food.fats}
                                onChange={(e) => handleChange(index, 'quantity', e.target.value)}
                                className="border-gray-300 rounded-lg p-2 w-1/3"
                                required
                            />
                            <button
                                onClick={() => removeFood(index)}
                                className="text-red-600 font-medium hover:underline"
                            >
                                Remover
                            </button>
                        </div>
                    ))}
                </div>

                <button
                    onClick={addFood}
                    className="text-blue-600 font-medium hover:underline mb-4"
                >
                    + Adicionar alimento
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
