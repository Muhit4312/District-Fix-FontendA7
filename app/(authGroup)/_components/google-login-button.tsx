"use client";

import { GoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";
import { googleLoginAction } from "../_actions/google-login";


export function GoogleLoginButton() {
    const handleGoogleSuccess = async (credentialResponse: {
        credential?: string;
    }) => {
        const idToken = credentialResponse.credential;

        if (!idToken) {
            toast.error("Google authentication failed.");
            return;
        }

        const result = await googleLoginAction(idToken);

        if (!result.success) {
            toast.error(result.message);
        }
    };

    return (
        <GoogleLogin
            onSuccess={(credentialResponse) => {
                
                handleGoogleSuccess(credentialResponse);
            }}
            onError={() => {
                
                toast.error("Google login failed.");
            }}
            shape="pill"
            size="large"
            
        />
    );



     
}