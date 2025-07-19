export interface IUser {
    _id?: string;
    name: string;
    email: string;
    phone?: string;
    friends?: string[];
    purchaseLists?: {
        myLists?: string[];
        sharedLists?: string[];
    };
    isVerified: boolean;
    isGoogleAuth: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
