/**
 * File that contains all the types for requests to the server
 */

import {ICard} from "../types/ICard.js";

/**
 * Base request type
 */
export interface BaseRequest {
  type: string;
}

/**
 * Add request type
 */
export interface AddRequest extends BaseRequest {
  type: 'add';
  user: string;
  card: ICard;
}

/**
 * List request type
 */
export interface ListRequest extends BaseRequest {
  type: 'list';
  user: string;
}

/**
 * Show request type
 */
export interface ShowRequest extends BaseRequest {
  type: 'show';
  user: string;
  id: number;
}

/**
 * Update request type
 */
export interface UpdateRequest extends BaseRequest {
  type: 'update';
  user: string;
  id: number;
  card: ICard;
}

/**
 * Remove request type
 */
export interface RemoveRequest extends BaseRequest {
  type: 'remove';
  user: string;
  id: number;
}

export type RequestTypes = AddRequest | ListRequest | ShowRequest | UpdateRequest | RemoveRequest;