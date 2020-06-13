import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { APP_SECRET, getUserId } from "../../utils";

const post = (parent, args, context, info) => {
  const userId = getUserId(context);
  return context.prisma.createLink({
    url: args.url,
    description: args.description,
    postedBy: { connect: { id: userId } },
  });
};

const signup = async (parent, args, context, info) => {
  const password = await bcrypt.hash(args.password, 10);
  const user = await context.prisma.createUser({ ...args, password });
  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  };
};

const login = async (parent, args, context, info) => {
  const user = await context.prisma.user({ email: args.email });
  if (!user) {
    throw new Error("No such user found");
  }
  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error("Invalid password");
  }
  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  };
};

const vote = async (parent, args, context, info) => {
  const userId = getUserId(context);  //JWT 유효성 검증
  const linkExists = await context.prisma.$exists.vote({ // 해당 vote가 있는지 prisma client를 통해 간단하게 확인
    user: { id: userId },
    link: { id: args.linkId },
  });
  if (linkExists) {
    throw new Error(`Already voted for link: ${args.linkId}`); // 있다면 있다고
  }
  return context.prisma.createVote({ // 없으면 생성
    user: { connect: { id: userId } },
    link: { connect: { id: args.linkId } },
  });
};

module.exports = {
  post,
  signup,
  login,
  vote,
};
