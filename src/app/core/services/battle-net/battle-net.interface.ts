export type Region = 'us' | 'eu' | 'kr' | 'tw' | 'cn';

export interface EndpointData<T> {
    success: boolean;
    errors: Error[];
    result: T;
}
export interface ErrorWarning {
    key: string;
    message: string;
}

export interface SecretResponse {
    access_token: string;
    token_type: 'bearer';
    expires_in: number;
}
