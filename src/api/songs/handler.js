const { successResponse } = require('../../utils/responses');

class SongsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
    this.postSongHandler = this.postSongHandler.bind(this);
    this.getSongsHandler = this.getSongsHandler.bind(this);
    this.getSongByIdHandler = this.getSongByIdHandler.bind(this);
    this.putSongByIdHandler = this.putSongByIdHandler.bind(this);
    this.deleteSongByIdHandler = this.deleteSongByIdHandler.bind(this);
  }

  async postSongHandler(request, h) {
    this._validator.validateSongPayload(request.payload);
    const {
      title, year, performer, genre, duration,
    } = request.payload;
    const songId = await this._service.addSong({
      title, year, performer, genre, duration,
    });
    return successResponse(h, {
      responseMessage: 'Lagu berhasil ditambahkan',
      responseData: { songId },
      responseCode: 201,
    });
  }

  async getSongsHandler(request, h) {
    const songs = await this._service.getSongs();
    return successResponse(h, {
      responseData: { songs },
    });
  }

  async getSongByIdHandler(request, h) {
    const { id } = request.params;
    const song = await this._service.getSongById(id);
    return successResponse(h, {
      responseData: { song },
    });
  }

  async putSongByIdHandler(request, h) {
    this._validator.validateSongPayload(request.payload);
    const { id } = request.params;
    await this._service.editSongById(id, request.payload);
    return successResponse(h, {
      responseMessage: 'Lagu berhasil diperbarui',
    });
  }

  async deleteSongByIdHandler(request, h) {
    const { id } = request.params;
    await this._service.deleteSongById(id);
    return successResponse(h, {
      responseMessage: 'Lagu berhasil dihapus',
    });
  }
}

module.exports = SongsHandler;
