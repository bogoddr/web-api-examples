interface UserProfile {
    country: string;
    display_name: string;
    email: string;
    explicit_content: {
        filter_enabled: boolean,
        filter_locked: boolean
    },
    external_urls: { spotify: string; };
    followers: { href: string; total: number; };
    href: string;
    id: string;
    images: Image[];
    product: string;
    type: string;
    uri: string;
}

interface Image {
    url: string;
    height: number;
    width: number;
}

interface Playlist {
    id: string;
    name: string;
    description: string | null;
    images: Image[];
    tracks: {
        href: string;
        total: number;
    };
    owner: {
        display_name: string;
        id: string;
    };
    public: boolean;
    collaborative: boolean;
}

interface PlaylistsResponse {
    items: Playlist[];
    total: number;
    limit: number;
    offset: number;
    next: string | null;
    previous: string | null;
}

interface Track {
    id: string;
    name: string;
    artists: Array<{
        name: string;
        id: string;
    }>;
    album: {
        name: string;
        images: Image[];
    };
    duration_ms: number;
    external_urls: {
        spotify: string;
    };
}

interface PlaylistTrack {
    added_at: string;
    track: Track;
}

interface PlaylistTracksResponse {
    items: PlaylistTrack[];
    total: number;
    limit: number;
    offset: number;
    next: string | null;
    previous: string | null;
}
