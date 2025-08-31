import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/components/theme-provider";
import ClientLayout from "./ClientLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Prep",
  description: "Your one-stop portal for academic resources",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning={true}>
        <ClerkProvider  appearance={{ baseTheme: dark }} >
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
          >
            <ClientLayout >
              {children}
              <Toaster position="bottom-right" reverseOrder={false} />
            </ClientLayout>
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
