import React from 'react';
import Avatar from '../Components/Avatar';

const UserCard = () => {
    return (
        <div className="absolute inset-50 left-60 items-center gap-4"> {/* Alteração aqui */}
            <table className="table-auto border border-spacing-7">
                <tr>
                    <th className="text-center">
                        <Avatar className="left-5"/>
                    </th>
                </tr>
                <tr>
                    <td>
                        <div className="absolute bottom overflow-x-auto">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <tbody>
                                    <tr className="bg-white dark:bg-gray-800">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            Idade:
                                        </th>
                                        <td className="px-6 py-4">1</td>
                                    </tr>
                                    <tr className="bg-white dark:bg-gray-800">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            Altura:
                                        </th>
                                        <td className="px-6 py-4">1</td>
                                    </tr>
                                    <tr className="bg-white dark:bg-gray-800">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            Peso:
                                        </th>
                                        <td className="px-6 py-4">1</td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr className="font-semibold text-gray-900 dark:text-white">
                                        <th scope="row" className="px-6 py-3 text-base">MMC: </th>
                                        <td className="px-6 py-3">3</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    );
};

export default UserCard;
