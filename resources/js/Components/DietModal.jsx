import React, { useState, useEffect } from 'react';

export default function DietModal({ isOpen, onClose, onSave, diet }) {
    const [formFields, setFormFields] = useState([{ name: '', description: '' }]);

    useEffect(() => {
        if (diet) {
            setFormFields([{ name: diet.name || '', description: diet.description || '' }]);
        } else {
            setFormFields([{ name: '', description: '' }]);
        }
    }, [diet]);

    const handleChange = (field, value) => {
        const newFields = [...formFields];
        newFields[0][field] = value;
        setFormFields(newFields);
    };

    const handleConfirm = () => {
        onSave(formFields[0]);
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
                    {diet ? 'Editar Dieta' : 'Criar Nova Dieta'}
                </h2>

                <div className="mb-4">
                    <label className="block text-gray-700">Nome da Dieta</label>
                    <input
                        type="text"
                        value={formFields[0].name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        className="border-gray-300 rounded-lg p-2 w-full"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Descrição</label>
                    <textarea
                        value={formFields[0].description}
                        onChange={(e) => handleChange('description', e.target.value)}
                        className="border-gray-300 rounded-lg p-2 w-full"
                        required
                    />
                </div>

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
