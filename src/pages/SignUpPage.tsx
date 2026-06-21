import { SignUp } from "@clerk/react";
import LoginLayout from "../layouts/LoginLayout";

export default function SignUpPage() {
    return (
        <LoginLayout>
            <SignUp signInUrl="/sign-in" forceRedirectUrl={"/"} />
        </LoginLayout>    
    )
}
