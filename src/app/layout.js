export const metadata = {
  title: "Blog Next.js + WordPress",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen p-4">
        <header>
          <h1>Headless WP + Next.js</h1>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
