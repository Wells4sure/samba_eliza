import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
