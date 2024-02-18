
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

export class FetchBedsInput {
    page: number;
    limit: number;
    keyword?: Nullable<string>;
}

export class NewBedInput {
    number: number;
    level: number;
}

export class UpdateBedInput {
    id: string;
    number?: Nullable<number>;
    level?: Nullable<number>;
}

export class FetchEquipmentsInput {
    page: number;
    limit: number;
    keyword?: Nullable<string>;
}

export class NewEquipmentInput {
    description?: Nullable<string>;
    name: string;
    serialNumber: number;
}

export class UpdateEquipmentInput {
    id: string;
    description?: Nullable<string>;
    name?: Nullable<string>;
    serialNumber?: Nullable<number>;
}

export class FetchHospitalisationInput {
    page: number;
    limit: number;
    userId: string;
}

export class NewHospitalisationInput {
    userId: string;
    bedId: string;
}

export class UpdateHospitalisationInput {
    id: string;
    endAt: string;
    userId: string;
    bedId: string;
}

export class LastObservationInput {
    page: number;
    limit: number;
    hospitalisationId: string;
}

export class NewObservationInput {
    value: number;
    equipmentId: string;
    hospitalisationId: string;
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
    role?: Nullable<string>;
}

export class UpdateUserInput {
    name: string;
    surname?: Nullable<string>;
    email: string;
    password?: Nullable<string>;
    phone?: Nullable<string>;
    avatar?: Nullable<string>;
    role?: Nullable<string>;
}

export class Auth {
    exampleField?: Nullable<number>;
}

export abstract class IQuery {
    abstract auth(id: number): Nullable<Auth> | Promise<Nullable<Auth>>;

    abstract beds(payload: FetchBedsInput): BedPage | Promise<BedPage>;

    abstract bed(id: string): Bed | Promise<Bed>;

    abstract equipments(payload: FetchEquipmentsInput): EquipmentPage | Promise<EquipmentPage>;

    abstract equipment(id: string): Equipment | Promise<Equipment>;

    abstract hospitalisations(payload: FetchHospitalisationInput): HospitalisationPage | Promise<HospitalisationPage>;

    abstract hospitalisation(id: string): Hospitalisation | Promise<Hospitalisation>;

    abstract lastObservations(payload: LastObservationInput): LastObservationResult | Promise<LastObservationResult>;

    abstract login(loginInput: LoginInput): LoginResponse | Promise<LoginResponse>;

    abstract me(): Nullable<User> | Promise<Nullable<User>>;

    abstract users(payload: FetchUsersInput): UserPage | Promise<UserPage>;
}

export abstract class IMutation {
    abstract updateAuth(updateAuthInput: UpdateAuthInput): Auth | Promise<Auth>;

    abstract removeAuth(id: number): Nullable<Auth> | Promise<Nullable<Auth>>;

    abstract createBed(input: NewBedInput): Bed | Promise<Bed>;

    abstract updateBed(input: UpdateBedInput): Bed | Promise<Bed>;

    abstract deleteBed(id: string): Bed | Promise<Bed>;

    abstract createEquipment(input: NewEquipmentInput): Equipment | Promise<Equipment>;

    abstract updateEquipment(input: UpdateEquipmentInput): Equipment | Promise<Equipment>;

    abstract deleteEquipment(id: string): Equipment | Promise<Equipment>;

    abstract createHospitalisation(input: NewHospitalisationInput): Hospitalisation | Promise<Hospitalisation>;

    abstract updateHospitalisation(input: UpdateHospitalisationInput): Hospitalisation | Promise<Hospitalisation>;

    abstract deleteHospitalisation(id: string): Hospitalisation | Promise<Hospitalisation>;

    abstract createObservation(input: NewObservationInput): Observation | Promise<Observation>;

    abstract updateUser(userId: string, updateUserInput: UpdateUserInput): User | Promise<User>;

    abstract createUser(createUserInput: CreateOrUpdateUserInput): User | Promise<User>;

    abstract updatePassword(updatePasswordInput: UpdatePasswordInput): User | Promise<User>;

    abstract removeUser(id: string): Nullable<RemoveUserResponse> | Promise<Nullable<RemoveUserResponse>>;

    abstract sign(signInput: CreateOrUpdateUserInput): LoginResponse | Promise<LoginResponse>;
}

export class Bed {
    id: string;
    number: number;
    level: number;
    createdAt: string;
    updatedAt: string;
}

export class BedPage {
    data: Bed[];
    count: number;
}

export class Equipment {
    id: string;
    description?: Nullable<string>;
    name: string;
    serialNumber: number;
    createdAt: string;
    updatedAt: string;
}

export class EquipmentPage {
    data: Equipment[];
    count: number;
}

export class Hospitalisation {
    id: string;
    customer?: Nullable<User>;
    userId?: Nullable<string>;
    bed?: Nullable<Bed>;
    bedId?: Nullable<string>;
    createdAt: string;
    endAt: string;
}

export class HospitalisationPage {
    data: Hospitalisation[];
    count: number;
}

export class Observation {
    id: string;
    equipment?: Nullable<Equipment>;
    equipmentId?: Nullable<string>;
    hospitalisation?: Nullable<Hospitalisation>;
    hospitalisationId?: Nullable<string>;
    value: number;
    createdAt: string;
}

export class LastObservationResult {
    data: Observation[];
}

export abstract class ISubscription {
    abstract observationAdded(hospitalisationId?: Nullable<string>): Nullable<Observation> | Promise<Nullable<Observation>>;
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
