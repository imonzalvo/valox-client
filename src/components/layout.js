import { useHomeInfo } from "@/hooks/useHomeInfo";
import Footer from "@/layout/footer";
import { useRouter } from "next/router";
import Header from "./header";

export default function Layout({ children }) {
  const {
    query: { business },
  } = useRouter();
  const { data: companyInfo } = useHomeInfo(business);

  return (
    <>
      <Header companyInfo={companyInfo} />
      <main className="min-h-[calc(100vh-197px-64px)] w-full">{children}</main>
      {/* <Footer /> */}
    </>
  );
}
