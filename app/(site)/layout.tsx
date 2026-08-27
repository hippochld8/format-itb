import Navbar from "../components/Navbar";
import LoadingScreen from "../components/LoadingScreen";
import PageTransition from "../components/PageTransition";
import Footer from "../components/Footer";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LoadingScreen />
      <Navbar />
      <main className="relative -top-16">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
    </>
  );
}
