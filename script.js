const token ='BQBzby_TiV7uiD7X79QZxhnctY8y-tbOVVGYjt2y8ao0LX56j0oEZmFS8sq9EuSZd1GKy6kW3LhGjZWcoHBcoZ_tNbp2bXZPxn4M5oLDqC-Aoj4HATH3mByjp7x2JIbU4Ckp5OZhsj6YYIVJ3Gj3Rz9Hs6tEhITX4itnrHyj74LgGRjecjVOSjEE0ByWF40vwz50aRtUAd8-Gk-7FLlu0KeE9w6Pk9oDb7EJo-3eWPjQy7kUvwiyeyVu-NkGBWIIm0c5vLhtZ0dGWv2kU0zrt66o';
const artistIds = [
  "0z4uBJEzO1dJy57Qk5UYt8",
  "5vLdHmvJWtkYmWAGNk5nNa",
  "1I9Hqy4QnMyVhZwRM2r41B",
  "2VzNhLa3iGSwWttS4n1kbB",
  "6DVVsQAnpHdJjb1nYuOQ6g",
  "49bzE5vRBRIota4qeHtQM8",
  "7ucOhItVkxNqunNLo8AkzN",
];

const url = `https://api.spotify.com/v1/artists?ids=${artistIds.join("%2C")}&include_groups=album,single`;

async function fetchArtistData() {
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.status}`);
    }

    const { artists } = await response.json();
    const artistList = document.getElementById("artist-list");

    artists.forEach((artist) => {
      const artistCard = createArtistCard(artist);
      artistList.appendChild(artistCard);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

function createArtistCard(artist) {
  const artistCard = document.createElement("div");
  artistCard.classList.add("artist-card");

  const artistImage = document.createElement("img");
  artistImage.src = artist.images[0].url;

  const artistName = document.createElement("div");
  artistName.classList.add("artist-name");
  artistName.textContent = artist.name;

  const artistGenres = document.createElement("div");
  artistGenres.classList.add("artist-genres");
  artistGenres.textContent = artist.genres.join(", ");

  const artistAlbums = document.createElement("div");
  artistAlbums.classList.add("artist-albums");

  // Fetch artist's albums and append them
  fetchArtistAlbums(artist.id, artistAlbums);

  artistCard.appendChild(artistImage);
  artistCard.appendChild(artistName);
  artistCard.appendChild(artistGenres);
  artistCard.appendChild(artistAlbums);

  return artistCard;
}

async function fetchArtistAlbums(artistId, artistAlbums) {
  try {
    const albumsResponse = await fetch(
      `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album,single`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (albumsResponse.ok) {
      const albumsData = await albumsResponse.json();
      const albums = albumsData.items;

      albums.forEach((album) => {
        const albumName = document.createElement("div");
        albumName.textContent = album.name;
        artistAlbums.appendChild(albumName);
      });
    } else {
      console.error(`Error fetching albums for artist ${artistId}: ${albumsResponse.statusText}`);
    }
  } catch (error) {
    console.error('Error fetching albums:', error);
  }
}

fetchArtistData();