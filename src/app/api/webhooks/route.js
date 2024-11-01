import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { supabase } from "@/utils/supabaseClient";

import crypto from 'crypto';

// Initialize Supabase client

export async function POST(req) {
    const rawBody = await req.text();  // Capture raw body for signature verification
    const clerkSignature = req.headers.get('svix-signature');  // Retrieve Clerk signature
    const secret = process.env.CLERK_WEBHOOK_SECRET;  // Clerk webhook secret

    // Verify the webhook signature manually
    const isValid = verifySignature(rawBody, clerkSignature, secret);

    if (!isValid) {
        return NextResponse.json({ message: 'Invalid signature' }, { status: 400 });
    }

    // Parse the payload and extract user information
    const { data, type } = JSON.parse(rawBody);

    if (type === 'user.created') {
        const { id, first_name, last_name, email_addresses } = data;
        const email = email_addresses[0]?.email_address || '';

        // Save user data to Supabase
        const { error } = await supabase.from('users').insert({
            id,
            first_name,
            last_name,
            email,
        });

        if (error) {
            return NextResponse.json({ message: 'Database error' }, { status: 500 });
        }
    }

    return NextResponse.json({ message: 'Webhook processed' }, { status: 200 });
}

// Helper function to verify signature
function verifySignature(payload, signature, secret) {
    const hash = crypto.createHmac('sha256', secret).update(payload).digest('hex');
    return signature === `v0,${hash}`;
}
