import "@/styles/globals.scss";
import Nav from "./_components/nav";
import ClientProvider from "./_components/QueryClientProvider";

import { MedievalSharp } from "next/font/google";
import SettingsStateProvider from "./_components/SettingsContext";
import Music from "./_components/Music";

const medievalsharp = MedievalSharp({
  weight: "400",
  style: ["normal"],
  subsets: ["latin"]
})

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
      <body className={medievalsharp.className}>
          <ClientProvider>
            {/* <Nav /> */}
            <SettingsStateProvider>
              <Music>
                {children}
              </Music>
            </SettingsStateProvider>
          </ClientProvider>
      </body>
    </html>
  );
}
