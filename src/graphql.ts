
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class UpdateAuthInput {
    id: number;
}

export class NewCategory {
    name: string;
    description: string;
}

export class NewMedicament {
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;
    categoryId: string;
}

export class UpdateCategory {
    id: string;
    name?: Nullable<string>;
    description?: Nullable<string>;
}

export class FetchMedicamentsInput {
    page: number;
    limit: number;
    keyword?: Nullable<string>;
}

export class UpdateMedicament {
    id: string;
    name?: Nullable<string>;
    description?: Nullable<string>;
    price?: Nullable<number>;
    stock?: Nullable<number>;
    image?: Nullable<string>;
    categoryId?: Nullable<string>;
}

export class FetchUsersInput {
    page: number;
    limit: number;
    keyword?: Nullable<string>;
}

export class LoginInput {
    email: string;
    password: string;
}

export class UpdatePasswordInput {
    oldPassword: string;
    newPassword: string;
}

export class CreateOrUpdateUserInput {
    name: string;
    surname?: Nullable<string>;
    email: string;
    password: string;
    phone?: Nullable<string>;
    avatar?: Nullable<string>;
}

export class UpdateUserInput {
    name: string;
    surname?: Nullable<string>;
    email: string;
    password?: Nullable<string>;
    phone?: Nullable<string>;
    avatar?: Nullable<string>;
}

export class Auth {
    exampleField?: Nullable<number>;
}

export abstract class IQuery {
    abstract auth(id: number): Nullable<Auth> | Promise<Nullable<Auth>>;

    abstract medicaments(payload: FetchMedicamentsInput): MedicamentPage | Promise<MedicamentPage>;

    abstract medicament(id: string): Medicament | Promise<Medicament>;

    abstract categories(): Category[] | Promise<Category[]>;

    abstract category(id: string): Category | Promise<Category>;

    abstract login(loginInput: LoginInput): LoginResponse | Promise<LoginResponse>;

    abstract me(): Nullable<User> | Promise<Nullable<User>>;

    abstract users(payload: FetchUsersInput): UserPage | Promise<UserPage>;
}

export abstract class IMutation {
    abstract updateAuth(updateAuthInput: UpdateAuthInput): Auth | Promise<Auth>;

    abstract removeAuth(id: number): Nullable<Auth> | Promise<Nullable<Auth>>;

    abstract createCategory(input: NewCategory): Category | Promise<Category>;

    abstract updateCategory(input: UpdateCategory): Category | Promise<Category>;

    abstract deleteCategory(id: string): Category | Promise<Category>;

    abstract createMedicament(input: NewMedicament): Medicament | Promise<Medicament>;

    abstract updateMedicament(input: UpdateMedicament): Medicament | Promise<Medicament>;

    abstract deleteMedicament(id: string): Medicament | Promise<Medicament>;

    abstract updateUser(userId: string, updateUserInput: UpdateUserInput): User | Promise<User>;

    abstract createUser(createUserInput: CreateOrUpdateUserInput): User | Promise<User>;

    abstract updatePassword(updatePasswordInput: UpdatePasswordInput): User | Promise<User>;

    abstract removeUser(id: string): Nullable<RemoveUserResponse> | Promise<Nullable<RemoveUserResponse>>;

    abstract sign(signInput: CreateOrUpdateUserInput): LoginResponse | Promise<LoginResponse>;
}

export class Medicament {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;
    categoryId: string;
    category: Category;
    createdAt: string;
    updatedAt: string;
}

export class MedicamentPage {
    medicaments: Medicament[];
    count: number;
}

export class Category {
    id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}

export class User {
    id: string;
    name: string;
    surname?: Nullable<string>;
    email: string;
    password: string;
    phone?: Nullable<string>;
    role?: Nullable<string>;
    avatar?: Nullable<string>;
    createdAt: string;
    updatedAt: string;
}

export class UserPage {
    users: User[];
    count: number;
}

export class LoginResponse {
    expiresIn: string;
    Authorization: string;
    user: User;
}

export class RemoveUserResponse {
    id: string;
}

type Nullable<T> = T | null;
