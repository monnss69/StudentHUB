export interface CreatePostInput {
    Title: string;
    Content: string;
    CategoryID: string;
}

export interface CreateUserInput {
    Username: string;
    Email: string;
    PasswordHash: string;
}