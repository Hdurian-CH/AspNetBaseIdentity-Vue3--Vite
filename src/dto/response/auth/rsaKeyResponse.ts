import {BaseResponse} from "../baseResponse.ts";

export class RsaKeyResponse extends BaseResponse{
    publicKey: string
    returnTime: string
}