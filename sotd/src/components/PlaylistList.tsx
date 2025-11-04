interface PlaylistListProps {
  playlists: Playlist[];
  onSelectPlaylist: (playlistId: string) => void;
}

export function PlaylistList({ playlists, onSelectPlaylist }: PlaylistListProps) {
  return (
    <div>
      <h2>Your Playlists</h2>
      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
        {playlists.map((playlist) => (
          <div
            key={playlist.id}
            onClick={() => onSelectPlaylist(playlist.id)}
            style={{
              cursor: 'pointer',
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '1rem',
              transition: 'transform 0.2s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            {playlist.images[0] && (
              <img
                src={playlist.images[0].url}
                alt={playlist.name}
                style={{ width: '100%', borderRadius: '4px' }}
              />
            )}
            <h3 style={{ margin: '0.5rem 0', fontSize: '1rem' }}>{playlist.name}</h3>
            <p style={{ margin: '0', fontSize: '0.875rem', color: '#666' }}>
              {playlist.tracks.total} tracks
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
