import type { Metadata } from 'next';
export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
};

const RootLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <html lang='ko'>
            <body>{children}</body>
        </html>
    );
};

export default RootLayout;
