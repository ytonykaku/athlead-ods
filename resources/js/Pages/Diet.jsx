import React, { useState } from 'react';
import AddButton from '@/Components/AddButton';
import DietModal from '@/Components/DietModal';
import FoodModal from '@/Components/FoodModal';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Diet() {
    const [isDietModalOpen, setIsDietModalOpen] = useState(false);
    const [isFoodModalOpen, setIsFoodModalOpen] = useState(false);
    const [diets, setDiets] = useState([]);
    const [selectedDietIndex, setSelectedDietIndex] = useState(null);

    const openDietModal = (index = null) => {
        setSelectedDietIndex(index);
        setIsDietModalOpen(true);
    };

    const closeDietModal = () => {
        setIsDietModalOpen(false);
    };

    const openFoodModal = () => {
        setIsFoodModalOpen(true);
    };

    const closeFoodModal = () => {
        setIsFoodModalOpen(false);
    };

    const handleSaveDiet = (diet) => {
        if (selectedDietIndex !== null) {
            setDiets((prevDiets) =>
                prevDiets.map((item, index) => index === selectedDietIndex ? diet : item)
            );
        } else {
            setDiets((prevDiets) => [...prevDiets, { ...diet, foods: [] }]);
        }
        closeDietModal();
        openFoodModal();
    };

    const handleSaveFoods = (foods) => {
        if (selectedDietIndex !== null) {
            setDiets((prevDiets) =>
                prevDiets.map((diet, index) =>
                    index === selectedDietIndex ? { ...diet, foods } : diet
                )
            );
        } else {
            setDiets((prevDiets) => {
                const lastIndex = prevDiets.length - 1;
                const newDiet = { ...prevDiets[lastIndex], foods };
                const updatedDiets = [...prevDiets];
                updatedDiets[lastIndex] = newDiet;
                return updatedDiets;
            });
        }
        closeFoodModal();
    };

    const handleDeleteDiet = (index) => {
        setDiets((prevDiets) => prevDiets.filter((_, i) => i !== index));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dieta
                </h2>
            }
        >
            <Head title="Diet" />

            <div className="min-h-screen bg-gray-100 p-4">
                <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                    <AddButton handleModal={() => openDietModal()} />

                    <div className="space-y-4 mt-4">
                        {diets.map((diet, index) => (
                            <div
                                key={index}
                                onClick={() => openDietModal(index)}
                                className="border p-4 rounded-lg shadow cursor-pointer hover:bg-gray-100"
                            >
                                <h3 className="text-lg font-bold">{diet.name || `Dieta ${index + 1}`}</h3>
                                <p>{diet.description || 'Clique para visualizar e editar.'}</p>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteDiet(index);
                                    }}
                                    className="text-red-500 hover:underline ml-4"
                                >
                                    Excluir
                                </button>
                            </div>
                        ))}
                    </div>

                    <DietModal
                        isOpen={isDietModalOpen}
                        onClose={closeDietModal}
                        onSave={handleSaveDiet}
                        diet={selectedDietIndex !== null ? diets[selectedDietIndex] : null}
                    />

                    <FoodModal
                        isOpen={isFoodModalOpen}
                        onClose={closeFoodModal}
                        onSave={handleSaveFoods}
                        foods={
                            selectedDietIndex !== null && diets[selectedDietIndex]
                                ? diets[selectedDietIndex].foods
                                : []
                        }
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
