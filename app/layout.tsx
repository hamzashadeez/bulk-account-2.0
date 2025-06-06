import type { Metadata } from "next";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import { Roboto, Roboto_Mono } from "next/font/google";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Admin Bulk Account",
  description: "A simple admin bulk account management tool",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${robotoMono.variable} antialiased`}
      >
        {children}
        <ToastContainer
          position="top-center"
          autoClose={1500}
          hideProgressBar={false}
          closeOnClick={true}
          pauseOnHover={true}
          draggable={true}
          theme="light"
        />
      </body>
    </html>
  );
}
