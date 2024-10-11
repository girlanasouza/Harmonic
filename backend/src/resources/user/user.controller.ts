import { Request, Response } from "express";
import { CreateUserDTO, UpdateUserDTO } from "./user.types";
import userService from "./user.service";
import { StatusCodes } from "http-status-codes";

export type TError = {
  message: string;
};

const create = async (req: Request, res: Response): Promise<void> => {
  /*  
  #swagger.summary = 'Create a new user'
  #swagger.parameters['obj'] = {
      in: 'body',
      description: 'User information.',
      required: true, 
      type: 'json',
      schema: { $ref: "#definitions/UserCreateDto" }
  }
  */
  const user = req.body as CreateUserDTO;

  try {
    const newUser = await userService.createUser(user);

    /* 
      #swagger.responses[200] = { 
      schema: { "$ref": "#/definitions/User" }, description: "User created." }
    */
    res.status(StatusCodes.OK).json(newUser);
  } catch (e) {
    const error = e as TError;

    if (error.message === "P2002") {
      /*
       #swagger.responses[409] = {
        schema: {
          type: 'object',
          properties: {
            message: { type: 'string', value: 'User already created' }
          }
        }
       }
      */
      res.status(StatusCodes.CONFLICT).json({ error: "User already created" });
    } else {
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
  }
};

const read = async (req: Request, res: Response) => {
  /*
  #swagger.summary = 'Find User by id'
  */

  /*
  #swagger.parameters['id'] = {
    in: 'path',
    description: 'User id.',
    required: true, 
    type: 'string'
  }
  */
  const { id } = req.params;

  try {
    const user = await userService.readUser(id);
    /* 
      #swagger.responses[200] = { 
      schema: { "$ref": "#/definitions/User" }, description: "User informations." }
    */
    res.status(StatusCodes.OK).json(user);
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

const update = async (req: Request, res: Response) => {
  /*
  #swagger.summary = 'Update a user by id'
  #swagger.parameters['id'] = {
    in: 'path',
    description: 'User id.',
    required: true, 
    type: 'string'
  }
  */

  const { id } = req.params;

  /*
  #swagger.parameters['body'] = {
    in: 'body',
    description: 'User information to update.',
    required: true,
    schema: { "$ref": "#/definitions/UserUpdateDto" }, description: "User informations to update." }
  }
  */
  const userUpdate = req.body as UpdateUserDTO;

  try {
    const userUpdated = await userService.updateUser(id, userUpdate);

    if (userUpdated) {
      /*
        #swagger.responses[200] = { 
        schema: { "$ref": "#/definitions/User" }, description: "User updated." }
      */
      return res.status(StatusCodes.OK).json(userUpdated);
    }

    /*
      #swagger.responses[204] = {
        description: 'No Content'
      }
    */
    return res.status(StatusCodes.NO_CONTENT).json();
  } catch (err) {
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
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Generic Error" });
  }
};

const remove = async (req: Request, res: Response) => {
  /*
  #swagger.summary = 'Delete a user by id'
  #swagger.parameters['id'] = {
    in: 'path',
    description: 'User id.',
    required: true, 
    type: 'string'
  }
  */
  const { id } = req.params;

  try {
    const removedUser = await userService.removeUser(id);

    if (removedUser) {
      /*
        #swagger.responses[200] = { 
        schema: { "$ref": "#/definitions/User" }, description: "User deleted." }
      */
      res.status(StatusCodes.OK).json(removedUser);
    } else {
      /*
        #swagger.responses[404] = {
        description: 'User not found'
      }
      */
      res.status(StatusCodes.NOT_FOUND).json({ error: "User not found" });
    }
  } catch (err) {
    console.log(err);
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
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Generic Error" });
  }
};

export default { create, read, update, remove };
