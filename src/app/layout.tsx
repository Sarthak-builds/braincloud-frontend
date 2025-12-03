
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
      <body className="">
     <div className="min-h-screen w-full bg-stone-900 relative z-20">
  {/* Copper & Bronze Background */}
  <div
    className="absolute inset-0 -z-1"
    style={{
      backgroundImage: `
        radial-gradient(circle at 50% 50%, 
          rgba(194, 65, 12, 0.18) 0%, 
          rgba(194, 65, 12, 0.1) 25%, 
          rgba(194, 65, 12, 0.04) 35%, 
          transparent 50%
        )
      `,
      backgroundSize: "100% 100%",
    }}
  />
  {children}
</div>
        
       
      </body>
    </html>
  );
}
