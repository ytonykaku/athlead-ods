import React, { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

import AddButton from '@/Components/AddButton';
import ExerciseTable from '@/Components/ExerciseTable';
import ExerciseModal from '@/Components/ExerciseModal';
import FoodTable from '@/Components/FoodTable';
import FoodModal from '@/Components/FoodModal';

export default function Admin() {

    const {user, foods, exercises} = usePage().props;

    console.log(user);
    console.log(foods);
    console.log(exercises);

    const [isExerciseModalOpen, setIsExerciseModalOpen] = useState(false);
    const [isFoodModalOpen, setIsFoodModalOpen] = useState(false);

    const openExerciseModal = () => {
        setIsExerciseModalOpen(true);
    };

    const closeExerciseModal = () => {
        setIsExerciseModalOpen(false);
    };

    const openFoodModal = () => {
        setIsFoodModalOpen(true);
    };

    const closeFoodModal = () => {
        setIsFoodModalOpen(false);
    };
    
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Admin
                </h2>
            }
        >
            <Head title="Admin" />

            <div className="min-h-screen bg-gray-100 p-4">
                <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                    <span>Exercícios Cadastrados</span>
                    <ExerciseTable
                        label1={"Nome do exercício"}
                        label4={"Ações"}
                        data={exercises}
                    />
                    <AddButton handleModal={openExerciseModal} />
                    <ExerciseModal isOpen={isExerciseModalOpen} onClose={closeExerciseModal} />

                </div>

                <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 mt-4">
                    <span>Alimentos Cadastrados</span>
                    <FoodTable
                        label1={"Nome do alimento"}
                        label4={"Ações"}
                        data={foods}
                    />
                    <AddButton handleModal={openFoodModal} />
                    <FoodModal isOpen={isFoodModalOpen} onClose={closeFoodModal} />
                </div>                
            </div>
        </AuthenticatedLayout>
    );
}