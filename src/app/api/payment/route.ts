import CreateSession from '@/libs/createSession';
import { NextResponse } from 'next/server';

export async function POST(req:Request){
    try { 
        const {bookId} = await req.json();
        const res = await CreateSession(bookId);
        console.log(res);
        return NextResponse.json(res);
    }
    catch(e) {
        console.error('Error creating session:', e);
        return NextResponse.json({ message: 'An error occurred' });
    }
}
