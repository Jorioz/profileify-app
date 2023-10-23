
export const authEndpoint = "https://accounts.spotify.com/authorize"; //Login button brings you to Spotify Authorization

const redirectUri = "http://localhost:3000"; // Redirects to localhost:3000 after login

const clientId = "6903b7a50df04cda8cb865d9b7bb2964"; // Client ID from Spotify Developer Dashboard

const scopes = [
    "user-read-playback-state",
    "user-read-currently-playing",
    "playlist-read-private",
    "user-follow-read",
    "user-top-read",
    "user-read-recently-played",
    "user-library-read",
];

export const getTokenFromUrl = () => {
    return window.location.hash
    .substring(1)
    .split('&')
    .reduce((initial, item) =>{
        var parts = item.split('=');
        initial[parts[0]] = decodeURIComponent(parts[1]);

        return initial;
    }, {});
};


//Login URL for Spotify Authorization
export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`; 