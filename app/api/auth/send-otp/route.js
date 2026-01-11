import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

// Generate random 6-digit OTP
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(request) {
    try {
        const { phone } = await request.json();

        if (!phone) {
            return NextResponse.json({ message: 'Phone number is required' }, { status: 400 });
        }

        // Check if phone number already exists
        const client = await clientPromise;
        const db = client.db('glamora');
        const users = db.collection('users');
        
        // Normalize phone number for comparison (remove +91 if present)
        const normalizedPhone = phone.replace('+91', '');
        
        // Check both formats: with and without +91
        const existingUser = await users.findOne({
            $or: [
                { phone: phone },
                { phone: normalizedPhone },
                { phone: '+91' + normalizedPhone }
            ]
        });
        if (existingUser) {
            return NextResponse.json(
                { message: 'This phone number is already registered. Please use a different number or login.' },
                { status: 400 }
            );
        }

        // Generate OTP automatically
        const otp = generateOTP();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        // Store OTP in database (temporary collection)
        const otpCollection = db.collection('otp_verifications');
        
        // Delete any existing OTP for this phone
        await otpCollection.deleteMany({ phone });
        
        // Insert new OTP
        await otpCollection.insertOne({
            phone,
            otp,
            expiresAt: otpExpiry,
            createdAt: new Date()
        });

        // TODO: Future - Send OTP via Twilio
        // const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
        // const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
        // if (TWILIO_ACCOUNT_SID && TWILIO_AUTH_TOKEN) {
        //     // Send SMS via Twilio
        // }

        console.log(`📱 OTP Generated for ${phone}: ${otp}`); // For development

        return NextResponse.json({ 
            success: true, 
            message: 'OTP generated successfully',
            otp: otp, // Remove this in production, only for testing
            expiresIn: '10 minutes'
        }, { status: 200 });

    } catch (error) {
        console.error('OTP Generation Error:', error);
        return NextResponse.json({ message: error.message || 'Failed to generate OTP' }, { status: 500 });
    }
}
