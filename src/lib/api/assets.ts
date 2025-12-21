import { gql, TypedDocumentNode } from "@apollo/client";

type Asset = {
  description: string;
  url: string;
  title: string;
};

type GetBehindTheBuildAssets = {
  behindTheBuildCollection: {
    items: [
      {
        title: string;
        videosCollection: {
          items: Asset[];
        };
      },
    ];
  };
};

const GET_BEHIND_THE_BUILD_ASSETS: TypedDocumentNode<
  GetBehindTheBuildAssets,
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

export { GET_BEHIND_THE_BUILD_ASSETS };
