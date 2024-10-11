import { Request, Response } from "express";
import musicService from "./music.service";
import { ISearchMusic } from "./music.types";
import fsPromises from "fs/promises";
import fs from "fs";

export interface IstreamingMusicParams {
  id: string;
}

const streamingMusic = async (req: Request, res: Response) => {
  /**
   #swagger.summary = 'Stream music by ID.'
    #swagger.parameters['id'] = {
       in: 'path',
       description: 'ID of the music. Example: 6d6d6ae4-6c83-4274-93b4-47ba8d9fd9a4',
       required: true,
       type: 'string'
   }
       
   # swagger.responses[200] = {
       description: 'Successful streaming of the music',
       schema: {
           type: 'string',
           format: 'binary'
       }
   }
   #swagger.responses[404] = {
       description: 'Music not found',
       schema: {
           type: 'object',
           properties: {
               message: { type: 'string', value: 'Music not found' }
           }
       }
   }
   #swagger.responses[500] = {
       description: 'Internal server error',
       schema: {
           type: 'object',
           properties: {
               message: { type: 'string', value: 'An error occurred while streaming the music' }
           }
       }
   }
   */
  try {
    const { id } = req.params as unknown as IstreamingMusicParams;

    const pathMusic = await musicService.getMusicById(id);

    const musicDatails = await musicService.getMusicMetadataById(id);

    if (!pathMusic) {
      return res.status(404).json({ message: "Music not found" });
    }

    const stat = await fsPromises.stat(pathMusic);

    res.writeHead(200, {
      "Content-Type": "audio/mp3",
      "Content-Length": stat.size,
      "Content-Title": musicDatails?.title || "",
      "Content-Artist": musicDatails?.artist.name || "",
      "Content-Cover":
        musicDatails?.album.img_url ||
        "https://cdn.pixabay.com/photo/2024/05/30/19/37/girl-8799169_1280.jpg",
    });

    const readStream = fs.createReadStream(pathMusic);
    readStream.pipe(res);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while streaming the music" });
  }
};

const getMusicMetadata = async (req: Request, res: Response) => {
  /**
   #swagger.summary = 'Get metadata of the music by ID.'
   #swagger.parameters['id'] = {
       in: 'path',
       description: 'ID of the music. Example: 6d6d6ae4-6c83-4274-93b4-47ba8d9fd9a4',
       required: true,
       type: 'string'
   }

   #swagger.responses[200] = {
       description: 'Successful retrieval of music metadata',
       schema: {
           $ref: '#/definitions/Music'
       }
   }
   #swagger.responses[404] = {
       description: 'Music not found',
       schema: {
           type: 'object',
           properties: {
               message: { type: 'string', example: 'Music not found' }
           }
       }
   }
   #swagger.responses[500] = {
       description: 'Internal server error',
       schema: {
           type: 'object',
           properties: {
               message: { type: 'string', example: 'An error occurred while retrieving the music metadata' }
           }
       }
   }
 */
  try {
    const { id } = req.params as unknown as IstreamingMusicParams;

    const metadata = await musicService.getMusicMetadataById(id);

    if (!metadata) {
      return res.status(404).json({ message: "Music not found" });
    }

    res.status(200).json(metadata);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while retrieving the music metadata",
    });
  }
};

const searchMusic = async (req: Request, res: Response) => {
  /*  #swagger.summary = 'Search music by title, album, or artist.'
   #swagger.parameters['query'] = {
       in: 'body',
       description: 'Query to search music by title, album, or artist',
       required: true,
       type: 'object',
       schema: { $ref: "#definitions/SearchMusicRequest" }
   }
   #swagger.responses[200] = {
       description: 'Successful retrieval of music matching the search criteria',
       schema: {
           type: 'array',
           items: {
               $ref: "#definitions/MusicsSearch"
           }
       }
   }
   #swagger.responses[500] = {
       description: 'Internal server error',
       schema: {
           type: 'object',
           properties: {
               message: { type: 'string', value: 'An error occurred while retrieving the music metadata' }
           }
       }
   }
   */
  try {
    const query = req.body as ISearchMusic;

    const musics = await musicService.searchMusic(query);

    res.status(200).json(musics);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while retrieving the music metadata",
    });
  }
};

export default { streamingMusic, getMusicMetadata, searchMusic };
