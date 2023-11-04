import { getServerSession } from "next-auth";
import "./globals.css";
import { Inter } from "next/font/google";
import { authOptions } from "./api/auth/[...nextauth]/route";
import SessionProvider from "./utils/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Cloudisk",
  description: "Cloud Storage Services",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  );
}
