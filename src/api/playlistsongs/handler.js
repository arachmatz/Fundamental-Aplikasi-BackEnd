const { successResponse } = require('../../utils/responses');

class PlaylistSongsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
    this.postPlaylistSongsHandler = this.postPlaylistSongsHandler.bind(this);
    this.getPlaylistSongsHandler = this.getPlaylistSongsHandler.bind(this);
    this.deletePlaylistSongByIdHandler = this.deletePlaylistSongByIdHandler.bind(this);
  }

  async postPlaylistSongsHandler(request, h) {
    this._validator.validatePlaylistSongPayload(request.payload);
    const { id: credentialId } = request.auth.credentials;
    const { songId } = request.payload;
    const { playlistId } = request.params;
    await this._service.verifyPlaylistSongAccess(playlistId, credentialId);
    await this._service.verifyNewPlaylistSongs(songId, playlistId);
    const playlistid = await this._service.addPlaylistSong({
      playlistId,
      songId,
    });
    return successResponse(h, {
      responseMessage: 'Lagu berhasil ditambahkan ke playlist',
      responseData: {
        playlistid,
      },
      responseCode: 201,
    });
  }

  async getPlaylistSongsHandler(request, h) {
    const { playlistId } = request.params;
    const { id: credentialId } = request.auth.credentials;
    await this._service.verifyPlaylistSongAccess(playlistId, credentialId);
    const songs = await this._service.getPlaylistSongs(playlistId);
    return successResponse(h, {
      responseData: { songs },
    });
  }

  async deletePlaylistSongByIdHandler(request, h) {
    const { playlistId } = request.params;
    const { songId } = request.payload;
    const { id: credentialId } = request.auth.credentials;
    await this._service.verifyPlaylistSongAccess(playlistId, credentialId);
    await this._service.deletePlaylistSongById(playlistId, songId);
    return successResponse(h, {
      responseMessage: 'Lagu berhasil dihapus dari playlist',
    });
  }
}

module.exports = PlaylistSongsHandler;
