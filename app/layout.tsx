import type { Metadata } from "next";
import { Inter, Playfair_Display, Dancing_Script } from 'next/font/google';
import "./globals.css";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-dancing-script',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Samba & Elizabeth",
  description: "Created by Wellington Chanda",
  authors: [
    {
      name: "Wellington Chanda",
      url: "mailto://iamwchanda@gmail.com",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfairDisplay.variable} ${dancingScript.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
