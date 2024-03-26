import Image from 'next/image'
import InteractiveCard from './InteractiveCard'

export default function DentistCard({ dentistName, imgSrc }: { dentistName: string, imgSrc: string }) {

    return (
        <InteractiveCard contentName={dentistName}>
            <div className='w-full h-[70%] relative rounded-t-lg'>
                <Image src={imgSrc}
                    alt='Product Picture'
                    fill={true}
                    className='object-cover rounded-t-lg'
                />
            </div>
            <div className='flex justify-center items-center w-full h-[30%] p-[10px] text-black text-center'>
                {dentistName}
            </div>
        </InteractiveCard>
    )
}
