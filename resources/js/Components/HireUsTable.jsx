import React from 'react';
import Avatar from './Avatar';

export default function HireUsTable({ employeeImage, text1, text2, text3 }) {
    return (
        <div className="w-full max-w-md mx-auto mt-8">
            <table className="table-auto w-full text-center border-collapse">
                <thead>
                    <tr>
                        <th colSpan={2} className="border-b pb-2">
                            <Avatar avatarImage={employeeImage} /> 
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="text-gray-700 px-4 py-2 border-b">{text1}</td> 
                    </tr>
                    <tr>
                        <td className="text-gray-700 px-4 py-2 border-b">{text2}</td> 
                    </tr>
                    <tr>
                        <td className="text-gray-700 px-4 py-2 border-b">{text3}</td> 
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

