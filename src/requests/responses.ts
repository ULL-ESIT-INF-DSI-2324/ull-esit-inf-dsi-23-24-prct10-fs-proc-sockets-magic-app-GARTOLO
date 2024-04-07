/**
 * File with types for responses from the server
 */
import {ICard} from "../ICard.js";

type ResponseType = 'success' | 'error';

/**
 * Base response type
 */
export interface BaseResponse {
  type: ResponseType;
}

/**
 * Success response type
 */
export interface SuccessResponse extends BaseResponse {
  type: 'success';
  message: string;
}

/**
 * Error response type
 */
export interface ErrorResponse extends BaseResponse {
  type: 'error';
  message: string;
}

/**
 * Response type for listing cards
 */
export interface ListResponse extends BaseResponse {
  type: 'success';
  cards: ICard[];
}

/**
 * Response type for getting a card
 */
export interface GetResponse extends BaseResponse {
  type: 'success';
  card: ICard;
}