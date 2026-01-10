import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db('glamora');
        // Fetch all users
        const users = await db.collection('users').find({}).toArray();

        const formattedUsers = users.map(user => ({
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            password: user.password, // This will be the hashed password
            phone: user.phone || 'N/A',
            address: user.address || 'N/A',
            createdAt: user.createdAt
        }));

        return NextResponse.json({ users: formattedUsers }, { status: 200 });
    } catch (error) {
        console.error('Fetch users error:', error);
        return NextResponse.json({ message: 'Error fetching users' }, { status: 500 });
    }
}
