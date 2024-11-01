


import { supabaseAdmin } from "@/utils/supabaseClient";


// app/api/webhooks/clerk/route.js

import { headers } from "next/headers";
import { Webhook } from "svix";

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

export async function POST(req) {
    if (req) {

        const payload = await req.json();
        const header = headers().get("svix-signature");

        // Verify the webhook
        const wh = new Webhook(webhookSecret);
        let event;
        try {
            event = wh.verify(JSON.stringify(payload), header);
        } catch (err) {
            return new Response("Invalid webhook signature", { status: 400 });
        }

        // Handle user.created event
        console.log('event', event)
        if (event.type === "user.created") {
            const userData = {
                id: event.data.id,
                email: event.data.email_addresses[0]?.email_address,
                created_at: new Date(event.data.created_at).toISOString(),
            };

            // Insert data into Supabase
            const { error } = await supabaseAdmin
                .from("users")
                .insert(userData);

            if (error) {
                return new Response("Failed to insert user data", { status: 500 });
            }

            return new Response("User data synced to Supabase", { status: 200 });
        }

        return new Response("Event type not handled", { status: 200 });
    } else {
        return new Response("req not found", { status: 500 });

    }
}
