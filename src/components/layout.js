import { useHomeInfo } from "@/hooks/useHomeInfo";
import Footer from "@/layout/footer";
import Header from "./header";

export default function Layout({ children }) {
  const { data: companyInfo } = useHomeInfo();

  return (
    <>
      <Header companyInfo={companyInfo} />
      <main className="min-h-[calc(100vh-197px-64px)]">{children}</main>
      <Footer />
    </>
  );
}
