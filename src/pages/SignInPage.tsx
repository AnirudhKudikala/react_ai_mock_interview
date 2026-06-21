import { SignIn } from "@clerk/react";
import LoginLayout from "../layouts/LoginLayout";

export default function SignInPage() {
    return (
        <LoginLayout>
            <SignIn signUpUrl="/sign-up" forceRedirectUrl={"/"} />
        </LoginLayout>
    )
}
