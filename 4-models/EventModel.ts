export interface EventModel {
    id?: string;
    userEmail?: string;
    eventType: number;
    hallName: string;
    name1: number;
    name2?: number;
    food: boolean | string;
    vegetarian: boolean | string;
    vegan: boolean | string;
    kids: boolean | string;
    regular: boolean | string;
    city: string;
    street: string;
    eventDate: Date;
    eventStartHour: string;
    imageId: string;
    background: string;
    colorText: string;
    iconId: string;
    image: File;
}