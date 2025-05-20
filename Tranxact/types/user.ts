export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    profileImage?: string;
    whatsappNumber: string;
}

export interface UserProfileUpdateData {
    firstName?: string;
    lastName?: string;
    whatsappNumber?: string;
    profileImage?: string;
}