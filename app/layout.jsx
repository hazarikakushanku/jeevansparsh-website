import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DoctorAssistant from "@/components/DoctorAssistant";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });

export const metadata = {
  title: "Jeevansparsh | Multi-Speciality Physiotherapy & Rehabilitation Centre",
  description: "Jeevansparsh is a multi-speciality physiotherapy and rehabilitation centre offering top-tier healthcare services.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans flex flex-col min-h-screen`}>
        <Navbar />
        <main className="flex-grow pt-20">
          {children}
        </main>
        <Footer />
        <DoctorAssistant />
      </body>
    </html>
  );
}
