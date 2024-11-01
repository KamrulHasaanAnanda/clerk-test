// import { NextRequest, NextResponse } from "next/server";
// import { auth } from "@clerk/nextjs";


// import crypto from 'crypto';
// import { supabaseAdmin } from "@/utils/supabaseClient";



// export async function POST(req) {
//     const rawBody = await req.text();  // Capture raw body for signature verification
//     const clerkSignature = req.headers.get('svix-signature');  // Retrieve Clerk signature
//     const secret = process.env.CLERK_WEBHOOK_SECRET;  // Clerk webhook secret

//     // Verify the webhook signature manually
//     const isValid = verifySignature(rawBody, clerkSignature, secret);

//     if (!isValid) {
//         return NextResponse.json({ message: 'Invalid signature' }, { status: 400 });
//     }

//     // Parse the payload and extract user information
//     const { data, type } = JSON.parse(rawBody);
//     console.log('data, type ', data, type)

//     if (type === 'user.created') {
//         const { id, first_name, last_name, email_addresses } = data;
//         const email = email_addresses[0]?.email_address || '';

//         // Save user data to Supabase
//         const { error } = await supabaseAdmin.from('users').insert({
//             id,
//             first_name,
//             last_name,
//             email,
//         });

//         if (error) {
//             return NextResponse.json({ message: 'Database error' }, { status: 500 });
//         }
//     }

//     return NextResponse.json({ message: 'Webhook processed' }, { status: 200 });
// }

// // Helper function to verify signature
// function verifySignature(payload, signature, secret) {
//     const hash = crypto.createHmac('sha256', secret).update(payload).digest('hex');
//     return signature === `v0,${hash}`;
// }




// // import { supabaseAdmin } from "@/utils/supabaseClient";
// // import { headers } from "next/headers";
// // import { Webhook } from "svix";

// // const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

// // export async function POST(req) {
// //     const payload = await req.json();
// //     const header = headers().get("svix-signature");

// //     // Verify the webhook
// //     const wh = new Webhook(webhookSecret);
// //     let event;
// //     try {
// //         event = wh.verify(JSON.stringify(payload), header);
// //     } catch (err) {
// //         return new Response("Invalid webhook signature", { status: 400 });
// //     }

// //     console.log('event,payload', event, payload)
// //     // Handle user.created event
// //     if (event.type === "user.created") {
// //         const userData = {
// //             id: event.data.id,
// //             email: event.data.email_addresses[0]?.email_address,
// //             created_at: new Date(event.data.created_at).toISOString(),
// //         };

// //         // Insert data into Supabase
// //         const { error } = await supabaseAdmin
// //             .from("users")
// //             .insert(userData);

// //         if (error) {
// //             return new Response("Failed to insert user data", { status: 500 });
// //         }

// //         return new Response("User data synced to Supabase", { status: 200 });
// //     }

// //     return new Response("Event type not handled", { status: 200 });
// // }