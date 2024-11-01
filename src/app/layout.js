
import Header from "@/Header";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";


export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Header />
          {children}


        </body>
      </html>
    </ClerkProvider>
  );
}
