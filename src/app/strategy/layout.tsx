import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Strategy Pattern",
    description: "Creating SimUDuck Application",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                {children}
            </body>
        </html>
    );
}
