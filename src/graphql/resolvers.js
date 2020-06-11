const resolvers = {
  Query: {
    feed: (root, args, context, info) => {
      return context.prisma.links()
    }
  },
  Mutation: {
    post: (root, args, context) => {       // 수정
      return context.prisma.createLink({   // 수정
        url: args.url,                     // 수정
        description: args.description,     // 수정
      })                                   // 수정
    }
  },
};

export default resolvers;
