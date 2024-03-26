import Image from 'next/image'
import InteractiveCard from './InteractiveCard'

export default function ProductCard( {dentistName, imgSrc} : { dentistName:string, imgSrc:string}) {

    return (
        <InteractiveCard contentName={dentistName}>
            <div className='w-full h-[70%] relative rounded-t-lg'>
                <Image src={imgSrc}
                    alt = 'Prodect Picture'
                    fill={true}
                    className='object-cover rounded-t-lg'
                />
            </div>
            <div className='w-full h-[30%] p-[10px] text-black'>
                {dentistName}
            </div>
        </InteractiveCard>
    )   
}