import { NextResponse } from 'next/server';
import twilio from 'twilio';

const ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const SERVICE_SID = process.env.TWILIO_SERVICE_SID;
const AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;

export async function POST(request) {
    try {
        const { phone, otp } = await request.json();

        if (!phone || !otp) {
            return NextResponse.json({ message: 'Phone and OTP are required' }, { status: 400 });
        }

        if (!AUTH_TOKEN) {
             // Mock check for dev
             if (otp === '1234') {
                 return NextResponse.json({ success: true, message: 'Mock Verified' }, { status: 200 });
             }
             return NextResponse.json({ success: false, message: 'Invalid Mock OTP' }, { status: 400 });
        }

        const client = twilio(ACCOUNT_SID, AUTH_TOKEN);

        // Verification Check
        const verification_check = await client.verify.v2.services(SERVICE_SID)
            .verificationChecks
            .create({ to: phone, code: otp });

        if (verification_check.status === 'approved') {
            return NextResponse.json({ success: true, message: 'Phone Verified Successfully' }, { status: 200 });
        } else {
            return NextResponse.json({ success: false, message: 'Invalid OTP' }, { status: 400 });
        }

    } catch (error) {
        console.error('Twilio Verify Check Error:', error);
        return NextResponse.json({ message: 'Error verifying code' }, { status: 500 });
    }
}
