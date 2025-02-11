import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import UserInfoTable from '../Components/UserInfoTable';
import Frequency from '../Components/Frequency';

export default function Dashboard() {
    const { user } = usePage().props;

    console.log(user);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="min-h-screen bg-gray-100 p-4">
                <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                    <UserInfoTable userData = {user}/>
                    <Frequency />
                    
                    <button
                    
                        className="rounded-md px-3 py-2 text-black ring-1 ring-black transition hover:text-black/70 focus:outline-none focus-visible:ring-black dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white float-right border border-black"
                        style={{ marginTop: '-43px' }}                   
                    >
                        Relatório de Calorias
                    </button>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}