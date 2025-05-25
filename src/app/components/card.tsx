import Image from 'next/image';

export interface Acne {
    id: string;
    acne_type: string;
    image_url: string;
    created_at: string;
}

export default function Card({ acne }: { acne: Acne }) {
    const date = new Date(acne.created_at).toLocaleDateString('en-GB');
    const time = new Date(acne.created_at).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    
    return (
        <div className="flex flex-row border-2 border-gray-300 w-5/6 rounded-2xl p-4 my-3 mx-6 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-102">
            <Image src={acne.image_url} alt={acne.acne_type} width={200} height={200} className="rounded-xl ml-2" />
            <div className='flex flex-col px-5 justify-center'>
                <div className='text-lg'>Acne type: {acne.acne_type}</div>
                <p className="text-sm text-gray-500">Date: {date} {time}</p>
            </div>
        </div>
    );
}
