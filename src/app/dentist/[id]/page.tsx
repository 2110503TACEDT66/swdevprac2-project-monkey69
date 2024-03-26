import Image from "next/image";
import GetDentist from "@/libs/getOneDentist";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function CarDetailPage({params} : {params:{id:string}}) {

    // const mockCarRepo = new Map()
    // mockCarRepo.set("001", {name: "Honda Civic", image: "/img/Veeraphat.jpg"});
    // mockCarRepo.set("002", {name: "Honda Accord", image: "/img/Kankawin.jpg"});
    // mockCarRepo.set("003", {name: "Toyota Fortuner", image: "/img/Schwynn.jpg"});
    // mockCarRepo.set("004", {name: "Tesla Model 3", image: "/img/Veeraphat.jpg"});

    const session = await getServerSession(authOptions);
    if (!session || !session.user.token) return null;

    const dentist = await GetDentist(params.id, session.user.token);

    console.log(dentist)

    return(
        <main className="text-center pt-[50px]">
            <div className="flex flex-row my-5 item-center justify-center">
                <Image src={`/img/${dentist.data.name}.jpg`}
                alt='Dent Image'
                width={0} height={0} sizes="100vw"
                className="rounded-lg w-auto h-[50vh]" />
                <div className="text-xl mx-5 item-center">{dentist.name}</div>
            </div>
            <div>
                <h1 className="text-6xl font-serif">Dr. {dentist.data.name}</h1>
                <div className="text-3xl font-sans mt-[30px]">
                    Years of Experience: {dentist.data.yearsOfExperience} <br/>
                </div>
                <div className="text-3xl font-sans mt-[20px]">
                    Area of Expertise: {dentist.data.areaOfExpertise}
                </div>
            </div>
        </main>
    )
}
