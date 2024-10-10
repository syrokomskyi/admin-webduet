export const metadata = {
  title: "Admin",
  description: "Inner API for working the Admin.",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
