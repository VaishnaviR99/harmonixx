import { state, playTrack, updatePlayingEffect } from './state.js';

$(document).ready(function () {
  state.audioPlayer = $("#audioPlayer")[0];
  state.playPauseButton = $("#playPauseButton");
  const seekBar = $("#seekBar");
  const currentTimeDisplay = $("#currentTime");
  const durationDisplay = $("#duration");

  state.playPauseButton.on("click", function () {
    if (state.audioPlayer.paused) {
      state.audioPlayer.play();
      $(this).html('<i class="fas fa-pause"></i>');
    } else {
      state.audioPlayer.pause();
      $(this).html('<i class="fas fa-play"></i>');
    }
  });

  $("#prevButton").on("click", function () {
    if (state.currentTrackIndex > 0) {
      state.currentTrackIndex--;
      playTrack(state.queue[state.currentTrackIndex]);
    }
  });

  $("#nextButton").on("click", function () {
    if (state.currentTrackIndex < state.queue.length - 1) {
      state.currentTrackIndex++;
      playTrack(state.queue[state.currentTrackIndex]);
    }
  });

  state.audioPlayer.addEventListener("timeupdate", function () {
    seekBar.val((state.audioPlayer.currentTime / state.audioPlayer.duration) * 100);
    currentTimeDisplay.text(formatTime(state.audioPlayer.currentTime));
  });

  state.audioPlayer.addEventListener("durationchange", function () {
    durationDisplay.text(formatTime(state.audioPlayer.duration));
  });

  state.audioPlayer.addEventListener("ended", function () {
    if (state.currentTrackIndex < state.queue.length - 1) {
      state.currentTrackIndex++;
      playTrack(state.queue[state.currentTrackIndex]);
    } else {
      state.playPauseButton.html('<i class="fas fa-play"></i>');
    }
  });

  seekBar.on("input", function () {
    state.audioPlayer.currentTime = (seekBar.val() / 100) * state.audioPlayer.duration;
  });

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  }
});
