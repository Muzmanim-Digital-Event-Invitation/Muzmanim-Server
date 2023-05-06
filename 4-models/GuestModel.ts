export interface GuestModel {
    id: number;
    eventId: string;
    firstName: string;
    lastName: string;
    guestsAmount: number;
    phone: string;
    isComing: boolean;
    vegetarian: number;
    vegan: number;
    kids: number;
    regular: number;
    notes: string;
}