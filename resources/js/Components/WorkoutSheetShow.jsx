import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function WorkoutSheetShow({ isOpen, onClose, sheetId }) {
    const [sheet, setSheet] = useState(null);
    const [formFields, setFormFields] = useState([]);
    const [exerciseOptions, setExerciseOptions] = useState([]);

    console.log(sheetId);
    console.log(sheet);

    useEffect(() => {
        if (isOpen && sheetId) {
            fetchSheetData(sheetId); // Buscar a ficha ao abrir o modal
            fetchExerciseOptions();
        }
    }, [isOpen, sheetId]);

    const fetchSheetData = async (id) => {
        try {
            const response = await axios.get(`/workout-sheets/${id}/edit`);
            setSheet(response.data); // Preencher a ficha
            setFormFields(
                response.data.exercises.map((exercise) =>({
                    exercise: exercise.exercise_id,
                    series: exercise.sets,
                    reps: exercise.repetitions,
                    weight: exercise.workload,
                }))
            
            ); // Preencher os exercícios
        } catch (error) {
            console.error('Erro ao buscar a ficha:', error.response?.data || error.message);
        }
    };

    const fetchExerciseOptions = async () => {
        try {
            const response = await axios.get('/exercises/show');
            setExerciseOptions(response.data || []);
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
        setFormFields([...formFields, { exercise: '', series: '', reps: '', weight: '' }]);
    };

    const removeRow = (index) => {
        const updatedFields = [...formFields];
        updatedFields.splice(index, 1);
        setFormFields(updatedFields);
    };

    const handleSave = async () => {
        try {
            // Converte todos os IDs do campo 'exercise' em strings
            const updatedFormFields = formFields.map((field) => ({
                ...field,
                exercise: String(field.exercise),
            }));
    
            await axios.put(`/workout-sheets/${sheetId}`, {
                name: sheet.name,
                exercises: updatedFormFields,
            });
    
            alert('Ficha atualizada com sucesso!');
            onClose();
        } catch (error) {
            console.error('Erro ao salvar a ficha:', error.response?.data || error.message);
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
                                    value={field.exercise}
                                    onChange={(e) => handleFieldChange(index, 'exercise', e.target.value)}
                                    className="border-gray-300 rounded-lg p-2 w-1/3"
                                >
                                <option value="" disabled>Selecione o Exercício</option>
                                    {exerciseOptions.map((exercise) => (
                                        <option key={exercise.id} value={exercise.id}>
                                            {exercise.name}
                                        </option>
                                    ))}
                                    </select>
                                    
                                    <input
                                        type="number"
                                        placeholder="Séries"
                                        value={field.series}
                                        onChange={(e) => handleFieldChange(index, 'series', e.target.value)}
                                        className="border-gray-300 rounded-lg p-2 w-1/6"
                                    />
                                    <input
                                        type="number"
                                        placeholder="Repetições"
                                        value={field.reps}
                                        onChange={(e) => handleFieldChange(index, 'reps', e.target.value)}
                                        className="border-gray-300 rounded-lg p-2 w-1/6"
                                    />
                                    <input
                                        type="number"
                                        placeholder="Carga (kg)"
                                        value={field.weight}
                                        onChange={(e) => handleFieldChange(index, 'weight', e.target.value)}
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