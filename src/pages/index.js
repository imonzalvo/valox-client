import { useMemo, useState } from "react";
import Head from "next/head";
import tw from "twin.macro";
import { dehydrate, QueryClient } from "@tanstack/react-query";

import * as api from "../api/homeInfo";
import { useHomeInfo } from "../hooks/useHomeInfo";
import { useCategory } from "@/hooks/useCategory";

import AnimationRevealPage from "@/components/AnimationRevealPage";
import Hero from "@/components/Hero";
import TabGrid from "@/components/TabGrid";

const Container = tw.div`flex flex-1 w-full justify-center`;
const HighlightedText = tw.div`bg-primary-500 text-gray-100 px-4 inline-block`;

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.fetchQuery(["homeInfo"], () =>
    api.getHomeInfo(process.env.NEXT_PUBLIC_BUSINESS_HANDLE)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default function Index() {
  const [activeTab, setActiveTab] = useState({ name: "Todos", id: "todos" });

  const { data: homeInfo } = useHomeInfo();
  const { data: category, isFetching: isFetchingCategoryProducts } =
    useCategory(activeTab.id);

  const imageCss = tw`rounded-4xl`;

  const tabs = useMemo(() => {
    let tabsKeys = {};
    tabsKeys["Todos"] = { id: "todos", name: "Todos" };

    homeInfo.categories.forEach((category) => {
      tabsKeys[category.name] = {
        tabName: category.name,
        id: category.id,
      };
    });

    return tabsKeys;
  }, [homeInfo])

  const isLocal =
    homeInfo.company.configurations.image.sizes["tablet"].url.includes(
      "localhost"
    );

  const description = homeInfo.company.configurations.description;

  const landingImageUrl = `${isLocal ? "" : process.env.NEXT_PUBLIC_API_URL}${
    homeInfo.company.configurations.image.sizes["tablet"].url
  }`;
  
  return (
    <Container>
      <Head>
        <title>{process.env.NEXT_PUBLIC_BUSINESS_TITLE}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AnimationRevealPage>
        <Hero
          heading={
            <>
              Manualidades en crochet{" "}
              <HighlightedText>Hechas en casa</HighlightedText>
            </>
          }
          description={description}
          imageSrc={landingImageUrl}
          imageCss={imageCss}
          imageDecoratorBlob={true}
          primaryButtonText="Order Now"
          watchVideoButtonText="Meet The Chefs"
        />
        <TabGrid
          heading={
            <>
              Conoc?? nuestros <HighlightedText>productos</HighlightedText>
            </>
          }
          tabs={tabs}
          products={
            activeTab.id == "todos" || !category
              ? homeInfo.products
              : category.products
          }
          activeTab={activeTab}
          setActiveTab={(tab) => setActiveTab(tab)}
          isFetching={isFetchingCategoryProducts}
        />
      </AnimationRevealPage>
    </Container>
  );
};
