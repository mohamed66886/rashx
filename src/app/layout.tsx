import type { Metadata } from "next";
import "./globals.css";
import { PopupProvider } from "@/components/ui/popups";
import { CustomCursor } from "@/components/ui/CustomCursor";

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "RASHX | راش اكس",
  description: "الهوية الرسمية لمنصة راش اكس - RASHX Official Platform",
  icons: {
    icon: "/brand/icons/favicon-black-on-blue.svg",
    apple: "/brand/icons/app-icon-rx-black-on-blue.svg",
  },
  openGraph: {
    title: "RASHX | راش اكس",
    description: "الهوية الرسمية لمنصة راش اكس - RASHX Official Platform",
    images: ["/brand/social/og-share-blue.svg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans bg-base text-ink">
        <CustomCursor />
        <PopupProvider>
          {children}
        </PopupProvider>
      </body>
    </html>
  );
}
