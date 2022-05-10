import { ValidationSummary } from "./validation-summary";

export class BaseResponse {
    Data: any;
    RequestToken: string;
    ResultCode: number;
    Message: string;
    DtStart: Date;
    DtStartFmt: string;
    DtEnd: Date;
    DtEndFmt: string;
    ValidationSummary: ValidationSummary;
}
