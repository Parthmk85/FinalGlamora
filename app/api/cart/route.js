import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
        return NextResponse.json({ message: 'UserId required' }, { status: 400 });
    }

    try {
        const client = await clientPromise;
        const db = client.db('glamora');
        
        // Find cart for this user
        const cart = await db.collection('carts').findOne({ userId: userId });

        return NextResponse.json({ items: cart ? cart.items : [] }, { status: 200 });
    } catch (error) {
        console.error('Fetch cart error:', error);
        return NextResponse.json({ message: 'Error fetching cart' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const { userId, items } = await request.json();

        if (!userId) {
            return NextResponse.json({ message: 'UserId required' }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db('glamora');

        // Update or Insert (Upsert) the cart
        await db.collection('carts').updateOne(
            { userId: userId },
            { 
                $set: { 
                    userId: userId, 
                    items: items,
                    updatedAt: new Date() 
                } 
            },
            { upsert: true }
        );

        return NextResponse.json({ message: 'Cart saved successfully' }, { status: 200 });

    } catch (error) {
        console.error('Save cart error:', error);
        return NextResponse.json({ message: 'Error saving cart' }, { status: 500 });
    }
}
