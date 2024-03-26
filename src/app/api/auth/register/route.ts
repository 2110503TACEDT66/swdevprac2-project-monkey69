import RegisterUser from "@/libs/registerUser";
import { NextResponse } from 'next/server';

export async function POST(req:Request){
    try{ 
        const {name,tel,email,password} = await req.json();
        await RegisterUser(name,tel,email,password);
        return NextResponse.json({ message: 'success' });
    }
    catch(e){return NextResponse.json({ message: 'failed' });}
}