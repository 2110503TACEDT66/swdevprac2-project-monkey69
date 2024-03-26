import updateBooking from '@/libs/updateBooking'
import { NextResponse } from 'next/server';

export async function PUT(req:Request){
    try{ 
        const {user, dentistId, bookDate, bookId} = await req.json();
        const res = await updateBooking(user, dentistId, bookDate, bookId);
        console.log(res);
    }
    catch(e){
        return NextResponse.json({ message: 'unfinish' });
    }
    return NextResponse.json({ message: 'success' });
}