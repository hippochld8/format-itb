import Navbar from "./_components/Navbar";
import LoadingScreen from "./_components/LoadingScreen";
import PageTransition from "./_components/PageTransition";
import Footer from "./_components/Footer";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LoadingScreen />
      <Navbar />
      <main className="relative">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
    </>
  );
}
