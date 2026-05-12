import './globals.css';
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <nav className="p-4 bg-gray-200 flex gap-4">
          <a href="/login">Login</a>
          <a href="/register">register</a>
          <a href="/dashboard">Dashboard</a>
        </nav>
        {children}
      </body>
    </html>
  );
}
