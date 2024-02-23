import Screen from "../models/Screen";

export async function getScreenById(id: number) {
  try {
    const found = await Screen.findByPk(id);

    if (!found) {
      return undefined;
    }

    return found.toJSON();
  } catch (error) {
    return undefined;
  }
}
