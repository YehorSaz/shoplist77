import {IPurchase} from "./purchase.interface";

export interface IList {
    _id?: string;
    name: string;
    description?: string;
    items: IPurchase[];
    createdAt?: Date;
    updatedAt?: Date;
    user: string;
    sharedWith?: string[];
}
