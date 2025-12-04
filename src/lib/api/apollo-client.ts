import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { offsetLimitPagination } from "@apollo/client/utilities";

const client = new ApolloClient({
  link: new HttpLink({
    uri: `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}/`,
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_CONTENTFUL_CONTENT_DELIVERY_ACCESS_TOKEN}`,
    },
  }),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          smartHomeInnovationsCollection: offsetLimitPagination,
        },
      },
    },
  }),
});

export default client;
