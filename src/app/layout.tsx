
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
      <body className="antialiased text-white selection:bg-yellow-500/30 selection:text-yellow-200">
    <div className="min-h-screen w-full  relative">
  {/* Volcanic Ember */}
  <div
    className="absolute inset-0 -z-1"
    style={{
      background: `
        radial-gradient(ellipse 120% 70% at 70% 80%, rgba(87, 24, 69, 0.20), transparent 52%),
        radial-gradient(ellipse 160% 45% at 30% 30%, rgba(153, 27, 27, 0.16), transparent 58%),
        radial-gradient(ellipse 85% 100% at 10% 60%, rgba(69, 26, 3, 0.22), transparent 46%),
        #1c1917
      `,
    }}
  />
  {children}
</div>
       
      </body>
    </html>
  );
}
