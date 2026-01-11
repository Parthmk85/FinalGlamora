import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const orderData = await request.json();
        const { items, total, customerName, customerPhone, customerEmail } = orderData;

        // Format order details for WhatsApp message
        const orderDetails = items.map((item, index) => 
            `${index + 1}. ${item.name} - Qty: ${item.quantity} - ₹${(item.price * item.quantity).toFixed(2)}`
        ).join('\n');

        const message = `🛍️ *New Order Received!*\n\n` +
            `👤 Customer: ${customerName}\n` +
            `📞 Phone: ${customerPhone}\n` +
            `📧 Email: ${customerEmail}\n\n` +
            `📦 *Order Items:*\n${orderDetails}\n\n` +
            `💰 *Total Amount: ₹${total.toFixed(2)}*\n\n` +
            `⏰ Time: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`;

        // Send WhatsApp notification using Twilio
        const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
        const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
        const TWILIO_WHATSAPP_FROM = process.env.TWILIO_WHATSAPP_FROM; // whatsapp:+14155238886
        const RECIPIENT_PHONE = process.env.WHATSAPP_RECIPIENT_PHONE; // whatsapp:+919725942209

        if (TWILIO_ACCOUNT_SID && TWILIO_AUTH_TOKEN && TWILIO_WHATSAPP_FROM && RECIPIENT_PHONE) {
            try {
                // Twilio WhatsApp API call
                const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`;
                
                const formData = new URLSearchParams();
                formData.append('From', TWILIO_WHATSAPP_FROM);
                formData.append('To', RECIPIENT_PHONE);
                formData.append('Body', message);

                const twilioResponse = await fetch(twilioUrl, {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Basic ' + Buffer.from(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`).toString('base64'),
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: formData.toString()
                });

                const twilioData = await twilioResponse.json();
                
                if (!twilioResponse.ok) {
                    console.error('Twilio WhatsApp Error:', twilioData);
                } else {
                    console.log('WhatsApp notification sent successfully! SID:', twilioData.sid);
                }
            } catch (whatsappError) {
                console.error('WhatsApp sending error:', whatsappError);
                // Continue even if WhatsApp fails - order should still be processed
            }
        } else {
            console.log('Twilio credentials not configured. Skipping WhatsApp notification.');
        }

        // Return success response
        return NextResponse.json({
            success: true,
            message: 'Order placed successfully and notification sent!',
            orderId: `ORD-${Date.now()}`
        });

    } catch (error) {
        console.error('Order processing error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to process order' },
            { status: 500 }
        );
    }
}
