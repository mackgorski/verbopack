import { NextResponse } from 'next/server';

export async function GET() {
    console.log('GET request received at /api/hello');
    return NextResponse.json({ message: 'Hello from API!' });
}

export async function OPTIONS() {
    console.log('OPTIONS request received at /api/hello');
    return new NextResponse(null, { status: 200 });
}