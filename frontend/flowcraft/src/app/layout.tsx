'use client';

import { ThemeContextProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import {ReactNode} from "react";


export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
          <title>Flowcraft</title>
      </head>
      <body>
         <LanguageProvider>
           <ThemeContextProvider>{children}</ThemeContextProvider>
         </LanguageProvider>
      </body>
    </html>
  );
}
