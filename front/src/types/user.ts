export interface IAddress {
    country?: string;
    city?: string;
    addressLine1?: string;
    addressLine2?: string;
}

export interface IUser {
    fullName?: string
    email: string;
    password: string;
    status?: string;
    avatar?: string;
    lastName?: string;
    firstName?: string;
    gender?: string;
    address?: IAddress;
    profession?: string;
    phone?: string;
    roles?: Array<string>;
}

export interface IisFetching {
    isFetching: boolean
}

export interface IState {
    isFetching: boolean
    user: IUser | null
}