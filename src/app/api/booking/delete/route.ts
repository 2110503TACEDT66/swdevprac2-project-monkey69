import deleteBooking from '@/libs/deleteBooking'
import { NextResponse } from 'next/server';

export async function DELETE(req:Request){
    try{ 
        const {bookId} = await req.json();
        const res = await deleteBooking(bookId);
        console.log(res);
    }
    catch(e){
        return NextResponse.json({ message: 'unfinish' });
    }
    return NextResponse.json({ message: 'success' });
}