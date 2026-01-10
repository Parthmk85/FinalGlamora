import { NextResponse } from 'next/server';
import twilio from 'twilio';

const ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const SERVICE_SID = process.env.TWILIO_SERVICE_SID;
const AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;

export async function POST(request) {
    try {
        const { phone } = await request.json();

        if (!phone) {
            return NextResponse.json({ message: 'Phone number is required' }, { status: 400 });
        }

        if (!AUTH_TOKEN) {
            console.warn("Twilio Auth Token missing.");
            // Fallback for dev/testing if you haven't added key yet
            return NextResponse.json({ 
                success: true, 
                message: 'Twilio Auth Token missing in .env. Cannot verify.', 
                isMock: true,
                otp: '1234' 
            }, { status: 200 });
        }

        const client = twilio(ACCOUNT_SID, AUTH_TOKEN);

        // Call Twilio Verify API to send SMS
        const verification = await client.verify.v2.services(SERVICE_SID)
            .verifications
            .create({ to: phone, channel: 'sms' });

        return NextResponse.json({ 
            success: true, 
            message: 'OTP Sent successfully via Twilio Verify', 
            status: verification.status 
        }, { status: 200 });

    } catch (error) {
        console.error('Twilio Verify Error:', error);
        return NextResponse.json({ message: error.message || 'Failed to send OTP' }, { status: 500 });
    }
}
