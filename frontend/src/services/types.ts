export interface CreatePostInput {
    title: string;
    content: string;
    categoryID: string;
}

export interface CreateUserInput {
    username: string;
    email: string;
    passwordHash: string;
}