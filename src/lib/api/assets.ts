import { gql, TypedDocumentNode } from "@apollo/client";

type Asset = {
  fileName: string;
  url: string;
  title: string;
};

type GetBehindTheBuildAssets = {
  assetCollection: {
    items: Asset[];
  };
};

type GetBehindTheBuildVariables = {
  titles: string[];
  limit: number;
};

const GET_BEHIND_THE_BUILD_ASSETS: TypedDocumentNode<
  GetBehindTheBuildAssets,
  GetBehindTheBuildVariables
> = gql`
  query Assets($titles: [String!]) {
    assetCollection(where: { title_in: $titles }, limit: 4) {
      items {
        title
        fileName
        url
      }
    }
  }
`;

export { GET_BEHIND_THE_BUILD_ASSETS };
