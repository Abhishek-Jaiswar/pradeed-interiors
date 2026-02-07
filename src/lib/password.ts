import { hash, compare } from "bcryptjs";

const SALT_ROUNDS = 12;

/**
 * Hashes a plain text password using bcrypt.
 */
export async function hashPassword(password: string): Promise<string> {
  return await hash(password, SALT_ROUNDS);
}

/**
 * Compares a plain text password with a hashed password.
 */
export async function comparePasswords(password: string, hashed: string): Promise<boolean> {
  return await compare(password, hashed);
}
