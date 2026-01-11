# Twilio WhatsApp Setup Guide (Gujlish)

Aa guide tame Twilio WhatsApp API setup karva mate che. Aa Meta WhatsApp API thi **bahuj easy** che! 🚀

## Kyare Twilio Better Che?

✅ Setup bahuj easy che  
✅ Approval jaldi male che  
✅ Testing mate sandbox ready che  
✅ Documentation clear che  
✅ Free trial credits male che

## Step-by-Step Setup

### Step 1: Twilio Account Banavo

1. [Twilio.com](https://www.twilio.com/try-twilio) par jao
2. "Sign Up" par click karo
3. Tamaru naam, email, password nakho
4. Phone number verify karo (OTP avse)
5. Account type "Products" select karo

### Step 2: WhatsApp Sandbox Activate Karo

1. Twilio Console ma login karo
2. Left sidebar ma **"Messaging"** par click karo
3. **"Try it out"** section ma **"Send a WhatsApp message"** select karo
4. Tamara phone ma WhatsApp kholo
5. Twilio na number par message moklo: **"join [your-sandbox-code]"**
   - Example: `join happy-tiger-123`
6. Confirmation message avse: "You are all set!"

### Step 3: Credentials Levo

Twilio Console ma aa credentials dhundho:

1. **Account SID**: Dashboard par j dashe

   - Example: `YOUR_TWILIO_ACCOUNT_SID`

2. **Auth Token**: Dashboard par "Show" par click karjo

   - Example: `your_auth_token_here`

3. **WhatsApp From Number**: Messaging > Try WhatsApp ma

   - Format: `whatsapp:+14155238886`

4. **Your Phone Number**: Tamaro WhatsApp number
   - Format: `whatsapp:+919725942209`

### Step 4: Environment Variables Set Karo

Tamari `.env.local` file ma aa variables add karo:

\`\`\`env

# Twilio WhatsApp Configuration

TWILIO_ACCOUNT_SID=YOUR_TWILIO_ACCOUNT_SID
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
WHATSAPP_RECIPIENT_PHONE=whatsapp:+919725942209
\`\`\`

**Important:**

- `TWILIO_ACCOUNT_SID`: Tamaro Account SID
- `TWILIO_AUTH_TOKEN`: Tamaro Auth Token (secret rakho!)
- `TWILIO_WHATSAPP_FROM`: Twilio no WhatsApp number (sandbox: +14155238886)
- `WHATSAPP_RECIPIENT_PHONE`: Tamaro WhatsApp number (`whatsapp:+91` sathe)

### Step 5: Test Karo!

1. Dev server restart karo:
   \`\`\`bash
   npm run dev
   \`\`\`

2. Browser ma `http://localhost:3000` kholo
3. Login karo
4. Cart ma products add karo
5. "Proceed to Checkout" par click karo
6. "Place Order" par click karo
7. Tamara WhatsApp par notification check karo! 📱

## Sandbox vs Production

### Sandbox (Testing - Free)

- ✅ Testing mate perfect
- ✅ Free che
- ✅ Instant setup
- ❌ Fakt join karela numbers ne j message jai shake
- ❌ 24 hour pachi fari join karvu pade

### Production (Live Business)

- ✅ Koi ne pn message mokli shako
- ✅ Custom sender name
- ✅ Template messages
- ❌ Facebook Business verification jaruri
- ❌ Paid (per message charges)

## Production Setup (Jyare Business Live Karo)

1. **Facebook Business Manager** account banavo
2. **WhatsApp Business Profile** banavo
3. Twilio ma **"Request to enable my Twilio number for WhatsApp"** karo
4. Facebook approval wait karo (2-3 days)
5. Approved thaya pachi production number use karo

## Pricing

### Free Trial

- Sign up par **$15 free credits** male che
- Testing mate perfect

### Production Pricing (India)

- **Conversation-based pricing**
- Marketing: ~₹0.50 per conversation
- Utility: ~₹0.30 per conversation
- Service: ~₹0.20 per conversation

Check latest pricing: [Twilio WhatsApp Pricing](https://www.twilio.com/whatsapp/pricing)

## Troubleshooting

### Error: "Invalid credentials"

- Account SID ane Auth Token check karo
- Koi extra space to nathi?

### Error: "Sandbox not joined"

- Tamara WhatsApp ma `join [code]` message moklyo che?
- 24 hour pachi expire thai gayo hoy to fari join karo

### Message nathi avtu

- Phone number format check karo: `whatsapp:+919725942209`
- Country code (+91) nakhu che?
- Sandbox ma join karyu che?

### Error: "Unverified number"

- Sandbox ma fakt join karela numbers ne j message jai shake
- Production mate Facebook approval levo

## Message Format

Order notification aavu format ma jashe:

\`\`\`
🛍️ _New Order Received!_

👤 Customer: Parth Makwana
📞 Phone: 9876543210
📧 Email: parth@example.com

📦 _Order Items:_

1. Nadetta Coat - Qty: 1 - ₹5000.00
2. Silver Ring - Qty: 2 - ₹1000.00

💰 _Total Amount: ₹6050.00_

⏰ Time: 12/1/2026, 12:02:16 am
\`\`\`

## Quick Checklist ✅

Before testing, check:

- [ ] Twilio account banavi lidhu
- [ ] WhatsApp sandbox join karyu
- [ ] Account SID ane Auth Token leva lidha
- [ ] `.env.local` file ma badha variables set karya
- [ ] Dev server restart karyu
- [ ] Tamara WhatsApp ma sandbox join message moklyo

## Support Links

- [Twilio Console](https://console.twilio.com/)
- [WhatsApp Sandbox](https://console.twilio.com/us1/develop/sms/try-it-out/whatsapp-learn)
- [Twilio Docs](https://www.twilio.com/docs/whatsapp)
- [Pricing Calculator](https://www.twilio.com/whatsapp/pricing)

## Common Questions

**Q: Sandbox ma ketla numbers add kari shaku?**  
A: Unlimited! Pan har number ne individually join karvu padshe.

**Q: Sandbox message 24 hour pachi kaam nai kare?**  
A: Ha, fari `join [code]` message moklo.

**Q: Production ma javu che to shu karvu?**  
A: Facebook Business verification karavo ane Twilio ne production enable karvanu request moklo.

**Q: Free credits kevi rite use karu?**  
A: Automatic use thase jyare tame messages moklo. Dashboard ma balance check kari shako.

---

**Note**: Aa setup testing mate che. Production mate proper Facebook Business verification jaruri che.

Have maje maje orders ni notifications WhatsApp par avti raheshe! 🎉
