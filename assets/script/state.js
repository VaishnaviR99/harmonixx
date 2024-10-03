

export const state = {
  queue: [],
  queueDetails: [], 
  likedTracks: {},
  currentTrackIndex: 0,
  audioPlayer: null,
  playPauseButton: null,
};

export function playTrack(url) {
  console.log("Playing track:", url);
  state.audioPlayer.src = url;
  state.audioPlayer.play();
    state.playPauseButton.html('<i class="fas fa-pause"></i>');
  updatePlayingEffect();
}

export function updatePlayingEffect() {
  $(".TrackCard").removeClass("playing");

  if (state.currentTrackIndex >= 0 && state.currentTrackIndex < state.queue.length) {
    const currentTrackUrl = state.queue[state.currentTrackIndex];

    const playingCard = $(".TrackCard").filter(function() {
      return $(this).find('img').attr('src').includes(currentTrackUrl.split('/').pop());
    });

    if (playingCard.length) {
      playingCard.addClass("playing");
    }
  }
}


function getUserId() {
  let loggedUser = JSON.parse(localStorage.getItem("harmoniX_loggedInUser"));
  return loggedUser.id; 
}


export function renderQueueDetails() {
  const playlistContainer = document.getElementById('playlist-items');
  playlistContainer.innerHTML = '';

  state.queueDetails.forEach((track, index) => {
    const trackCard = document.createElement('div');
    trackCard.classList.add('TrackCard');
    trackCard.dataset.trackUrl = track.url;

    const userId = getUserId(); 

    const liked = isLikedTrack(track.url, userId); 
    const heartClass = liked ? 'fa-solid fa-heart heart-icon liked active' : 'fa-regular fa-heart heart-icon liked';

    trackCard.innerHTML = `
      <img src="${track.img}" alt="${track.name}">
      <div class="songDetail">
        <h4>${track.name}</h4>
        <p>by ${track.artist}</p>
      </div>
      <i class="${heartClass}"></i>
    `;

    const heartIcon = trackCard.querySelector('.heart-icon');

    heartIcon.addEventListener('click', () => {
      event.stopPropagation(); 
      const likedTrackData = {
        img: track.img,
        name: track.name,
        artist: track.artist,
        url: track.url,
      };
      toggleLikedTrack(likedTrackData, userId, heartIcon);
    });
    trackCard.addEventListener('click', () => {
      state.currentTrackIndex = index;
      playTrack(track.url);
    });
    if (track.url === state.currentTrack) {
      trackCard.classList.add('playing');
    }

    playlistContainer.appendChild(trackCard);
  });
}
export function isLikedTrack(trackUrl, userId) {
  return state.likedTracks[userId] && state.likedTracks[userId].some(likedTrack => likedTrack.url === trackUrl);
}
export function toggleLikedTrack(likedTrackData, userId, heartIcon) {
  console.log('toggleLikedTrack', heartIcon);
  if (!state.likedTracks[userId]) {
    state.likedTracks[userId] = [];
  }

  const existingIndex = state.likedTracks[userId].findIndex(likedTrack => likedTrack.url === likedTrackData.url);

  if (existingIndex !== -1) { 
    state.likedTracks[userId].splice(existingIndex, 1);
    heartIcon.classList.remove('fa-solid', 'active');
    heartIcon.classList.add('fa-regular');
  } else { 
    state.likedTracks[userId].push(likedTrackData);
    heartIcon.classList.remove('fa-regular');
    heartIcon.classList.add('fa-solid', 'active');
  }

  localStorage.setItem('likedTracks', JSON.stringify(state.likedTracks));
}
function loadLikedTracks() {
  const likedTracks = localStorage.getItem('likedTracks');
  if (likedTracks) {
    state.likedTracks = JSON.parse(likedTracks);
  }
}


loadLikedTracks();