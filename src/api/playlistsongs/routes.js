const routes = (handler) => [
  {
    method: 'POST',
    path: '/playlists/{playlistId}/songs',
    handler: handler.postPlaylistSongsHandler,
    options: {
      auth: 'playlistsapp_jwt',
    },
  },
  {
    method: 'GET',
    path: '/playlists/{playlistId}/songs',
    handler: handler.getPlaylistSongsHandler,
    options: {
      auth: 'playlistsapp_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/playlists/{playlistId}/songs',
    handler: handler.deletePlaylistSongByIdHandler,
    options: {
      auth: 'playlistsapp_jwt',
    },
  },
];

module.exports = routes;
