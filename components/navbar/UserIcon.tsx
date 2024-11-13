import { currentUser, auth } from "@clerk/nextjs/server";
import { LuUser2 } from "react-icons/lu";

async function UserIcon() {
  // sync
  const { userId } = auth();
  //async
  const user = await currentUser();
  console.log("user-icon", user, userId);
  const profileImage = user?.imageUrl;

  if (profileImage) {
    return <img src={profileImage} alt="user" className="w-6 h-6 rounded-full object-cover" />;
  }
  return <LuUser2 className="w-6 h-6 bg-primary rounded-full text-white" />;
}

export default UserIcon;
