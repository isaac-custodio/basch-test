import User from "../models/User";

export async function getUserById(id: string) {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      throw { error: "User not found" };
    }
    return user;
  } catch (error) {
    console.error(error);
    throw {
      error: "An error occured while trying to find user",
    };
  }
}
