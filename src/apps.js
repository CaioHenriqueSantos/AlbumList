const APIController = (function() {

    const clientid = '';
    const clientSecret = '';

    // private methods
    const _getToken = async () => {

        const result = await fetch('https://acounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded',
                'Authorization' : 'Basic' + btoa(clientid + ':' + clientSecret)
            },
            body: 'grant_type=client_credentials'
        });

        const data = await result.json()
        return data.acess_token;
    }

    const _getAlbum = async (token, albumId) => {

        const limit = 4;

        const result = await fetch(`https://api.spotify.com/v1/albums/2UkBU2McOTulQ1Ki7OwDIw`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });
        
        const data = await result.json();
        return data

    }

})();