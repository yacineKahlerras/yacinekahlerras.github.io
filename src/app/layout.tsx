import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yacine Kahlerras — Full-stack developer",
  description:
    "Full-stack developer working with startups on products that look good, feel smooth, and keep users around.",
  icons: {
    icon: "/images/GamingLogo.png",
  },
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
