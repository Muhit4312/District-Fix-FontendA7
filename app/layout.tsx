
import "./globals.css";
import { Geist_Mono, Roboto } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import { Providers } from "@/provider/googleProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Footer } from "@/components/shared/footer";

const robotoHeading = Roboto({ subsets: ['latin'], variable: '--font-heading' });

const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-mono' });


export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", "font-mono", geistMono.variable, robotoHeading.variable)}
    >
      <body className="min-h-full flex flex-col">
        <TooltipProvider>
          <Providers>
            {children}
            <Footer />
          </Providers>
        </TooltipProvider>

        <Toaster position="top-right" richColors />
      </body>

    </html>
  );
}
