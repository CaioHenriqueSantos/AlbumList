import fetch from 'node-fetch'

const clientId = '4607e8124051466cabc22cdfba7635d8';
const clientSecret = '8292a00bc4eb4e38999104e79151eb88';
const albumId = '2UkBU2McOTulQ1Ki7OwDIw'
const playlistId = '37i9dQZF1DXd30i5K7UVpZ'

const getToken = async () => {
    const result = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded', 
            'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret)
        },
             body: 'grant_type=client_credentials'
    });
    const data = await result.json();
    return data.access_token;
}

const getAlbum = async (token, albumId )=>{

    const result = await fetch(`https://api.spotify.com/v1/albums/${albumId}/tracks?market=BR&limit=4`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}

    });
    const data = await result.json();
    return data.items;
    
}
const getPlaylist = async (token, playlistId )=>{

    const result = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?market=BR&limit=4`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}

    });
    const data = await result.json();
    return data.items;
    
}

const getTrack = async(token, trackId)=>{
    const result = await fetch(`https://api.spotify.com/v1/tracks/${trackId}?market=BR`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}

    });
    const data = await result.json();
    return data;
}


(async()=>{

    const token = await getToken()
    const album = await getAlbum(token, albumId)
    const playlist = await getPlaylist(token, playlistId)
    const track = await Promise.all(album.map(async ({id}) => {
        const test = await getTrack(token, id);
        return test
      }))


console.log({album: album, playlist: playlist, track: track})
})()