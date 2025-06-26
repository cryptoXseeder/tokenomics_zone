export const metadata = {
  title: "Tokenomics Zone",
  description: "Find undervalued and overvalued zones using market cap and supply.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
