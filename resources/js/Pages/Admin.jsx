import React, { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

import AddButton from '@/Components/AddButton';
import ExerciseTable from '@/Components/ExerciseTable';
import FoodTable from '@/Components/FoodTable';
import FoodModal from '@/Components/FoodModal';

export default function Admin() {

    const {user, foods, exercies} = usePage().props;

    console.log(user);
    console.log(foods);
    console.log(exercies);

    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
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
                        data={exercies}
                    />
                    <AddButton handleModal={openModal}/>

                </div>

                <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 mt-4">
                    <span>Alimentos Cadastrados</span>
                    <FoodTable
                        label1={"Nome do alimento"}
                        label4={"Ações"}
                        data={foods}
                    />
                    <AddButton handleModal={openModal}/>
                    <FoodModal isOpen={isModalOpen} onClose={closeModal} />
                </div>                
            </div>
        </AuthenticatedLayout>
    );
}