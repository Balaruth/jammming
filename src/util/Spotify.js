let accessToken = '5c15285e244e446aa7f28b97e36499c5';
const clientId = '4b06acf2f66d4126a0424d4d95d0813b';
const redirectUri = 'http://localhost:3000/';

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
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    }
  },

  search(term) {
    const accessToken = this.getAccessToken();
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
  },

  savePlaylist(playlistName, trackURIs) {
    if (playlistName.isEmpty() || trackURIs.isEmpty()) {
      return;
    }
      const accessToken = this.getAccessToken()
      const headers = {Authorization: 'Bearer' + this.accessToken};
      const userID = '';
      fetch('https://api.spotify.com/v1/me', {headers: headers}).then(response => {
        return response.json();
      }).then(jsonResponse => {
        this.userID = jsonResponse.id;
        })

      fetch(`https://api.spotify.com/v1/users/{user_id}/playlists`, {
        headers: {
          'Authorization': 'Bearer ' + accessToken
        },
        method: 'POST',
        contentType: 'application/json',
        body: JSON.stringify({name: `${playlistName}`})
      }).then(response => {
          return response.json();
      }).then(jsonResponse => {
        const playlistID = jsonResponse.id;
      })

      fetch(`https://api.spotify.com/v1/users/{user_id}/playlists/{playlist_id}/tracks`, {
        headers: {
          'Authorization': 'Bearer ' + accessToken
        },
        method: 'POST',
        contentType: 'application/json',
        body: JSON.stringify({name: `${trackURIs}`})
      }).then(response => {
          return response.json();
      }).then(jsonResponse => {
        const playlistID = jsonResponse.id;
      })
  }
}

export default Spotify;
