
import type { Metadata } from "next";
import "./globals.css";



export const metadata: Metadata = {
  title: "BrainCloud",
  description: "Your Second Brain App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-black text-white selection:bg-cyan-500/30 selection:text-cyan-200">
     <div className="fixed inset-0 z-0">
          
           <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-amber-900/20 via-black to-black opacity-80" />
           <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-[0.03] invert" />
        </div>
        <div className="relative z-10 min-h-screen">
          {children}
        </div>
       
      </body>
    </html>
  );
}
