const { successResponse } = require('../../utils/responses');

class CollaborationsHandler {
  constructor(collaborationsService, playlistSongService, validator) {
    this._collaborationsService = collaborationsService;
    this._playlistSongService = playlistSongService;
    this._validator = validator;
    this.postCollaborationHandler = this.postCollaborationHandler.bind(this);
    this.deleteCollaborationHandler = this.deleteCollaborationHandler.bind(this);
  }

  async postCollaborationHandler(request, h) {
    this._validator.validateCollaborationPayload(request.payload);
    const { id: credentialId } = request.auth.credentials;
    const { playlistId, userId } = request.payload;
    await this._playlistSongService.verifyPlaylistSongOwner(playlistId, credentialId);
    const collaborationId = await this._collaborationsService.addCollaboration(playlistId, userId);
    return successResponse(h, {
      responseMessage: 'Kolaborasi berhasil ditambahkan',
      responseData: {
        collaborationId,
      },
      responseCode: 201,
    });
  }

  async deleteCollaborationHandler(request, h) {
    this._validator.validateCollaborationPayload(request.payload);
    const { id: credentialId } = request.auth.credentials;
    const { playlistId, userId } = request.payload;
    await this._playlistSongService.verifyPlaylistSongOwner(playlistId, credentialId);
    await this._collaborationsService.deleteCollaboration(playlistId, userId);
    return successResponse(h, {
      responseMessage: 'Kolaborasi berhasil dihapus',
    });
  }
}

module.exports = CollaborationsHandler;
