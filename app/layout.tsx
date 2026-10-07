
import "./globals.css";
import { Geist_Mono, Roboto } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import { Providers } from "@/provider/googleProvider";

const robotoHeading = Roboto({ subsets: ['latin'], variable: '--font-heading' });

const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-mono' });


export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", "font-mono", geistMono.variable, robotoHeading.variable)}
    >
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
        <Toaster position="top-right" richColors />
      </body>

    </html>
  );
}
