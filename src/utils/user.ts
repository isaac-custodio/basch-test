import User from "../models/User";

export async function getUserById(id: number) {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return undefined;
    }
    return user.toJSON();
  } catch (error) {
    return undefined;
  }
}
