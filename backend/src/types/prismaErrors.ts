export enum PrismaErrorCode {
  UniqueConstraintViolation = "P2002",
}

export interface PrismaClientKnownRequestError extends Error {
  code: string;
  meta?: {
    target?: string[];
  };
}
