export type ErrorType =
     | "Bab Request"
     | "Unauthorized"
     | "Not Allowed"
     | "Forbidden"
     | "Conflict"
     | "Not Found"
     | "Timeout"
     | "Internal Error";

export class CustomError extends Error {
     __proto__: Error;
     // default error type
     name: ErrorType = "Bab Request";

     // default error code
     code: number = 500;

     // default error message
     message: string = "error occurred";

     // default error status
     status: boolean = false;

     isCustomError: boolean = true;

     // default error data
     data: any = null;

     constructor() {
          super("");
          const origin = new.target.prototype;
          this.__proto__ = origin;
     }

     /**
      * return error in json
      */
     toJson(): { code: number; status: boolean; message: string; data: any } {
          return {
               code: this.code,
               status: this.status,
               message: this.message,
               data: this.data,
          };
     }

     /**
      * Returns error in string
      */
     toString(): string {
          return `${this.message} (e:${this.code})`;
     }
}



/**
 * Handled bad or invalid request
 */
export class BadRequest extends CustomError {
     constructor(message?: string) {
          super();

          // set error name
          this.name = "Bab Request";

          // set error code
          this.code = 400;

          // set error message if any present
          if (message) this.message = message;

     }
}

/**
 * Handle not found error
 */
export class NotFound extends CustomError {
     constructor(message?: string) {
          super();



          // set error name
          this.name = "Not Found";

          // set error code
          this.code = 404;

          // set error message if any present
          if (message) this.message = message;


     }
}

/**
 * Handles Unauthenticated request
 */
export class Unauthorized extends CustomError {
     constructor(message?: string) {
          super();

          // set error name
          this.name = "Unauthorized";

          // set error code
          this.code = 401;

          // set error message if any present
          if (message) this.message = message ?? "Authentication required";
     }
}

/**
 * Handled Restricted Access
 */
export class NotAllowed extends CustomError {
     constructor(message?: string) {
          super();


          // set error name
          this.name = "Not Allowed";

          // set error code
          this.code = 403;


          // set error message if any present
          if (message) this.message = message;
     }
}

/**
 * Handled duplication error
 */
export class Conflict extends CustomError {
     constructor(message?: string) {
          super();

          // set error name
          this.name = "Conflict";

          // set error code
          this.code = 409;

          // set error message if any present
          if (message) this.message = message ?? "Already Exist";
     }
}

/**
 * Handled server failure and other unexpected error events
 */
export class ServerError extends CustomError {
     constructor(message?: string) {
          super();

          // set error name
          this.name = "Internal Error";

          // set error code
          this.code = 500;

          // set error message if any present
          if (message) this.message = message ?? "error occurred processing request";
     }
}


/**
 * Handled server failure and other unexpected error events
 */
export class TimeoutError extends CustomError {
     constructor(message?: string) {
          super();

          // set error name
          this.name = "Timeout";

          // set error code
          this.code = 504;

          // set error message if any present
          if (message) this.message = message ?? "request timeout";
     }
}



export function onError(err: { message?: string } | string) {
     logError(err);
     throw new ServerError(typeof err === 'string' ? err : err?.message ?? 'service currently not available');
}

export function logError(err: { message?: string } | string) {
     console.error(typeof err === 'string' ? err : err?.message ?? 'service currently not available');
}


export const RtkError = (error: any, defaultErrorMessage: string = ""): string => {
     console.log(typeof error, error);
     try {
          if (!error) return "";

          if (typeof error === "object") {
               if (error.hasOwnProperty("data")) {
                    return error.data?.message ?? defaultErrorMessage;
               }
               if (error.hasOwnProperty("status") && error.status === "FETCH_ERROR") {
                    return "Network Error";
               }
          }
          return error;
     } catch (err) {
          console.log(err);
          return defaultErrorMessage
     }
}