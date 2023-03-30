import { ValidationSummary } from "../product/models/validation-summary";

export class LoginRequest {
    MensagemUltimaTentativa: number;
    Data: string;
    RequestToken: string;
    ResultCode: number;
    Message: string;
    DtStart: Date;
    DtStartFmt: string;
    DtEnd: Date;
    DtEndFmt: string;
    ValidationSummary: ValidationSummary;

}
