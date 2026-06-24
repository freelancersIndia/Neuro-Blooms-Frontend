/**
 * Decodes a JWT token payload without external libraries.
 * @param {string} token - The JWT token.
 * @returns {object|null} The decoded payload or null if invalid.
 */
export const decodeToken = (token) => {
  if (!token) return null;
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    
    // Decode base64url payload
    const payload = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window
        .atob(payload)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding JWT token:', error);
    return null;
  }
};

/**
 * Checks if a JWT token is expired.
 * @param {string} token - The JWT token.
 * @returns {boolean} True if expired or invalid.
 */
export const isTokenExpired = (token) => {
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) return true;
  
  // Current time in seconds
  const currentTime = Math.floor(Date.now() / 1000);
  return decoded.exp < currentTime;
};

/**
 * Checks if a JWT token is close to expiring (within a buffer time).
 * @param {string} token - The JWT token.
 * @param {number} bufferSeconds - Buffer time in seconds.
 * @returns {boolean} True if close to expiring or expired.
 */
export const isTokenCloseToExpiry = (token, bufferSeconds = 60) => {
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) return true;
  
  const currentTime = Math.floor(Date.now() / 1000);
  return decoded.exp - currentTime < bufferSeconds;
};
