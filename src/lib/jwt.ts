import * as jose from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_for_development_only";
const secret = new TextEncoder().encode(JWT_SECRET);

export interface TokenPayload {
  id: string;
  email: string;
  role: string;
  name?: string | null;
}

/**
 * Signs a new JWT token with the provided user data.
 */
export async function signToken(payload: any): Promise<string> {
  return await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('30d')
    .sign(secret);
}

/**
 * Verifies a JWT token and returns the decoded payload.
 * Returns null if the token is invalid or expired.
 */
export async function verifyToken(token: string): Promise<TokenPayload | null> {
  try {
    const { payload } = await jose.jwtVerify(token, secret);
    return payload as unknown as TokenPayload;
  } catch (error) {
    return null;
  }
}
