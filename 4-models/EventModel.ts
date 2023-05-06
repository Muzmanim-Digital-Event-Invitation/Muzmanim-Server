export interface EventModel {
    id?: string;
    userEmail?: string;
    eventType: number;
    hallName: string;
    name1: number;
    name2?: number;
    food: boolean;
    vegetarian: boolean;
    vegan: boolean;
    kids: boolean;
    regular: boolean;
    city: string;
    street: string;
    eventDate: Date;
    eventStartHour: string;
    imageId: string;
    patternId: string;
    colorText: string;
    iconId: number;
}