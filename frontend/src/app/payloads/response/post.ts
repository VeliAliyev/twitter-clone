import { User } from "src/app/user-model";

export interface PostResponse{
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
    quote?: PostResponse
}