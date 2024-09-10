import "@/styles/globals.scss";
import ClientProvider from "./_components/QueryClientProvider";

import { VT323 } from "next/font/google";
import SettingsStateProvider from "./_components/SettingsContext";

const pixel = VT323({
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
      <body className={`${pixel.className}`}>
          <ClientProvider>
            {/* <Nav /> */}
            <SettingsStateProvider>
                {children}
            </SettingsStateProvider>
          </ClientProvider>
      </body>
    </html>
  );
}
