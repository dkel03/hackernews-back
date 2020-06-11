import { links, getLink, postLink, fetchLink, delLink } from "./db";
const resolvers = {
  Query: {
    feed: () => links,
    link: (_, args) => getLink(args),
  },
  Mutation: {
    createLink: (_, args) => postLink(args),
    updateLink: (_, args) => fetchLink(args),
    deleteLink: (_, args) => delLink(args)
  },
};

export default resolvers;
