import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import ThemeToggle from "@/components/ThemeToggle";

export const metadata: Metadata = {
  title: "GeoBriefing | Blog",
  description: "Análise geopolítica e macroeconômica gerada por IA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <header className="header">
            <div className="container header-content">
              <div className="logo">
                <a href="/">GeoBriefing</a>
              </div>
              <nav className="nav">
                <ThemeToggle />
              </nav>
            </div>
          </header>
          
          <main>
            {children}
          </main>
          
          <footer className="footer">
            <div className="container">
              <p>Gerado automaticamente com Gemini 3.1 Pro</p>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
