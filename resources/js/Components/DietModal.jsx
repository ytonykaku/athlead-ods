import React, { useState } from 'react';

export default function DietModal({ isOpen, onClose }) {
    const [formFields, setFormFields] = useState([
        { food: '', amount: '', shift:''}
    ]);

    const addRow = () => {
        setFormFields([...formFields, { food: '', amount: '', shift:'' }]);
    };

    const handleChange = (index, field, value) => {
        const newFields = [...formFields];
        newFields[index][field] = value;
        setFormFields(newFields);
    };

    const handleConfirm = () => {
        console.log('Dieta:', formFields);
        onClose();
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

                <h2 className="text-lg font-semibold text-gray-800 mb-4">Adicionar Dieta</h2>

                <div>
                    {formFields.map((field, index) => (
                        <div key={index} className="flex space-x-4 mb-4">
                            <select
                                value={field.food}
                                onChange={(e) => handleChange(index, 'food', e.target.value)}
                                className="border-gray-300 rounded-lg p-2 w-1/3"
                                required
                            >
                                <option value="" disabled>Nome do alimento</option>
                                <option value="Supino">Arroz</option>
                                <option value="Agachamento">Feijão</option>
                                <option value="Rosca Direta">Beterraba</option>
                            </select>
                            <input
                                type="number"
                                placeholder="Quantidade"
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
