interface PlaylistTracksProps {
  tracks: PlaylistTrack[];
  onBack: () => void;
}

function formatDuration(ms: number): string {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export function PlaylistTracks({ tracks, onBack }: PlaylistTracksProps) {
  return (
    <div>
      <button onClick={onBack} style={{ marginBottom: '1rem', padding: '0.5rem 1rem', cursor: 'pointer' }}>
        ← Back to Playlists
      </button>
      <h2>Playlist Tracks</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {tracks.map((item, index) => (
          <div
            key={item.track.id + index}
            style={{
              display: 'flex',
              gap: '1rem',
              padding: '0.75rem',
              border: '1px solid #eee',
              borderRadius: '4px',
              alignItems: 'center',
            }}
          >
            {item.track.album.images[0] && (
              <img
                src={item.track.album.images[0].url}
                alt={item.track.album.name}
                style={{ width: '50px', height: '50px', borderRadius: '4px' }}
              />
            )}
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 'bold' }}>
                <a
                  href={item.track.external_urls.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#1DB954', textDecoration: 'none' }}
                >
                  {item.track.name}
                </a>
              </div>
              <div style={{ fontSize: '0.875rem', color: '#666' }}>
                {item.track.artists.map((artist) => artist.name).join(', ')} • {item.track.album.name}
              </div>
            </div>
            <div style={{ color: '#666', fontSize: '0.875rem' }}>
              {formatDuration(item.track.duration_ms)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
