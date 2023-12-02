import { auth } from "@clerk/nextjs"
import { db } from "./db";

export const currentProfile = async () => {
  const { userId } = auth()

  if(!userId) {
    return null;
  }

  //操作数据库，查询用户信息
  const profile = await db.profile.findUnique({
    where: { userId },
    include: { servers: true }
  })

  return profile
}