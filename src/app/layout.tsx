import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Header from "@/components/layout/Header";
import Container from "@/components/layout/Container";
import SideBar from "@/components/ui/SideBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GAME DB",
  description: "게임 정보를 제공하는 게임 데이터베이스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <section>
          <Container>
            <SideBar />
            <div className="flex w-full justify-center">
              <main>{children}</main>
            </div>
          </Container>
        </section>
      </body>
    </html>
  );
}
