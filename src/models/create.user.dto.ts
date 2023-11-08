export class CreateUserDto {
    name: string;
    age: number;
    location: string;
}

export class CommentDto {
    userId: string;
    name: string;
    content: string;
    artId: string;
}

export class ArtDto {
    id: string;
    title: string;
    artist: string;
    year: string;
    comments?: string[];
}

export class User {
    id: number;
    name: string;
    age: number;
    location: string;
}
