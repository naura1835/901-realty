import { gql, TypedDocumentNode } from "@apollo/client";
import { Document } from "@contentful/rich-text-types";

export type SmartProduct = {
  name: string;
  slug: string;
  description: { json: Document };
  shortDescription?: string;
  featuredImage: {
    url: string;
    title?: string;
    description?: string;
  };
  galleryCollection?: {
    items: {
      url: string;
      title?: string;
      description?: string;
    }[];
  };
  videoDemo?: {
    url: string;
    title?: string;
    description?: string;
  };
  category?: string[];
  availability: "Coming Soon" | "In Stock" | "On Demand" | "Out of Stock";
};

type GetSmartProducts = {
  smartHomeInnovationsCollection: {
    total: number;
    __typename: "SmartHomeInnovationsCollection";
    items: SmartProduct[];
  };
};

type GetSmartProductsVariables = {
  skip: number;
  limit: number;
};

type GetSingleSmartProductVariables = {
  slug: string;
};

const GET_SMART_PRODUCTS: TypedDocumentNode<
  GetSmartProducts,
  GetSmartProductsVariables
> = gql`
  query SmartProducts($skip: Int, $limit: Int) {
    smartHomeInnovationsCollection(skip: $skip, limit: $limit) {
      total
      items {
        name
        slug
        availability
        featuredImage {
          url
          title
          description
        }
      }
    }
  }
`;

const GET_SMART_PRODUCTS_BY_SLUG: TypedDocumentNode<
  GetSmartProducts,
  GetSingleSmartProductVariables
> = gql`
  query SmartProduct($slug: String!) {
    smartHomeInnovationsCollection(where: { slug: $slug }, limit: 1) {
      items {
        name
        slug
        availability
        category
        description {
          json
        }
        featuredImage {
          url
        }
        galleryCollection {
          total
          items {
            url
            title
            description
          }
        }
        videoDemo {
          url
          title
          description
        }
      }
    }
  }
`;

export { GET_SMART_PRODUCTS, GET_SMART_PRODUCTS_BY_SLUG };
