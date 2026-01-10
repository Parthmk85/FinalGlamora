import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db('glamora');
        // Fetch all messages, sort by newest first
        const messages = await db.collection('messages').find({}).sort({ createdAt: -1 }).toArray();

        return NextResponse.json({ messages }, { status: 200 });
    } catch (error) {
        console.error('Fetch messages error:', error);
        return NextResponse.json({ message: 'Error fetching messages' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const { name, email, phone, subject, message } = await request.json();

        if (!name || !email || !subject || !message) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db('glamora');

        const newMessage = {
            name,
            email,
            phone: phone || '',
            subject,
            message,
            createdAt: new Date(),
            read: false // Mark as unread initially
        };

        await db.collection('messages').insertOne(newMessage);

        return NextResponse.json({ message: 'Message sent successfully' }, { status: 201 });

    } catch (error) {
        console.error('Save message error:', error);
        return NextResponse.json({ message: 'Error saving message' }, { status: 500 });
    }
}
