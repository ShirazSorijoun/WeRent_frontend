import jwt from 'jsonwebtoken';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isTokenExpired = (token: any): boolean => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const decodedToken: any = jwt.decode(token);

    // Check if the token has expired
    if (decodedToken && decodedToken.exp) {
      return decodedToken.exp < Date.now() / 1000;
    }

    return false;
  } catch (error) {
    console.error('Error decoding token:', error);
    return false; // Treat decoding errors as if the token is expired
  }
};

export { isTokenExpired };

