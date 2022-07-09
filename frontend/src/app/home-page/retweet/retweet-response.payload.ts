import { User } from 'src/app/user-model';
import { TweetResponsePayload } from '../tweet-response.payload';

export interface RetweetResponsePayload{
    tweet: TweetResponsePayload,
    user: User
}