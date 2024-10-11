import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import userService from "../user/user.service";
import { checkCredentials, selectUser } from "./auth.service";
import { LoginDto } from "./auth.types";

const signup = async (req: Request, res: Response) => {
  /*
  #swagger.summary = 'Sign up a new user'
  #swagger.parameters['obj'] = {
    in: 'body',
    description: 'User information.',
    required: true,
    type: 'json',
    schema: { $ref: "#definitions/UserCreateDto" }
  }
  */
  const user = req.body;

  try {
    const newUser = await userService.createUser(user);
    req.session.uid = newUser.id;
    /*
      #swagger.responses[201] = { 
      schema: { "$ref": "#/definitions/User" }, description: "User created." }
    */
    res.status(201).json(newUser);
  } catch (e) {
    /*
      #swagger.responses[500] = {
      schema: {
        type: 'object',
        properties: {
          message: { type: 'string', value: 'Generic Error' }
        }
      }
    }
    */
    res.status(500).json({ error: "Generic Error" });
  }
};

const login = async (req: Request, res: Response) => {
  /*
  #swagger.summary = 'Make user login.'
  */

  /*
  #swagger.parameters['obj'] = {
    in: 'body',
    description: 'Credentials',
    required: true, 
    type: 'json',
    schema: { $ref: "#definitions/Login" }
  }
  */
  const credentials = req.body as LoginDto;

  try {
    const user = await checkCredentials(credentials);

    if (!user) {
      /* 
      #swagger.responses[401] = { 
        schema: {
          type: 'object',
          properties: {
            message: { type: 'string', value: 'Unauthorized' }
          }
        }
      }
      */
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Unauthorized" });
    } else {
      if (req.session.uid) {
        console.log("Session exisits");
      }
      /* 
      #swagger.responses[200] = { 
        schema: { "$ref": "#/definitions/User" }, description: "User informations." }
      }
      */
      req.session.uid = user.id;
      res.cookie("uid", user.id, { sameSite: "lax", httpOnly: true });
      return res.status(StatusCodes.OK).json(user);
    }
  } catch (e) {
    /*
      #swagger.responses[500] = {
      schema: {
        type: 'object',
        properties: {
          message: { type: 'string', value: 'Generic Error' }
        }
      }
    }
    */
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Generic Error" });
  }
};

const logout = async (req: Request, res: Response) => {
  /*
  #swagger.summary = 'Logout the user'
  */
  if (req.session.uid) {
    req.session.destroy(() => {
      /*
        #swagger.responses[200] = { 
        schema: {
          type: 'object',
          properties: {
            message: { type: 'string', value: 'Ok' }
          }
        }
      }
      */
      res.status(StatusCodes.OK).json({ message: "Ok" });
    });
  } else {
    /*
      #swagger.responses[403] = { 
        schema: {
          type: 'object',
          properties: {
            message: { type: 'string', value: 'Forbidden' }
          }
        }
      }
      */
    return res.status(StatusCodes.FORBIDDEN).json({ message: "Forbidden" });
  }
};

const checkSession = async (req: Request, res: Response) => {
  /*
  #swagger.summary = 'Check session status'
  #swagger.description = 'Returns the session UUID if the session is active.
  */

  if (req.session && req.session.uid) {
    /*
    #swagger.responses[200] = {
      description: 'The session is active, and the UUID is returned.',
      schema: {
        uuid: '123e4567-e89b-12d3-a456-426614174000'
      }
    }
    */
    const user = await selectUser(req.session.uid);
    return res.status(StatusCodes.OK).json({
      sessionId: req.sessionID,
      uuid: req.session.uid,
      user,
    });
  } else {
    /*
    #swagger.responses[401] = {
      description: 'No session found or session has expired.',
      schema: {
        message: 'No session found'
      }
    }
    */
    return res.status(StatusCodes.OK).json({
      sessionId: req.sessionID,
      uuid: null,
    });
  }
};
export default { signup, login, logout, checkSession };
