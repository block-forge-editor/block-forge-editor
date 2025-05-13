import { NetworkExceptionType } from "@/shared/types/common/entities/exceptions";

export class NetworkException extends Error {
  type: NetworkExceptionType;

  constructor(type: NetworkExceptionType) {
    super(type);
    this.type = type;
  }
}
