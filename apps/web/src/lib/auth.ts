import { useState, useEffect } from 'react';

const AUTH0_DOMAIN = 'dev-fe8jacbga812desp.us.auth0.com';
const AUTH0_CLIENT_ID = 'your-auth0-client-id';
const AUTH0_AUDIENCE = 'https://dev-fe8jacbga812desp.us.auth0.com/api/v2/';
const AUTH0_SCOPE = 'openid profile email';

export function useAuth() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/auth/me');
        if (!res.ok) {
          throw new Error('Failed to fetch user');
        }
        const data = await res.json();
        setUser(data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = () => {
    const params = new URLSearchParams({
      client_id: AUTH0_CLIENT_ID,
      audience: AUTH0_AUDIENCE,
      scope: AUTH0_SCOPE,
      response_type: 'code',
      redirect_uri: `${window.location.origin}/api/auth/callback`,
    });
    window.location.href = `https://${AUTH0_DOMAIN}/authorize?${params}`;
  };

  const logout = () => {
    window.location.href = `/api/auth/logout`;
  };

  return { isLoading, user, error, login, logout };
}
