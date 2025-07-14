import KiddyNavbar from "../components/KiddyNavbar";
import Footer from "../components/Footer";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <KiddyNavbar />
        {children}
        <Footer/>
      </body>
    </html>
  );
}
