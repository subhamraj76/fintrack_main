import { Inter } from "next/font/google";
import "./globals.css";
// Imported header
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";

// Font provided for better look
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FinTrack",
  description: "Tracking Day to Day expenses",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} antialiased`}>
          {/* Header with fixed positioning */}
          <Header />
          
          {/* Main content with proper top padding to account for fixed header */}
          <main className="min-h-screen pt-20 pb-8">
            {children}
          </main>
          
          {/* Footer */}
          <footer className="bg-blue-50 py-12 border-t border-blue-100">
            <div className="container mx-auto px-4 text-center text-gray-600">
              <p className="text-sm">Made with ❤️ by Subham</p>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}