import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function PUT(request) {
    try {
        const { id, name, email, phone, address } = await request.json();

        // Validate input
        if (!id || !name || !email) {
            return NextResponse.json(
                { message: 'Required fields are missing' },
                { status: 400 }
            );
        }

        // Connect to MongoDB
        const client = await clientPromise;
        const db = client.db('glamora');
        const users = db.collection('users');

        // Update user
        const result = await users.updateOne(
            { _id: new ObjectId(id) },
            { 
                $set: { 
                    name, 
                    phone: phone || '', 
                    address: address || '',
                    updatedAt: new Date()
                } 
            }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json(
                { message: 'User not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { 
                message: 'Profile updated successfully',
                user: { id, name, email, phone, address }
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Update profile error:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}
