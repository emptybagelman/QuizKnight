import "@/styles/globals.scss";
import Nav from "./_components/nav";
import ClientProvider from "./_components/QueryClientProvider";

import { GeistSans } from "geist/font/sans";

// import { TRPCReactProvider } from "@/trpc/react";

export const metadata = {
  title: "QuizKnight",
  description: "GeoKnight remake with Next.js",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
          <ClientProvider>
            <Nav />
            {children}
          </ClientProvider>
      </body>
    </html>
  );
}
