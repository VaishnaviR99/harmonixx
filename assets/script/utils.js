import { playTrack, state,renderQueueDetails } from "./state.js";

// const apiKey = "aed211f198msh3645671540a1527p1ca157jsnb001a26204f4";
const apiKey="1cad77959amsh2a02367560b6f60p1552aajsn5d7084ce92ba"
export const artists2 = [
  {
    id: "484568188",
    name: "Arijit Singh",
    avatar:
      "https://i.pinimg.com/736x/e8/d0/9d/e8d09dc7491d9801c8edb409a40186c7.jpg",
  },

  {
    id: "300187267",
    name: "Atif Aslam & Pritam",
    avatar:
      "https://i.pinimg.com/564x/cb/2d/7e/cb2d7e9c346f7fe26bf024384a01e37e.jpg",
  },

  {
    id: "19715559",
    name: "Shreya Ghoshal",
    avatar:
      "https://images.filmibeat.com/img/popcorn/profile_photos/shreya-ghoshal-20200310110649-360.jpg",
  },

  {
    id: "1465633100",
    name: "Neha Kakkar",
    avatar:
      "https://i.pinimg.com/736x/2c/bf/1a/2cbf1afc389026fac595620eeda39e0b.jpg",
  },

  {
    id: "214832525",
    name: "Badshah",
    avatar: "https://cdn.platinumlist.net/upload/artist/badshah_83-orig.jpg",
  },

  {
    id: "18056658",
    name: "Sonu Nigam",
    avatar:
      "https://i.pinimg.com/474x/f6/a2/fd/f6a2fd6dae2b2937e79f2e3a64d0ab84.jpg",
  },

  {
    id: "258287474",
    name: "Armaan Malik",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgUnU7EuKgUtFgO4a0AVBX-MzVIRc0-V4QgvLk7JfKYikvBp54_4wk6etYt0WkGE9VHNM&usqp=CAU",
  },

  {
    id: "3916202352",
    name: "Jubin Nautiyal",
    avatar:
      "https://i.pinimg.com/1200x/9d/e0/75/9de075ff9b4bf735ed3583678a311ccb.jpg",
  },

  {
    id: "479406160",
    name: "Yo Yo Honey Singh",
    avatar:
      "https://i.pinimg.com/736x/51/c2/1f/51c21f50318f6f750aecfd5d78a0a0a3.jpg",
  },
];
const artists1 = [
  {
    id: "159260351",
    name: "Taylor Swift",
    avatar: "https://images6.alphacoders.com/102/1020727.jpg",
  },
  {
    id: "479756766",
    name: "The Weeknd",
    avatar:
      "https://c4.wallpaperflare.com/wallpaper/164/638/433/the-weeknd-wallpaper-preview.jpg",
  },
  {
    id: "1419227",
    name: "Beyonce",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMF5iEnH4eq1PLf7DzMZyJCcSG1sgVKxrAUJ8W2B2npgQnA9Xs7XmEFht4whUWGv-Zv3U&usqp=CAU",
  },
  {
    id: "271256",
    name: "Drake",
    avatar:
      "https://wallsdesk.com/wp-content/uploads/2016/04/Drake-Desktop-for-iphone.jpg",
  },
  {
    id: "183313439",
    name: "Ed Sheeran",
    avatar:
      "https://w0.peakpx.com/wallpaper/64/489/HD-wallpaper-ed-sheeran-2018-laptop-full-background-and.jpg",
  },
  {
    id: "137057909",
    name: "Miley Cyrus",
    avatar: "https://images4.alphacoders.com/953/953670.jpg",
  },
  {
    id: "280215834",
    name: "Selena Gomez",
    avatar: "https://i.redd.it/67gjuwy0roe51.jpg",
  },
  {
    id: "336249253",
    name: "Charlie Puth",
    avatar:
      "https://i.pinimg.com/originals/26/bb/dd/26bbdd7afc342441958102be94e1a44b.jpg",
  },
  {
    id: "64387566",
    name: "Katy Perry",
    avatar: "https://images7.alphacoders.com/380/380185.jpg",
  },
];

//fetching search query data
export async function fetchShazamData(query) {
  const apiKey = "1cad77959amsh2a02367560b6f60p1552aajsn5d7084ce92ba";
  const shazamApiUrl = `https://shazam.p.rapidapi.com/search?term=${query}&locale=en-US&offset=0&limit=6`;

  try {
    const response = await fetch(shazamApiUrl, {
      method: "GET",
      headers: {
        "x-rapidapi-key": apiKey,
        "x-rapidapi-host": "shazam.p.rapidapi.com",
      },
    });

    return response.json();
  } catch (error) {
    console.error("Error fetching data from Shazam:", error);
    return null;
  }
}

//fetching artists track according to artists id
export async function fetchArtistTopTracks(artistId) {
  const apiKey = "1cad77959amsh2a02367560b6f60p1552aajsn5d7084ce92ba";
  const shazamApiUrl = `https://shazam.p.rapidapi.com/artists/get-top-songs?id=${artistId}&l=en-US`;

  try {
    const response = await fetch(shazamApiUrl, {
      method: "GET",
      headers: {
        "x-rapidapi-key": apiKey,
        "x-rapidapi-host": "shazam.p.rapidapi.com",
      },
    });

    return response.json();
  } catch (error) {
    console.error("Error fetching artist top tracks:", error);
    return null;
  }
}

//function to render artists cards
export function createArtistCards(artists = artists1, id = "#artistsTopSong") {
  const artistsContainer = $(id);
  artistsContainer.empty();

  artists.forEach((artist) => {
    const artistCard = $(`
        <div class="ArtistCard" data-id="${artist.id}">
          <img src="${artist.avatar}" alt="${artist.name}" >
          <p>${artist.name}</p>
          <button class="play-btn">
          <i class="fa-solid fa-play"></i>
        </button>
        </div>
      `);

    artistCard.on("click", () => {
      showArtistTracks(artist.id, artist.avatar, artist.name);
    });

    artistsContainer.append(artistCard);
  });
}

//fucntion to create playslists cards
export function createAlbumCard(album) {
  const albumCard = $(`
    <div class="album-card">
      <img src="${album.albumImg}" alt="${album.albumName}">
      <p>${album.albumName}</p>
      <button class="play-btn">
        <i class="fa-solid fa-play"></i>
      </button>
    </div>
  `);

  albumCard.on("click", () => {
    $("#artistsTrackcontainer").empty();
    showTracks(album.tracks);
  });

  return albumCard;
}

//function to render artists track cards
async function showArtistTracks(artistId, avatar, name) {
  const tracks = await fetchArtistTopTracks(artistId);
  const TrackContainer = $("#trackContainer");
  $("#homeContent").hide();
  TrackContainer.show();

  if (tracks.data.length > 0) {
    $("#artistsTrackcontainer").empty();
    $("#artistsTrackcontainer").append(`
      <div class="artistTitle">
        <img src="${avatar}" alt="${name}" height="100px" width="100px">
        <h1>${name}</h1>
      </div>
      <div id="tracks-container"></div>
    `);

    const tracksContainer = $("#tracks-container");
    state.queue = tracks.data.map((track) => track.attributes.previews[0].url);
    state.queueDetails = tracks.data.map((track) => ({
      img: track.attributes.artwork.url.replace("{w}x{h}", "100x100"),
      name: track.attributes.name,
      artist: track.attributes.artistName,
      url: track.attributes.previews[0].url
    }));
    state.currentTrackIndex = 0;

    tracks.data.forEach((track, index) => {
      const trackCard = $(`
        <div class="TrackCard" key=${track.id}>
          <img src="${track.attributes.artwork.url.replace("{w}x{h}", "100x100")}" alt="${track.attributes.name}">
          <div class="songDetail">
            <h4>${track.attributes.name}</h4>
            <p>by ${track.attributes.artistName}</p>
          </div>
         
        </div>
      `);

      trackCard.click(() => {
        state.currentTrackIndex = index;
        renderQueueDetails()
        playTrack(state.queue[state.currentTrackIndex]);
        
      });

      tracksContainer.append(trackCard);
    });

    // Autoplay the first track
    // if (state.queue.length > 0) {
    //   playTrack(state.queue[0]);
     
    // }
  } else {
    TrackContainer.append(`<p>Unable to fetch tracks</p>`);
  }
}

//function to render playlists track cards
function showTracks(tracks) {
  const tracksContainer = $("#trackContainer");
  $("#homeContent").hide();

  tracksContainer.show();
  state.queue = tracks.map((track) => track.uri);
  state.queueDetails = tracks.map((track) => ({
    img: track.avatar,
    name: track.trackName,
    artist: track.singerName,
    url: track.uri
  }));
  state.currentTrackIndex = 0;
  // console.log(state.queue);

  tracks.forEach((track, index) => {
    const trackCard = $(`
      <div class="TrackCard">
        <img src="${track.avatar}" alt="${track.trackName}">
        <div class="songDetail">
          <h4>${track.trackName}</h4>
          <p>by ${track.singerName}</p>
        </div>
      </div>
    `);

    trackCard.on("click", () => {
      state.currentTrackIndex = index;
      renderQueueDetails()
      playTrack(track.uri);
    });

    $("#artistsTrackcontainer").append(trackCard);
  });

  // Autoplay the first track
  // if (tracks.length > 0) {
  //   setTimeout(() => {
  //     playTrack(tracks[0].uri);
     
  //   }, 1000);
  // }
}

//fetch playlist data from db.json
export async function fetchPlaylistData() {
  try {
    const response = await fetch("../script/db.json");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return { popularAlbums: [], playlists: [] };
  }
}
