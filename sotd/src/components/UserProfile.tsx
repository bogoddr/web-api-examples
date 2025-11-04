interface UserProfileProps {
  profile?: UserProfile;
}

export function UserProfile({ profile }: UserProfileProps) {
  if (!profile) return <p>no profile</p>
  return (
    <section id="profile">
      <h2>Logged in as {profile.display_name}</h2>
      {profile.images && profile.images.length > 0 && (
        <img
          id="avatar"
          width="200"
          src={profile.images[0].url}
          alt={`${profile.display_name}'s avatar`}
        />
      )}
      <ul>
        <li>User ID: {profile.id}</li>
        <li>Email: {profile.email}</li>
        <li>
          Spotify URI: <a href={profile.external_urls.spotify}>{profile.uri}</a>
        </li>
        <li>
          Link: <a href={profile.href}>{profile.href}</a>
        </li>
        {profile.images && profile.images.length > 0 && (
          <li>Profile Image: {profile.images[0].url}</li>
        )}
      </ul>
    </section>
  );
}
