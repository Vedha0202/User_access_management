import bcrypt from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> =>
  await bcrypt.hash(password, 10);

export const comparePasswords = async (password: string, hash: string): Promise<boolean> =>
  await bcrypt.compare(password, hash);
