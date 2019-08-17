import Phone from './phone'

export default class User {
    _id: string;
    name: string;
    phones: Phone[];
    emails: string[];
}