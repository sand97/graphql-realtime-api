
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreateAuthInput {
    exampleField?: Nullable<number>;
}

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

export class UpdateMedicament {
    id: string;
    name?: Nullable<string>;
    description?: Nullable<string>;
    price?: Nullable<number>;
    stock?: Nullable<number>;
    image?: Nullable<string>;
    categoryId?: Nullable<string>;
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

export class Auth {
    exampleField?: Nullable<number>;
}

export abstract class IQuery {
    abstract auth(id: number): Nullable<Auth> | Promise<Nullable<Auth>>;

    abstract medicaments(): Medicament[] | Promise<Medicament[]>;

    abstract medicament(id: string): Medicament | Promise<Medicament>;

    abstract categories(): Category[] | Promise<Category[]>;

    abstract category(id: string): Category | Promise<Category>;

    abstract login(loginInput: LoginInput): LoginResponse | Promise<LoginResponse>;

    abstract me(): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class IMutation {
    abstract createAuth(createAuthInput: CreateAuthInput): Auth | Promise<Auth>;

    abstract updateAuth(updateAuthInput: UpdateAuthInput): Auth | Promise<Auth>;

    abstract removeAuth(id: number): Nullable<Auth> | Promise<Nullable<Auth>>;

    abstract createCategory(input: NewCategory): Category | Promise<Category>;

    abstract updateCategory(input: UpdateCategory): Category | Promise<Category>;

    abstract deleteCategory(id: string): Category | Promise<Category>;

    abstract createMedicament(input: NewMedicament): Medicament | Promise<Medicament>;

    abstract updateMedicament(input: UpdateMedicament): Medicament | Promise<Medicament>;

    abstract deleteMedicament(id: string): Medicament | Promise<Medicament>;

    abstract updateUser(updateUserInput: CreateOrUpdateUserInput): User | Promise<User>;

    abstract updatePassword(updatePasswordInput: UpdatePasswordInput): User | Promise<User>;

    abstract removeUser(id: number): Nullable<User> | Promise<Nullable<User>>;

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

export class LoginResponse {
    expiresIn: string;
    Authorization: string;
    user: User;
}

type Nullable<T> = T | null;
