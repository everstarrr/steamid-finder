import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Steam Id Finder",
  description: "Test task",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <main className="m-auto p-20 flex flex-col gap-4 items-center">
          {children}
        </main>
      </body>
    </html>
  );
}
