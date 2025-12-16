import type { Metadata } from "next";
import "./globals.css";
import Models3DToggle from "./components/Models3DToggle";

export const metadata: Metadata = {
  title: "My Portfolio",
  description: "Personal portfolio and project documentation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Models3DToggle />
      </body>
    </html>
  );
}
