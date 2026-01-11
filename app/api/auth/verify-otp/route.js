import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(request) {
    try {
        const { phone, otp } = await request.json();

        if (!phone || !otp) {
            return NextResponse.json({ message: 'Phone and OTP are required' }, { status: 400 });
        }

        // Connect to database
        const client = await clientPromise;
        const db = client.db('glamora');
        const otpCollection = db.collection('otp_verifications');

        // Find OTP for this phone number
        const otpRecord = await otpCollection.findOne({ phone });

        if (!otpRecord) {
            return NextResponse.json({ 
                success: false, 
                message: 'No OTP found. Please request a new OTP.' 
            }, { status: 400 });
        }

        // Check if OTP has expired
        if (new Date() > otpRecord.expiresAt) {
            // Delete expired OTP
            await otpCollection.deleteOne({ phone });
            return NextResponse.json({ 
                success: false, 
                message: 'OTP has expired. Please request a new OTP.' 
            }, { status: 400 });
        }

        // Verify OTP
        if (otpRecord.otp === otp) {
            // Delete OTP after successful verification
            await otpCollection.deleteOne({ phone });
            
            console.log(`✅ OTP Verified for ${phone}`);
            
            return NextResponse.json({ 
                success: true, 
                message: 'Phone verified successfully' 
            }, { status: 200 });
        } else {
            return NextResponse.json({ 
                success: false, 
                message: 'Invalid OTP. Please try again.' 
            }, { status: 400 });
        }

    } catch (error) {
        console.error('OTP Verification Error:', error);
        return NextResponse.json({ message: 'Error verifying OTP' }, { status: 500 });
    }
}
