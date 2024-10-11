import { Request, Response } from "express";
import recommendationService from "./recommendation.service";

const listAllRecommends = async (req: Request, res: Response) => {
  /**
      #swagger.summary = 'Return playlist recommendations to user.'
      */
  try {
    const playlists = await recommendationService.playlistRecomendation(
      req.session.uid!
    );
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


const listAllArtistsRecommends = async (req: Request, res: Response) => {

  try {
    const artits = await recommendationService.artistsRecommend(
      req.session.uid!
    );
    /**
        #swagger.responses[200] = { 
          schema: { "$ref": "#/definitions/Artists" }, description: "Successfully retrieved the list of recommended artists" }
       */
    res.status(200).json(artits);
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
  
}

export default { listAllRecommends, listAllArtistsRecommends };
