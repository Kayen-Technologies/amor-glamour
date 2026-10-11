import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const careny = localFont({
  src: "./fonts/Careny.ttf",
  weight: "400",
  style: "normal",
  display: "swap",
  variable: "--font-family-car",
  fallback: ["Georgia", "serif"],
});

const arizonaFlare = localFont({
  src: "./fonts/ArizonaFlare.ttf",
  weight: "400",
  style: "normal",
  display: "swap",
  variable: "--font-family-ari",
  fallback: ["Georgia", "serif"],
});

export const metadata: Metadata = {
  title: "Amor Glamour | Beauty, Redefined",
  description: "Discover hair styling, nail art, wig styling, and beauty treatments at Amor Glamour.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`${careny.variable} ${arizonaFlare.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var theme=localStorage.getItem("amor-glamour-theme");if(theme==="light"||theme==="dark"||theme==="colour"){document.documentElement.setAttribute("data-theme",theme)}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-car">
        {children}
      </body>
    </html>
  );
}
