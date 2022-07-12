import { User } from "../user-model";

export interface TweetResponsePayload{
    id: number,
    firstName: string,
    lastName: string,
    username: string,
    duration: string,
    tweetText: string,
    replyCounter: number,
    retweetCounter: number,
    likeCounter: number,
    retweetedBy?: User,
    quote?: TweetResponsePayload
}