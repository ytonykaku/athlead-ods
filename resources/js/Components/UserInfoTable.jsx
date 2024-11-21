import React, { useState } from 'react';
import Avatar from '../Components/Avatar';

export default function UserInfoTable( {userData} ) {
    
    console.log(userData);

    if (!userData || !userData.birthdate || !userData.height || !userData.weight) {
        return <div>Loading...</div>; // Exibe "Loading..." caso algum dado esteja ausente
    }

    const { birthdate, height, weight } = userData;

    const calculateAge = (birthdate) => {
        const birthDate = new Date(birthdate);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const month = today.getMonth() - birthDate.getMonth();
        
        if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
            return age - 1;
        }

        return age;
    };

    const calculateMMC = (height, weight) => {
        return (weight / Math.pow(height, 2)) * 10000;
    };

    const age = calculateAge(birthdate);
    const mmc = calculateMMC(height, weight);

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
                        <td className="px-4 py-2">{age} anos</td>
                    </tr>
                    <tr>
                        <th className="text-gray-700 px-4 py-2">Altura:</th>
                        <td className="px-4 py-2">{height} cm</td>
                    </tr>
                    <tr>
                        <th className="text-gray-700 px-4 py-2">Peso:</th>
                        <td className="px-4 py-2">{weight} kg</td>
                    </tr>
                    <tr>
                        <th className="text-gray-700 px-4 py-2">MMC:</th>
                        <td className="px-4 py-2">{mmc.toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
