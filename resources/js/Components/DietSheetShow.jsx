import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function WorkoutSheetShow({ isOpen, onClose, sheetId }) {

    const [sheet, setSheet] = useState(null);
    const [formFields, setFormFields] = useState([]);
    const [mealOptions, setMealOptions] = useState([]);

    console.log(sheetId);
    console.log(sheet);

    useEffect(() => {
        if (isOpen && sheetId) {
            fetchSheetData(sheetId); // Buscar a ficha ao abrir o modal
            fetchMealsOptions();
        }
    }, [isOpen, sheetId]);

    const fetchSheetData = async (id) => {
        try {
            const response = await axios.get(`/diets/${id}`);
            setSheet(response.data); // Preencher a ficha
            setFormFields(
                response.data.meals.map((meal) =>({
                    food: meal.food_id,
                    amount: meal.amount,
                    shift: meal.shift,
                }))
            
            ); // Preencher os exercícios
        } catch (error) {
            console.error('Erro ao buscar a ficha:', error.response?.data || error.message);
        }
    };

    const fetchMealsOptions = async () => {
        try {
            const response = await axios.get('/foods/show');
            setMealOptions(response.data || []);
        } catch (error) {
            console.error('Erro ao buscar exercícios:', error.response?.data || error.message);
        }
    };

    const handleFieldChange = (index, field, value) => {
        const updatedFields = [...formFields];
        updatedFields[index][field] = value;
        setFormFields(updatedFields);
    };

    const addRow = () => {
        setFormFields([...formFields, { food: '', amount: '', shift: '' }]);
    };

    const removeRow = (index) => {
        const updatedFields = [...formFields];
        updatedFields.splice(index, 1);
        setFormFields(updatedFields);
    };

    const handleSave = async () => {
        try {
            const updatedFormFields = formFields.map((field) => ({
                ...field,
                food: String(field.food),
            }));
    
            await axios.put(`/diets/${sheetId}`, {
                name: sheet.name,
                meals: updatedFormFields,
            });
    
            alert('Dieta atualizada com sucesso!');
            onClose();
        } catch (error) {
            alert('Erro ao salvar a dieta. Verifique os dados e tente novamente.');
            console.error(error.response?.data || error.message);
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

                {sheet ? (
                    <>
                        {/* Nome da Ficha */}
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">
                            Ficha: {sheet.name}
                        </h2>
                        <input
                            type="text"
                            value={sheet.name}
                            onChange={(e) => setSheet({ ...sheet, name: e.target.value })}
                            className="border-gray-300 rounded-lg p-2 w-full mb-4"
                        />

                        {/* Lista de Exercícios */}
                        <div>
                            {formFields.map((field, index) => (
                                <div key={index} className="flex space-x-4 mb-4 items-center">
                                <select
                                    value={field.food}
                                    onChange={(e) => handleFieldChange(index, 'food', e.target.value)}
                                    className="border-gray-300 rounded-lg p-2 w-1/3"
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
                                        onChange={(e) => handleFieldChange(index, 'amount', e.target.value)}
                                        className="border-gray-300 rounded-lg p-2 w-1/6"
                                    />
                                    <input
                                        type="time"
                                        placeholder="Horário"
                                        value={field.shift}
                                        onChange={(e) => handleFieldChange(index, 'shift', e.target.value)}
                                        className="border-gray-300 rounded-lg p-2 w-1/6"
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

                        <button onClick={addRow} className="text-blue-600 font-medium hover:underline mb-4">
                            + Adicionar exercício
                        </button>

                        {/* Botões de Ação */}
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={handleSave}
                                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                            >
                                Salvar
                            </button>
                            <button
                                onClick={onClose}
                                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                            >
                                Cancelar
                            </button>
                        </div>
                    </>
                ) : (
                    <p>Carregando...</p>
                )}
            </div>
        </div>
    );
}