// Replace with your own Client ID and Client Secret from Spotify Developer Dashboard
const CLIENT_ID = '7418d7de911f4199b956037a647d8a95';
const CLIENT_SECRET = '53137b551cca47ee94c54862d31cf4d6';

let accessToken = '';
let currentTrackUri = '';

// 1. Get access token
async function getAccessToken() {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
    },
    body: 'grant_type=client_credentials'
  });
  
  const data = await response.json();
  accessToken = data.access_token;
}

// 2. Search for a track
async function searchTrack() {
  const query = document.getElementById('track-search').value;
  const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=1`, {
    headers: {
      'Authorization': 'Bearer ' + accessToken
    }
  });
  
  const data = await response.json();
  if (data.tracks.items.length > 0) {
    const track = data.tracks.items[0];
    currentTrackUri = track.uri;
    document.getElementById('track-name').innerText = `Track Name: ${track.name}`;
    document.getElementById('artist-name').innerText = `Artist: ${track.artists[0].name}`;
  } else {
    alert("No track found");
  }
}

// 3. Play the track (opens Spotify client)
function playTrack() {
  if (currentTrackUri) {
    window.open(`https://open.spotify.com/track/${currentTrackUri.split(':')[2]}`, '_blank');
  } else {
    alert("No track selected");
  }
}

// Initialize by getting the access token
getAccessToken();
