import { useHomeInfo } from "@/hooks/useHomeInfo";
import Footer from "@/layout/footer";
import Header from "./header";

export default function Layout({ children }) {
  const { data: companyInfo } = useHomeInfo();
  
  return (
    <>
      <Header companyInfo={companyInfo} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
