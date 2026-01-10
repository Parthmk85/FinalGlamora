import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db('glamora');
        const products = await db.collection('products').find({}).toArray();

        // Convert _id to string for frontend compatibility
        const formattedProducts = products.map(product => ({
            ...product,
            id: product._id.toString(),
            _id: product._id.toString()
        }));

        return NextResponse.json({ products: formattedProducts }, { status: 200 });
    } catch (error) {
        console.error('Fetch products error:', error);
        return NextResponse.json({ message: 'Error fetching products' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const { name, price, category, image, description } = await request.json();

        if (!name || !price || !category) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db('glamora');
        
        const newProduct = {
            name,
            price: parseFloat(price),
            category,
            image: image || 'https://via.placeholder.com/300', // Default placeholder if empty
            description,
            createdAt: new Date()
        };

        const result = await db.collection('products').insertOne(newProduct);

        return NextResponse.json({ 
            message: 'Product added successfully', 
            productId: result.insertedId 
        }, { status: 201 });

    } catch (error) {
        console.error('Add product error:', error);
        return NextResponse.json({ message: 'Error adding product' }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ message: 'Product ID required' }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db('glamora');

        const { ObjectId } = require('mongodb');
        const result = await db.collection('products').deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 1) {
            // Also remove this product from all user carts
            // Carts store items with 'id' as a string matching the product ID
            await db.collection('carts').updateMany(
                {}, 
                { $pull: { items: { id: id } } }
            );

            return NextResponse.json({ message: 'Product deleted successfully' }, { status: 200 });
        } else {
            return NextResponse.json({ message: 'Product not found' }, { status: 404 });
        }

    } catch (error) {
        console.error('Delete product error:', error);
        return NextResponse.json({ message: 'Error deleting product' }, { status: 500 });
    }
}
