import GetUser from '@/libs/getUser';
import { NextResponse } from 'next/server';

export async function GET(req:Request){
    try{ 
        await GetUser();
    }
    catch(e){
        return NextResponse.json({ message: 'unfinish' });
    }
    return NextResponse.json({ message: 'success' });
}