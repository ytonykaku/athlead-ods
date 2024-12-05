import React from 'react';
import '../../css/H1.css';

export default function DataTable({ label1, label4, data = [] }) {
    return (
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">{label1}</th>
                        <th scope="col" className="px-6 py-3">{label4}</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((sheet, index) => (
                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {sheet.name}
                                </th>
                                <td className="px-6 py-4">
                                    {/* Adicione ações ou links conforme necessário */}
                                    <button className="text-blue-500 hover:underline">Visualizar</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="2" className="px-6 py-4 text-center text-gray-500">
                                Nenhuma ficha de exercício encontrada.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
