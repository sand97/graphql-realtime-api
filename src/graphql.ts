
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

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

export abstract class IQuery {
    abstract medicaments(): Medicament[] | Promise<Medicament[]>;

    abstract medicament(id: string): Medicament | Promise<Medicament>;

    abstract categories(): Category[] | Promise<Category[]>;

    abstract category(id: string): Category | Promise<Category>;
}

export abstract class IMutation {
    abstract createCategory(input: NewCategory): Category | Promise<Category>;

    abstract updateCategory(input: UpdateCategory): Category | Promise<Category>;

    abstract deleteCategory(id: string): Category | Promise<Category>;

    abstract createMedicament(input: NewMedicament): Medicament | Promise<Medicament>;

    abstract updateMedicament(input: UpdateMedicament): Medicament | Promise<Medicament>;

    abstract deleteMedicament(id: string): Medicament | Promise<Medicament>;
}

type Nullable<T> = T | null;
