export interface LoginResponse {
    token: string;
    refreshToken: string;
    user: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
    };
}

export interface SignupResponse {
    message: string;
    email: string;
}

export interface VerifyOtpResponse {
    success: boolean;
    message: string;
}