
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