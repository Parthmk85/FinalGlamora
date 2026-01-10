import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import bcrypt from 'bcryptjs';

export async function POST(request) {
    try {
        const { name, email, password, phone } = await request.json();

        // Validate input
        if (!name || !email || !password) {
            return NextResponse.json(
                { message: 'All fields are required' },
                { status: 400 }
            );
        }

        // Connect to MongoDB
        const client = await clientPromise;
        const db = client.db('glamora');
        const users = db.collection('users');

        // Check if email already exists
        const existingUser = await users.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { message: 'This email is already registered. Please use a different email or login.' },
                { status: 400 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const result = await users.insertOne({
            name,
            email,
            password: hashedPassword,
            phone: phone || '', // Use the provided phone
            address: '',
            createdAt: new Date()
        });

        return NextResponse.json(
            { 
                message: 'User created successfully',
                userId: result.insertedId.toString()
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Signup error:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}
