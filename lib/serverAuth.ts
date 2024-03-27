import { getServerSession } from "next-auth";
import { authOptions } from "./auth-options";
import User from "@/database/user.model";

const serverAuth = async () => {
  const session: any = await getServerSession(authOptions);
  const currentUser = await User.findOne({
    email: session.currentUser.email,
  });

  if (!currentUser) {
    throw new Error("Not sign in");
  }

  return { currentUser };
};

export default serverAuth;
