import { useEffect, useState, useRef } from 'react';
import { redirectToAuthCodeFlow, getAccessToken } from './authCodeWithPkce';
import { UserProfile } from './components/UserProfile';

const clientId = '2d8018c829e44cf0830fdde64f1d379b';

async function fetchProfile(accessToken: string): Promise<UserProfile> {
  const result = await fetch('https://api.spotify.com/v1/me', {
    method: 'GET',
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return await result.json();
}

function App() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    // Prevent double execution in React StrictMode
    if (hasRun.current) return;
    hasRun.current = true;

    const initAuth = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');

      if (!code) {
        await redirectToAuthCodeFlow(clientId);
      } else {
        try {
          const accessToken = await getAccessToken(clientId, code);
          const userProfile = await fetchProfile(accessToken);
          setProfile(userProfile);
        } catch (err) {
          setError('Failed to authenticate or fetch profile');
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
    };

    initAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Display your Spotify Profile Data</h1>
      {profile && <UserProfile profile={profile} />}
    </div>
  );
}

export default App;
