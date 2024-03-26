import postBooking from '@/libs/postBooking'
import { NextResponse } from 'next/server';

export async function POST(req:Request){
    try{ 
        const {user, dentistId, bookDate} = await req.json();
        const res = await postBooking(user, dentistId, bookDate);
        console.log(res);
    }
    catch(e){
        return NextResponse.json({ message: 'unfinish' });
    }
    return NextResponse.json({ message: 'success' });
}