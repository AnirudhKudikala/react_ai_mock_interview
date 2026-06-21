import type React from "react";

interface MyComponentProps {
    children: React.ReactNode;
    // add other props here if needed
}

export default function LoginLayout({children}: MyComponentProps) {
    return (
        <>
            <section className="bg-white">
            <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
                <section className="relative hidden lg:flex lg:col-span-5 xl:col-span-6 items-center justify-center bg-white">
                    <img
                        src="/React_AI_Mock_Interview_Logo.png"
                        alt="AI Mock Interview"
                        className="max-h-[80vh] max-w-[90%] object-contain"
                    />
                </section>
                <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
                    {children}
                </main>
            </div>
            </section>
        </>
    )
}
