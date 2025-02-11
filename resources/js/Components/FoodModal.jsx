import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function FoodModal({ isOpen, onClose, foodId }) {
    const [foodList, setFoodList] = useState([
        { name: '', calories: '', carbs: '', proteins: '', fats: '' }
    ]);

    // Carrega os dados do alimento se foodId estiver presente
    useEffect(() => {
        if (isOpen && foodId) {
            fetchFoodData(foodId);
        } else {
            // Reseta o estado se o modal for aberto para criação
            setFoodList([{ name: '', calories: '', carbs: '', proteins: '', fats: '' }]);
        }
    }, [isOpen, foodId]);

    const fetchFoodData = async (id) => {
        try {
            const response = await axios.get(`/foods/showID/${id}`);
            setFoodList([{
                name: response.data.name,
                calories: response.data.calories,
                carbs: response.data.carbs,
                proteins: response.data.protein,
                fats: response.data.fat,
            }]);
        } catch (error) {
            console.error('Erro ao buscar alimento:', error.response?.data || error.message);
        }
    };

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
        const validFoods = foodList.map(food => ({
            name: food.name,
            calories: parseFloat(food.calories), // Converte para número
            carbs: parseFloat(food.carbs),      // Converte para número
            fat: parseFloat(food.fats),         // Converte para número
            protein: parseFloat(food.proteins), // Converte para número
        })).filter(food => (
            food.name.trim() !== '' &&
            !isNaN(food.calories) &&
            !isNaN(food.carbs) &&
            !isNaN(food.fat) &&
            !isNaN(food.protein)
        ));

        if (validFoods.length === 0) {
            console.error('Nenhum alimento válido para cadastrar.');
            return;
        }

        try {
            if (foodId) {
                // Se foodId existe, é uma edição (PUT)
                await axios.put(`/foods/${foodId}`, validFoods[0]);
                console.log('Alimento atualizado com sucesso.');
            } else {
                // Caso contrário, é uma criação (POST)
                for (const food of validFoods) {
                    await axios.post('/foods', food);
                }
                console.log('Alimentos cadastrados com sucesso.');
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
                    {foodId ? 'Editar Alimento' : 'Adicionar Alimento'}
                </h2>

                <div>
                    {foodList.map((food, index) => (
                        <div key={index} className="flex space-x-4 mb-4">
                            <input
                                type="text"
                                placeholder="Nome do alimento"
                                value={food.name}
                                onChange={(e) => handleChange(index, 'name', e.target.value)}
                                className="border-gray-300 rounded-lg p-2 w-1/2"
                                required
                            />
                            <input
                                type="number"
                                placeholder="Calorias"
                                value={food.calories}
                                onChange={(e) => handleChange(index, 'calories', e.target.value)}
                                className="border-gray-300 rounded-lg p-2 w-1/3"
                                required
                            />
                            <input
                                type="number"
                                placeholder="Carboidratos"
                                value={food.carbs}
                                onChange={(e) => handleChange(index, 'carbs', e.target.value)}
                                className="border-gray-300 rounded-lg p-2 w-1/3"
                                required
                            />
                            <input
                                type="number"
                                placeholder="Proteínas"
                                value={food.proteins}
                                onChange={(e) => handleChange(index, 'proteins', e.target.value)}
                                className="border-gray-300 rounded-lg p-2 w-1/3"
                                required
                            />
                            <input
                                type="number"
                                placeholder="Gorduras"
                                value={food.fats}
                                onChange={(e) => handleChange(index, 'fats', e.target.value)}
                                className="border-gray-300 rounded-lg p-2 w-1/3"
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
                        {foodId ? 'Salvar' : 'Confirmar'}
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