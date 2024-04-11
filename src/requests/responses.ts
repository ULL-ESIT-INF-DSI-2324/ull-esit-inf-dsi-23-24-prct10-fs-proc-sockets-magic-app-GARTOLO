/**
 * File with types for responses from the server
 */
import {ICard} from "../types/ICard.js";

type ResponseStatus = 'success' | 'error';

/**
 * Base response type
 */
export interface BaseResponse {
  status: ResponseStatus;
  type: string;
}

/**
 * Success response type
 */
export interface SuccessResponse extends BaseResponse {
  message: string;
}

/**
 * Function to create success response
 * @param message The message to include in the response
 */
export function createSuccessResponse(message: string): SuccessResponse {
  return {
    status: 'success',
    type: 'success',
    message
  };
}

/**
 * Error response type
 */
export interface ErrorResponse extends BaseResponse {
  message: string;
}

/**
 * Function to create error response
 * @param message The message to include in the response
 */
export function createErrorResponse(message: string): ErrorResponse {
  return {
    status: 'error',
    type: 'error',
    message
  };
}

/**
 * Response type for listing cards
 */
export interface ListResponse extends BaseResponse {
  cards: ICard[];
}

/**
 * Function to create list response
 * @param cards The cards to include in the response
 */
export function createListResponse(cards: ICard[]): ListResponse {
  return {
    status: 'success',
    type: 'list',
    cards
  };
}

/**
 * Response type for getting a card
 */
export interface GetResponse extends BaseResponse {
  card: ICard;
}

/**
 * Function to create get response
 * @param card The card to include in the response
 */
export function createGetResponse(card: ICard): GetResponse {
  return {
    status: 'success',
    type: 'get',
    card
  };
}

export type ResponseTypes = SuccessResponse | ErrorResponse | ListResponse | GetResponse;