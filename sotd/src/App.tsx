import { useEffect, useState, useRef } from 'react';
import { redirectToAuthCodeFlow, getAccessToken } from './authCodeWithPkce';
import { UserProfile } from './components/UserProfile';
import { PlaylistList } from './components/PlaylistList';
import { PlaylistTracks } from './components/PlaylistTracks';

const clientId = '2d8018c829e44cf0830fdde64f1d379b';

async function fetchProfile(accessToken: string): Promise<UserProfile> {
  const result = await fetch('https://api.spotify.com/v1/me', {
    method: 'GET',
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return await result.json();
}

async function fetchPlaylists(accessToken: string): Promise<Playlist[]> {
  const result = await fetch('https://api.spotify.com/v1/me/playlists?limit=50', {
    method: 'GET',
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  const data: PlaylistsResponse = await result.json();
  return data.items;
}

async function fetchPlaylistTracks(accessToken: string, playlistId: string): Promise<PlaylistTrack[]> {
  const result = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  const data: PlaylistTracksResponse = await result.json();
  return data.items;
}

function App() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [selectedPlaylistTracks, setSelectedPlaylistTracks] = useState<PlaylistTrack[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string>('');
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
          const token = await getAccessToken(clientId, code);
          setAccessToken(token);

          const userProfile = await fetchProfile(token);
          setProfile(userProfile);

          const userPlaylists = await fetchPlaylists(token);
          setPlaylists(userPlaylists);
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

  const handleSelectPlaylist = async (playlistId: string) => {
    try {
      const tracks = await fetchPlaylistTracks(accessToken, playlistId);
      setSelectedPlaylistTracks(tracks);
    } catch (err) {
      console.error('Failed to fetch playlist tracks:', err);
    }
  };

  const handleBackToPlaylists = () => {
    setSelectedPlaylistTracks(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Display your Spotify Profile Data</h1>
      {profile && <UserProfile profile={profile} />}

      <hr style={{ margin: '2rem 0' }} />

      {selectedPlaylistTracks ? (
        <PlaylistTracks tracks={selectedPlaylistTracks} onBack={handleBackToPlaylists} />
      ) : (
        <PlaylistList playlists={playlists} onSelectPlaylist={handleSelectPlaylist} />
      )}
    </div>
  );
}

export default App;
