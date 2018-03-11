/* SUBMITTED TOO EARLY, PLEASE IGNORE UNTIL I DO A RESUBMIT */

let accessToken = '';

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/'); // This clears the parameters, allowing us to grab a new access token when it expires.
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    }
  }

  search(term) {
    const accessToken = getAccessToken();
    fetch(`https://cors-anywhere.herokuapp.com/https://api.spotify.com/v1/search?type=track&q={term}`, {
      headers: {
                Authorization: 'Bearer ' + accessToken
              }
    }).then(response => {
       return response.json();
     }).then(jsonResponse => {
       if (!jsonResponse.tracks) {
         return [];
       }
       return jsonResponse.tracks.items.map(track => ({
         id: track.id,
         name: track.name,
         artist: track.artists[0].name,
         album: track.album.name,
         uri: track.uri
       }));
     });

  savePlaylist(playlistName, trackURIs) {
    if (playlistName.isEmpty() || trackURIs.isEmpty()) {
      return;
    }
      const accessToken = getAccessToken()
      const headers = {Authorization: 'Bearer' + this.accessToken};
      const userID = '';
      fetch('https://api.spotify.com/v1/me', {headers: headers}).then(response => {
        return response.json();
      }).then(jsonResponse => {
        this.userID = jsonResponse.id;
        })
      }
};

export default Spotify;
