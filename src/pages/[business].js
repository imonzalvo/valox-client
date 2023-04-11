import { useMemo } from "react";
import Head from "next/head";
import tw from "twin.macro";
import { dehydrate, QueryClient } from "@tanstack/react-query";

import * as api from "../api/homeInfo";
import { useHomeInfo } from "../hooks/useHomeInfo";

import Hero from "@/components/Hero";
import Slider from "@/components/slider";
import { useWidth } from "@/hooks/helpers/useWidth";
import { useRouter } from "next/router";

const SectionHeading = tw.h2`text-start text-4xl sm:text-5xl font-black tracking-wide text-center xsmall:max-w-[375px]`;
const Header = tw(SectionHeading)``;
const Container = tw.div`flex flex-1 flex-col items-center w-full justify-center`;
const HighlightedText = tw.div`bg-primary-500 text-gray-100 px-4 inline-block`;
const StyledDiv = tw.div`pt-8 max-w-6xl w-full font-display min-h-screen text-secondary-500 overflow-hidden flex flex-col items-center`;

export const getServerSideProps = async (ctx) => {
  const { business } = ctx.query;

  const queryClient = new QueryClient();

  await queryClient.fetchQuery(["homeInfo"], () => api.getHomeInfo(business));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default function Index() {
  const {
    query: { business },
  } = useRouter();
  const width = useWidth();
  const { data: homeInfo } = useHomeInfo(business);

  const sliderProductsChunkAmount = useMemo(() => {
    if (width < 524) {
      return 1;
    }
    if (width < 1024) {
      return 2;
    }
    if (width < 1440) {
      return 3;
    }

    return 4;
  }, [width]);

  const isMobile = useMemo(() => {
    return width < 524;
  }, [width]);

  if (width == 0) {
    return;
  }

  const isLocal =
    homeInfo.company.configurations.image.sizes["tablet"].url.includes(
      "localhost"
    );

  const description = homeInfo.company.configurations.description;

  const landingImageUrl = `${isLocal ? "" : process.env.NEXT_PUBLIC_API_URL}${
    homeInfo.company.configurations.image.sizes["tablet"].url
  }`;

  return (
    <Container
      style={{
        width: "100%",
      }}
    >
      <Head>
        <title>{homeInfo.company.name}</title>
        <meta name="og.title" content={homeInfo.company.name} />
        <meta name="og.description" content={description} />
        <meta name="description" content={description} />
        <meta name="og.description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero
        heading={
          <>
            <span className="text-gray-900">Manualidades en crochet </span>
            <HighlightedText>Hechas en casa</HighlightedText>
          </>
        }
        description={description}
        landingImageUrl={landingImageUrl}
        imageDecoratorBlob={true}
        primaryButtonText="Order Now"
        watchVideoButtonText="Meet The Chefs"
      />
      <StyledDiv>
        <Header
          style={{
            marginLeft: 32,
            marginTop: 16,
            marginRight: 32,
          }}
        >
          Conocé nuestros <HighlightedText>productos</HighlightedText>
        </Header>

        <Slider
          products={homeInfo.products}
          showArrows={!isMobile}
          productsByChunk={sliderProductsChunkAmount}
          fullWidthProducts={isMobile}
        />
      </StyledDiv>
    </Container>
  );
}
