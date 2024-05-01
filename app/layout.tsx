import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import './styles/layout.scss'
import { AppProviders } from "@/providers";

const inter = Inter({ subsets: ["latin"] });

 

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
       

        <AppProviders
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
