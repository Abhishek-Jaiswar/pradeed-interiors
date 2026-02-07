import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_for_development_only";
const TOKEN_EXPIRY = "30d";

export interface TokenPayload {
  id: string;
  email: string;
  role: string;
  name?: string | null;
}

/**
 * Signs a new JWT token with the provided user data.
 */
export function signToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
}

/**
 * Verifies a JWT token and returns the decoded payload.
 * Returns null if the token is invalid or expired.
 */
export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch (error) {
    return null;
  }
}
