import { GET_SMART_PRODUCTS_BY_SLUG } from "@/lib/api/smart-products";
import client from "@/lib/api/apollo-client";
import SmartProductDetails from "@/screens/smart-housing/ProductDetails";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const { data } = await client.query({
    query: GET_SMART_PRODUCTS_BY_SLUG,
    variables: { slug: slug || "" },
  });

  return {
    title: data?.smartHomeInnovationsCollection?.items[0]?.name,
    description: data?.smartHomeInnovationsCollection?.items[0]?.description,
  };
}

const SmartProductDetailsPage = () => {
  return <SmartProductDetails />;
};

export default SmartProductDetailsPage;
