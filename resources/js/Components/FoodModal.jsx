import React, { useState, useEffect } from 'react';

export default function FoodModal({ isOpen, onClose, onSave, foods }) {
    const [foodList, setFoodList] = useState([]);

    useEffect(() => {
        setFoodList(foods || []);
    }, [foods]);

    const addFood = () => {
        setFoodList([...foodList, { name: '', quantity: '' }]);
    };

    const handleChange = (index, field, value) => {
        const newList = [...foodList];
        newList[index][field] = value;
        setFoodList(newList);
    };

    const handleConfirm = () => {
        onSave(foodList);
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
                                value={food.name}
                                onChange={(e) => handleChange(index, 'name', e.target.value)}
                                className="border-gray-300 rounded-lg p-2 w-1/2"
                                required
                            />
                            <input
                                type="number"
                                placeholder="Quantidade"
                                value={food.quantity}
                                onChange={(e) => handleChange(index, 'quantity', e.target.value)}
                                className="border-gray-300 rounded-lg p-2 w-1/3"
                                required
                            />
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
