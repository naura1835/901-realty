import { gql, TypedDocumentNode } from "@apollo/client";

type Asset = {
  description: string;
  url: string;
  title: string;
};

type GetAssets<K extends string> = {
  [P in K]: {
    items: [
      {
        title: string;
        url?: string;
        videosCollection?: {
          items: Asset[];
        };
      },
    ];
  };
};

const GET_HERO_SECTION_VIDE0: TypedDocumentNode<
  GetAssets<"assetCollection">,
  void
> = gql`
  query VideoAsset {
    assetCollection(
      where: {
        contentfulMetadata: { tags: { id_contains_some: ["heroSectionVideo"] } }
      }
      limit: 1
    ) {
      items {
        title
        description
        url
      }
    }
  }
`;

const GET_BEHIND_THE_BUILD_ASSETS: TypedDocumentNode<
  GetAssets<"behindTheBuildCollection">,
  void
> = gql`
  query BehindTheBuild {
    behindTheBuildCollection {
      items {
        title
        videosCollection {
          items {
            url
            title
            description
          }
        }
      }
    }
  }
`;

export { GET_HERO_SECTION_VIDE0, GET_BEHIND_THE_BUILD_ASSETS };
