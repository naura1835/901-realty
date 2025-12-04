import { gql, TypedDocumentNode } from "@apollo/client";

export type Project = {
  title: string;
  slug: string;
  description: string;
  featuredImage: {
    url: string;
    title?: string;
    description?: string;
  };
  projectImagesCollection?: {
    items: {
      url: string;
      title?: string;
      description?: string;
    }[];
  };
  video?: {
    url: string;
    title?: string;
    description?: string;
  };
  category?:
    | "Commercial"
    | "Smart Housing"
    | "Residential"
    | "Renovation"
    | "Infrastructure";
  location?: string;
  duration?: string;
  status: "Ongoing" | "Completed" | "Upcoming";
};

type GetProjects = {
  projectCollection: {
    total: number;
    __typename: "ProjectCollection";
    items: Project[];
  };
};

type GetSingleProjectVariables = {
  slug: string;
};

const GET_PROJECTS: TypedDocumentNode<GetProjects, void> = gql`
  query Projects {
    projectCollection {
      total
      items {
        title
        slug
        featuredImage {
          url
          title
          description
        }
      }
    }
  }
`;

const GET_PROJECT_BY_SLUG: TypedDocumentNode<
  GetProjects,
  GetSingleProjectVariables
> = gql`
  query Project($slug: String!) {
    projectCollection(where: { slug: $slug }, limit: 1) {
      items {
        title
        description
        featuredImage {
          url
          title
          description
        }
        location
        duration
        category
        projectImagesCollection {
          items {
            url
            title
            description
          }
        }
        video {
          url
          title
          description
        }
        status
      }
    }
  }
`;

export { GET_PROJECTS, GET_PROJECT_BY_SLUG };
