import { useRouter } from "next/router";
import { FloatingWhatsApp } from "react-floating-whatsapp";

import { useHomeInfo } from "@/hooks/useHomeInfo";

import Header from "./header";
import Footer from "@/layout/footer";
import { useMemo } from "react";

const formattedPhoneNumber = (phone) => {
  const string = "^09";
  const uruguayFormatStyle = new RegExp(string);

  const isUruguayStylePhone = uruguayFormatStyle.test(phone);

  if (isUruguayStylePhone) {
    const res = phone.replace(/^0+/, "");
    return `+598${res}`;
  }

  return phone;
};

// TODO: Every component inside layout should call getHomeInfo
// WARNING: Every component inside layout should call getHomeInfo
export default function Layout({ children }) {
  const {
    query: { business },
  } = useRouter();
  const { data: companyInfo } = useHomeInfo(business);

  const whatsAppNumber = useMemo(() => {
    if (!!companyInfo?.company?.configurations?.generalInformation?.phone) {
      return formattedPhoneNumber(
        companyInfo.company.configurations.generalInformation.phone
      );
    }

    return false;
  }, [companyInfo]);

  return (
    <>
      <Header companyInfo={companyInfo} />
      <main className="min-h-[calc(100vh-197px-64px)] w-full">{children}</main>
      {!!whatsAppNumber && (
        <div style={{ position: "absolute" }}>
          <FloatingWhatsApp
            phoneNumber={whatsAppNumber}
            statusMessage={"Disponible"}
            accountName={companyInfo?.company?.configurations?.name}
            chatMessage={"Buenas! En que podemos ayudarte?"}
            placeholder={"Escriba su consulta"}
            avatar="favicon.ico"
          />
        </div>
      )}
      {/* <Footer /> */}
    </>
  );
}
