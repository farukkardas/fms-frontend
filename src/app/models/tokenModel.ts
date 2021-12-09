import { OperationClaim } from "./operationClaim";

export class TokenModel{
    token:string;
    expiration:string;
    id:string;
    securityKey:string;
    operationClaims : OperationClaim[];
}