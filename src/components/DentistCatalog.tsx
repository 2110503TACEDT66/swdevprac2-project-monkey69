import Link from "next/link"
import DentistCard from "./DentistCard"

export default function DentistCatalog({dentJson} : {dentJson:Object}) {
    return (
        <div>
            <div style={{margin:"20px", display:"flex", flexDirection:"row", flexWrap:"wrap", justifyContent:"space-around", alignContent:"space-around"}}>
                {
                    dentJson.data.map((dentItem:Object)=>(
                        <Link href={`/dentist/${dentItem._id}`} className="w-1/5 text-center">
                            <DentistCard dentistName={dentItem.name} imgSrc={`/img/${dentItem.name}.jpg`}/>
                        </Link>
                    ))
                }
            </div>
        </div>
    )

}