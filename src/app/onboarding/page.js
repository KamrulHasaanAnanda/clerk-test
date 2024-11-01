"use client";

import { useEffect } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Onboarding() {
    const { userId } = useAuth();
    const { user } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (userId) {
            fetch("/api/saveUser", { method: "POST" })
                .then((res) => res.json())
                .then((data) => console.log("User saved:", data))
                .catch((error) => console.error("Error saving user:", error));
        }
    }, [userId]);

    return <div>Welcome to Onboarding!</div>;
}
