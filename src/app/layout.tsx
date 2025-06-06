import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Image from "next/image";
import { Toaster } from "react-hot-toast";

//utils
import { GetStates } from "@/lib";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "ZapChat",
  description: "ZapChat, a mini but cool chat application",
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        style={{
          background:
            "linear-gradient(hsla(222.2,84%,4.9%,0.98),hsla(222.2,84%,4.9%,0.98)),url('/images.png')",
        }}
        className={`${geistSans.variable} ${geistMono.variable} font-sans w-screen h-screen bg-cover bg-no-repeat bg-center relative overflow-hidden text-white`}
      >
        <div className="hidden absolute inset-0 flex justify-center items-center overflow-hidden">
          <Image
            src="/rb_1305.png"
            alt="chat_bg"
            width={1000}
            height={1000}
            className="scale-150 md:scale-110 object-cover"
          />
        </div>

        <div className="relative">
          <Toaster />

          <GetStates>
              {children}
          </GetStates>
          
        </div>
        
      </body>
    </html>
  );
}
