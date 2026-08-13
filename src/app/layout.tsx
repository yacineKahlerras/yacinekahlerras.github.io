import type { Metadata } from "next";
import "./globals.css";

const TITLE = "Yacine Kahlerras · Full-stack developer";
const DESCRIPTION =
  "Full-stack developer building web, desktop and mobile products end to end. Offline-first apps, hundreds of automated tests, and details done properly. Currently taking projects.";

export const metadata: Metadata = {
  // makes every relative URL below absolute, which Facebook/Messenger require
  metadataBase: new URL("https://www.yacinekahlerras.com"),
  title: TITLE,
  description: DESCRIPTION,
  authors: [{ name: "Yacine Kahlerras" }],
  creator: "Yacine Kahlerras",
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Yacine Kahlerras",
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/images/og.png",
        width: 1200,
        height: 630,
        alt: "Yacine Kahlerras, full-stack developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/images/og.png"],
  },
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
