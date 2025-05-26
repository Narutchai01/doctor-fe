import { useState } from 'react';
import Image from 'next/image';

export interface Acne {
    _id: string;
    description: string;
    image: string;
    date: string;
}

export default function Card({ acne }: { acne: Acne }) {
    const date = new Date(acne.date).toLocaleDateString('en-GB');
    const time = new Date(acne.date).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

    const [expanded, setExpanded] = useState(false);
    const toggleExpanded = () => setExpanded(!expanded);

    return (
        <div className="flex flex-row border-2 border-gray-300 w-11/12 rounded-2xl p-4 my-3 mx-6 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-102">
            <div className="w-[200px] h-[200px] flex-shrink-0">
                <Image
                    src={acne.image}
                    alt="Acne Image"
                    width={200}
                    height={200}
                    className="rounded-xl object-cover w-full h-full"
                />
            </div>
            <div className='flex flex-col px-5 justify-center'>
                {expanded ? (
                    <div className='text-md whitespace-pre-line'><span className='font-bold'>Description:</span> {acne.description}</div>
                ) : (
                    <div className='text-md whitespace-pre-line line-clamp-6'><span className='font-bold'>Description:</span> {acne.description}</div>
                )}
                <button
                    onClick={toggleExpanded}
                    className="text-blue-500 mt-3 text-sm font-semibold hover:underline cursor-pointer self-start"
                >
                    {expanded ? 'See less' : 'See more'}
                </button>

                <p className="text-sm text-gray-500 pt-3">Date: {date} {time}</p>
            </div>
        </div>
    );
}
