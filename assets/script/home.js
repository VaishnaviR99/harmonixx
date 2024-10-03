import { createArtistCards, artists2, fetchPlaylistData, createAlbumCard } from "./utils.js";

export function initializeHomeTab() {
  $("#mainContent").load("./HomeTab.html", function() {
    createArtistCards();
    createArtistCards(artists2, "#bTopSong");

    async function loadPlaylistsAndAlbums() {
      const data = await fetchPlaylistData();
      const popularAlbums = data.popularAlbums;
      const playlists = data.playlists;

      renderPopularAlbums(popularAlbums);
      renderPlaylists(playlists);
    }

    function renderPopularAlbums(albums) {
      const topAlbumsContainer = $("#topAlbums");
      topAlbumsContainer.empty();
      albums.forEach((album) => {
        const albumCard = createAlbumCard(album);
        topAlbumsContainer.append(albumCard);
      });
    }

    function renderPlaylists(playlists) {
      const playlistsContainer = $("#playlists");
      playlistsContainer.empty();
      playlists.forEach((playlist) => {
        const albumCard = createAlbumCard(playlist);
        playlistsContainer.append(albumCard);
      });
    }
  

    $("#backBtn").click(() => {
      $("#trackContainer").hide();
      $("#homeContent").show();
    });

    $(".view-all").click(function () {
      const targetSection = $(this).data("target");
      const isViewAll = $(this).text() === "View All";
      const cardSelector = ".ArtistCard, .album-card"; 
    
      const cardsToShow = getCardsToShowBasedOnScreenSize();
      if (isViewAll) {
       
        $(`${targetSection} .ArtistCard:nth-child(n + ${cardsToShow}), ${targetSection} .album-card:nth-child(n + 3)`).fadeIn();
     
      $(this).text("View Less");
      } else {
       
        $(`${targetSection} .ArtistCard:nth-child(n + ${cardsToShow}), ${targetSection} .album-card:nth-child(n + 3)`).fadeOut();
       
        $(this).text("View All");
      }
      });
    
    
    
    function getCardsToShowBasedOnScreenSize() {
      const width = $(window).width();
      if (width <=  480) {
        return 3;
      } else if (width <= 769) {
        return 4; 
      } else {
        return 5; 
      }
    }

    loadPlaylistsAndAlbums();
  });
}
