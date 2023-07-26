import bcrypt from "bcrypt";

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = parseInt(process.env.SALT_ROUNDS || "");
  if (isNaN(saltRounds)) {
    throw new Error("SALT_ROUNDSに数値が設定されていません。");
  }

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw new Error("パスワードのハッシュ化に失敗しました。");
  }
};

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  try {
    const match = await bcrypt.compare(password, hash);
    return match;
  } catch (error) {
    return false;
  }
}
