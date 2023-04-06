import { useState, useMemo } from "react";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

import * as api from "../../../api/homeInfo";
import { useHomeInfo } from "@/hooks/useHomeInfo";

import ShopSidebar from "@/components/shop/topBar";
import Sidebar from "@/components/shop/sidebar";
import MoblileModalFilters from "@/components/shop/mobileModalFilters";
import { useCategory } from "@/hooks/useCategory";
import Loader from "@/components/common/Loader";
import Head from "next/head";
import ProductList from "../../../components/shop/productList";

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

const mapCategories = (rawCategories) => {
  return rawCategories.map((rawCategory) => {
    let children = rawCategory.children.map((child) => {
      return {
        id: child.id,
        name: child.name,
      };
    });

    children.unshift({
      id: rawCategory.id,
      name: "Todos",
    });

    return {
      id: rawCategory.id,
      name: rawCategory.name,
      children: children,
    };
  });
};

export default function Shop() {
  const {
    query: { categoryId },
  } = useRouter();

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const { data: homeInfo } = useHomeInfo();
  const { data: categoryInfo } = useCategory(categoryId);

  const formattedCategories = useMemo(() => {
    return mapCategories(homeInfo.categoriesTrees);
  }, [homeInfo.categoriesTrees]);

  const products = useMemo(() => {
    return categoryId && !!categoryInfo
      ? categoryInfo.products
      : homeInfo.products;
  }, [categoryId, categoryInfo, homeInfo.products]);

  if (categoryId && !categoryInfo) {
    return <Loader isLoading={true} />;
  }

  const description = homeInfo.company.configurations.description;

  return (
    <div className="bg-white w-full max-w-6xl">
      <Head>
        <title>{`${process.env.NEXT_PUBLIC_BUSINESS_TITLE} | Tienda`}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <MoblileModalFilters
          mobileFiltersOpen={mobileFiltersOpen}
          setMobileFiltersOpen={setMobileFiltersOpen}
          categories={formattedCategories}
          selectedCategory={categoryId}
        />
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ShopSidebar
            mobileFiltersOpen={mobileFiltersOpen}
            setMobileFiltersOpen={setMobileFiltersOpen}
          />
          <section aria-labelledby="products-heading" className="pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              <Sidebar
                categories={formattedCategories}
                selectedCategory={categoryId}
              />
              <ProductList products={products} />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
