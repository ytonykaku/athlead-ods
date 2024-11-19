import React from 'react';
import Avatar from '../Components/Avatar';

export default function UserInfoTable() {
    return (
        <div className="w-full max-w-md mx-auto mt-8"> {/* Define largura máxima para a tabela */}
            <table className="table-auto w-full text-left border-collapse">
                <thead>
                    <tr>
                        <th colSpan={2} className="border-b pb-2">
                            <Avatar avatarImage={"/storage/images/imagem8.jpg"}/> {/* Avatar ocupa uma linha separada */}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th className="text-gray-700 px-4 py-2">Idade:</th>
                        <td className="px-4 py-2">25</td>
                    </tr>
                    <tr>
                        <th className="text-gray-700 px-4 py-2">Altura:</th>
                        <td className="px-4 py-2">1,75m</td>
                    </tr>
                    <tr>
                        <th className="text-gray-700 px-4 py-2">Peso:</th>
                        <td className="px-4 py-2">70kg</td>
                    </tr>
                    <tr>
                        <th className="text-gray-700 px-4 py-2">MMC:</th>
                        <td className="px-4 py-2">22</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
