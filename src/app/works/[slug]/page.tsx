import { GET_PROJECT_BY_SLUG } from "@/lib/api/projects";
import client from "@/lib/api/apollo-client";
import WorkDetails from "@/screens/works/WorkDetails";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const { data } = await client.query({
    query: GET_PROJECT_BY_SLUG,
    variables: { slug: slug || "" },
  });

  return {
    title: data?.projectCollection?.items[0]?.title,
    description: data?.projectCollection?.items[0]?.description,
  };
}

const WorkDetailsPage = () => {
  return <WorkDetails />;
};

export default WorkDetailsPage;
