import Screen, { ScreenAttributes } from "../models/Screen";

export async function getScreenById(id: number) {
  try {
    const screen: ScreenAttributes | null = await Screen.findByPk(id);

    if (!screen) {
      throw {
        error: "Tela não encontrada",
      };
    }

    return {
      ...screen,
    };
  } catch (error) {
    throw {
      error: "Erro interno no servidor",
    };
  }
}
