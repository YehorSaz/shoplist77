export interface IPurchase {
    _id?: string;
    name: string;
    isCompleted: boolean;
    addedBy: string;
    createdAt?: Date;
    updatedAt?: Date;
}
