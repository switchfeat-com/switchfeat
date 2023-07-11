export interface UserModel {
    name: string;
    email?: string;
    
    isBlocked: boolean;
    imageUrl: string | undefined;
}