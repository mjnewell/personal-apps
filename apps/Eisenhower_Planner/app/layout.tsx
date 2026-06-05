import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Eisenhower Planner",
  description: "Task prioritization using the Eisenhower Matrix",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
