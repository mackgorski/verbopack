// import { UserProvider } from '@repo/auth';
import 'ui/dist/globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            {/* <UserProvider> */}
            <body>{children}</body>
            {/* </UserProvider> */}
        </html>
    );
}