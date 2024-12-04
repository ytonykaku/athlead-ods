import React, { useState } from 'react';

export default function ExerciseModal({ isOpen, onClose }) {
    const [formFields, setFormFields] = useState([
        { exercise: '', series: '', reps: '', weight: '' }
    ]);

    const addRow = () => {
        setFormFields([...formFields, { exercise: '', series: '', reps: '', weight: '' }]);
    };

    const handleChange = (index, field, value) => {
        const newFields = [...formFields];
        newFields[index][field] = value;
        setFormFields(newFields);
    };

    const handleConfirm = () => {
        console.log('Exercícios:', formFields);
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

                <h2 className="text-lg font-semibold text-gray-800 mb-4">Adicionar Exercício</h2>

                <div>
                    {formFields.map((field, index) => (
                        <div key={index} className="flex space-x-4 mb-4">
                            <select
                                value={field.exercise}
                                onChange={(e) => handleChange(index, 'exercise', e.target.value)}
                                className="border-gray-300 rounded-lg p-2 w-1/3"
                                required
                            >
                                <option value="" disabled>Nome do Exercício</option>
                                <option value="Supino">Supino</option>
                                <option value="Agachamento">Agachamento</option>
                                <option value="Rosca Direta">Rosca Direta</option>
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
