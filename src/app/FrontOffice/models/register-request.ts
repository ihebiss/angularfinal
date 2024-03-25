import { Role } from "./Role";
export interface RegisterRequest {
    firstname?: string;
    lastname?: string;
    email?: string;
    passwd?: string;
    roles: Role[];
    mfaEnabled?: string;}