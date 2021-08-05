const { successResponse } = require('../../utils/responses');

class PlaylistsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
    this.postPlaylistsHandler = this.postPlaylistsHandler.bind(this);
    this.getPlaylistsHandler = this.getPlaylistsHandler.bind(this);
    this.deletePlaylistByIdHandler = this.deletePlaylistByIdHandler.bind(this);
  }

  async postPlaylistsHandler(request, h) {
    this._validator.validatePlaylistPayload(request.payload);
    const { name } = request.payload;
    const { id: credentialId } = request.auth.credentials;
    const playlistId = await this._service.addPlaylist({
      name,
      owner: credentialId,
    });
    return successResponse(h, {
      responseMessage: 'Playlist berhasil ditambahkan',
      responseData: {
        playlistId,
      },
      responseCode: 201,
    });
  }

  async getPlaylistsHandler(request, h) {
    const { id: credentialId } = request.auth.credentials;
    const playlists = await this._service.getPlaylists(credentialId);
    return successResponse(h, {
      responseData: { playlists },
    });
  }

  async deletePlaylistByIdHandler(request, h) {
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;
    await this._service.verifyPlaylistOwner(id, credentialId);
    await this._service.deletePlaylistById(id, credentialId);
    return successResponse(h, {
      responseMessage: 'Playlist berhasil dihapus',
    });
  }
}

module.exports = PlaylistsHandler;
