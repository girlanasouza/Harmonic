import { Request, Response } from "express";
import { IPlaylistDTO, TSongPlaylistDTO } from "./playlist.types";
import playlistService from "./playlist.service";

const createPlaylist = async (req: Request, res: Response) => {
  /**
   #swagger.summary = 'Create a new playlist.'
   #swagger.parameters['obj'] = {
     in: 'body',
     description: 'Playlist information.',
     required: true,
     type: 'json',
     schema: { $ref: "#definitions/IPlaylistDTO" }
   }
   */
  const playListBody = req.body as IPlaylistDTO;

  try {
    const newPlaylist = await playlistService.create(
      playListBody,
      req.session.uid!
    );
    /**
      #swagger.responses[201] = { 
        schema: { "$ref": "#/definitions/Playlist" }, description: "Playlist created." }
     */
    return res.status(201).json(newPlaylist);
  } catch (err) {
    console.log(err);
    /**
      #swagger.responses[500] = {
        schema: {
          type: 'object',
          properties: {
            message: { type: 'string', value: 'Internal Server Error' }
          }
        }
      }
    */
    return res.status(501).json({ error: true });
  }
};

const listAllPlaylists = async (req: Request, res: Response) => {
  /**
    #swagger.summary = 'List all playlists.'
    */
  try {
    const playlists = await playlistService.readMany(req.session.uid!);
    /**
      #swagger.responses[200] = { 
        schema: { "$ref": "#/definitions/PlaylistArray" }, description: "List of playlists." }
     */
    res.status(200).json(playlists);
  } catch (err) {
    console.log(err);
    /**
      #swagger.responses[500] = {
        schema: {
          type: 'object',
          properties: {
            message: { type: 'string', value: 'Internal Server Error' }
          }
        }
      }
    */
    res.status(501).json({ error: true });
  }
};

const readPlaylist = async (req: Request, res: Response) => {
  /**
    #swagger.summary = 'Read a playlist by ID.'
    #swagger.parameters['playlistId'] = {
      in: 'path',
      description: 'Playlist ID.',
      required: true,
      type: 'string'
    }
    #swagger.parameters['simplified'] = {
      in: 'query',
      description: 'Simplified view.',
      required: false,
      type: 'boolean'
    }
    */
  const isSimplified = req.query.simplified === "true" ? true : false;
  const playlistId = req.params.playlistId;

  try {
    const playlists = await playlistService.readUnique(
      playlistId,
      isSimplified
    );
    /**
      #swagger.responses[200] = { 
        schema: { "$ref": "#/definitions/Playlist" }, description: "Playlist details." }
     */
    res.status(200).json(playlists);
  } catch (err) {
    console.log(err);
    /**
      #swagger.responses[500] = {
        schema: {
          type: 'object',
          properties: {
            message: { type: 'string', value: 'Internal Server Error' }
          }
        }
      }
    */
    res.status(501).json({ error: true });
  }
};

const updatePlaylist = async (req: Request, res: Response) => {
  /**
    #swagger.summary = 'Update a playlist by ID.'
    #swagger.parameters['playlistId'] = {
      in: 'path',
      description: 'Playlist ID.',
      required: true,
      type: 'string'
    }
    #swagger.parameters['obj'] = {
      in: 'body',
      description: 'Playlist information.',
      required: true,
      type: 'json',
      schema: { $ref: "#definitions/IPlaylistDTO" }
    }
    */
  const playlistId = req.params.playlistId;
  const body = req.body as IPlaylistDTO;

  try {
    const playlist = await playlistService.update(playlistId, body);
    /**
      #swagger.responses[200] = { 
        schema: { "$ref": "#/definitions/Playlist" }, description: "Playlist updated." }
     */
    res.status(200).json(playlist);
  } catch (err) {
    /**
      #swagger.responses[500] = {
        schema: {
          type: 'object',
          properties: {
            message: { type: 'string', value: 'Internal Server Error' }
          }
        }
      }
    */
    res.status(501).json({ error: true });
  }
};

const removePlaylist = async (req: Request, res: Response) => {
  /**
    #swagger.summary = 'Remove a playlist by ID.'
    #swagger.parameters['playlistId'] = {
      in: 'path',
      description: 'Playlist ID.',
      required: true,
      type: 'string'
    }
    */
  const playlistId = req.params.playlistId;

  try {
    const playlistRemoved = await playlistService.remove(playlistId);
    /**
      #swagger.responses[200] = { 
        schema: { "$ref": "#/definitions/Playlist" }, description: "Playlist removed." }
     */
    res.status(200).json(playlistRemoved);
  } catch (err) {
    console.log(err);
    /**
      #swagger.responses[500] = {
        schema: {
          type: 'object',
          properties: {
            message: { type: 'string', value: 'Internal Server Error' }
          }
        }
      }
    */
    return res.status(501).json({ error: true });
  }
};

const pushMusicPlaylist = async (req: Request, res: Response) => {
  /**
    #swagger.summary = 'Add a song to a playlist.'
    #swagger.parameters['playlistId'] = {
      in: 'path',
      description: 'Playlist ID.',
      required: true,
      type: 'string'
    }
    #swagger.parameters['musicId'] = {
      in: 'path',
      description: 'Music ID.',
      required: true,
      type: 'string'
    }
    */
  const playlistId = req.params.playlistId;
  const musicId = req.params.musicId;

  try {
    const song = await playlistService.insertMusicInPlaylist({
      playlistId,
      musicId,
    } as TSongPlaylistDTO);
    /**
      #swagger.responses[201] = { 
        schema: { "$ref": "#/definitions/SongPlay" }, description: "Song added to playlist." }
     */
    res.status(201).json(song);
  } catch (err) {
    /**
      #swagger.responses[500] = {
        schema: {
          type: 'object',
          properties: {
            message: { type: 'string', value: 'Internal Server Error' }
          }
        }
      }
    */
    res.status(501).json({ error: true });
  }
};

const deleteMusicPlaylist = async (req: Request, res: Response) => {
  /**
    #swagger.summary = 'Remove a song from a playlist.'
    #swagger.parameters['playlistId'] = {
      in: 'path',
      description: 'Playlist ID.',
      required: true,
      type: 'string'
    }
    #swagger.parameters['musicId'] = {
      in: 'path',
      description: 'Music ID.',
      required: true,
      type: 'string'
    }
    */
  const playlistId = req.params.playlistId;
  const musicId = req.params.musicId;

  try {
    const song = await playlistService.removeMusicInPlaylist({
      playlistId,
      musicId,
    } as TSongPlaylistDTO);
    /**
      #swagger.responses[200] = { 
        schema: { "$ref": "#/definitions/SongPlay" }, description: "Song removed from playlist." }
     */
    res.status(200).json(song);
  } catch (err) {
    /**
      #swagger.responses[500] = {
        schema: {
          type: 'object',
          properties: {
            message: { type: 'string', value: 'Internal Server Error' }
          }
        }
      }
    */
    res.status(501).json({ error: true });
  }
};

export default {
  createPlaylist,
  listAllPlaylists,
  pushMusicPlaylist,
  updatePlaylist,
  readPlaylist,
  removePlaylist,
  deleteMusicPlaylist,
};
