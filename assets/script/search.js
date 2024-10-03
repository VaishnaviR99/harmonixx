import { fetchShazamData, fetchArtistTopTracks } from "./utils.js";
import { state, playTrack, renderQueueDetails } from './state.js';

$(() => {

  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), delay);
    };
  };

  const debouncedSearch = debounce(async (query) => {
    if (!query) {
      $("#initialContent").show();
      return;
    }

    const data = await fetchShazamData(query);
    if (data) {
      renderResults(data);
    }
  }, 200);

  // Search input event handler
  $("#searchInput").on("input", function () {
    $("#initialContent").hide();
    const query = $(this).val();
    debouncedSearch(query);
  });

  $("#clear").click(function () {
    $("#searchInput").val("");
    $("#clear").hide();
    $("#music-container").empty();
    $("#initialContent").show();
  });

  function renderResults(data) {
    const resultsContainer = $("#music-container");
    resultsContainer.empty();
    $("#clear").show();
    if (data.tracks.hits.length) {
      resultsContainer.append("<h2>Tracks</h2>");
      data.tracks.hits.forEach((hit) => {
        const track = hit.track;

        const trackCard = $(`
                    <div class="TrackCard" key=${hit.key}>
                        <img src="${track.images.coverart}" alt="${track.title}">
                        <div class="songDetail">
                        <h4>${track.title}</h4>
                        <p>by ${track.subtitle}</p>
                        </div>
                    </div>
                `);
        trackCard.on("click", function () {
          // Clear current queue and add only the clicked track
          state.queue = [track.hub.actions[1].uri];
          state.queueDetails = [{
            img: track.images.coverart,
            name: track.title,
            artist: track.subtitle,
            url: track.hub.actions[1].uri
          }];
          state.currentTrackIndex = 0;
          playTrack(state.queue[0]);
          renderQueueDetails();
        });
        resultsContainer.append(trackCard);
      });
    }

    if (data.artists.hits.length) {
      resultsContainer.append("<h2>Artists</h2>");
      data.artists.hits.forEach((hit) => {
        const artist = hit.artist;

        const artistCard = $(`
                    <div class="ArtistsCard" key=${hit.artist.adamid}>
                        <img src="${artist.avatar}" alt="${artist.name}">
                        <h3>${artist.name}</h3>
                    </div>
                `);
        artistCard.on("click", function () {
          showArtistTracks(artist.adamid, artist.avatar);
        });
        resultsContainer.append(artistCard);
      });
    }
  }

  async function showArtistTracks(artistId, avatar) {
    const tracks = await fetchArtistTopTracks(artistId);
    $("#artists-container").show();
    $("#searchContentWrapper").hide();

    if (tracks) {
      const container = $("#artists-container");
      container.empty();
      $("#artists-container").append(`<div id="backBtn">
        <i class="fa-solid fa-chevron-left"></i><p>Back</p>
        </div>`)
      container.append(`
        <div class="artistTitle">
          <img src="${avatar}" alt="${tracks.data[0].attributes.artistName}">
          <h1>${tracks.data[0].attributes.artistName}</h1>
        </div>
        <div id="tracks-container"></div>
      `);

      const tracksContainer = $("#tracks-container");
      state.queue = tracks.data.map(track => track.attributes.previews[0].url);
      state.queueDetails = tracks.data.map((track) => ({
        img: track.attributes.artwork.url.replace("{w}x{h}", "100x100"),
        name: track.attributes.name,
        artist: track.attributes.artistName,
        url: track.attributes.previews[0].url
      }));

      state.currentTrackIndex = 0;
      renderQueueDetails();
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
          playTrack(state.queue[state.currentTrackIndex]);
          renderQueueDetails();
        });

        $("#backBtn").click(() => {
          $("#artists-container").hide();
          $("#artists-container").empty();
          // state.audioPlayer.pause();

          $("#searchContentWrapper").show();
        });

        tracksContainer.append(trackCard);
      });

      // Autoplay the first track
      if (state.queue.length > 0) {
        playTrack(state.queue[0]);
      }
    }
  }

});
