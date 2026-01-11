import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import bcrypt from 'bcryptjs';

export async function POST(request) {
    try {
        const { email, password } = await request.json();

        // Validate input
        if (!email || !password) {
            return NextResponse.json(
                { message: 'Email/Phone and password are required' },
                { status: 400 }
            );
        }

        // Connect to MongoDB
        const client = await clientPromise;
        const db = client.db('glamora');
        const users = db.collection('users');

        // Find user by email OR phone number
        const user = await users.findOne({
            $or: [
                { email: email },
                { phone: email } // 'email' field contains either email or phone
            ]
        });
        
        if (!user) {
            return NextResponse.json(
                { message: 'Invalid credentials' },
                { status: 401 }
            );
        }

        // Check password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return NextResponse.json(
                { message: 'Invalid credentials' },
                { status: 401 }
            );
        }

        // Return user data (without password)
        const { password: _, _id, ...userWithoutPassword } = user;
        
        return NextResponse.json(
            { 
                message: 'Login successful',
                user: {
                    id: _id.toString(),
                    ...userWithoutPassword
                }
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}
