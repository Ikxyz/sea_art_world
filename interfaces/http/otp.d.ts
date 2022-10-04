export  type TOtpChannel = "telephone"|"email";

namespace IOtpRequestBody {

    export namespace Send {
      export type request = {
        userId: string,
        channel: Array<TOtpChannel>
      }
      export type response = HttpStandardResponse<null>
    }


    export namespace Verify {
      export type request = {
        userId: string,
        otp: number
      }

      export type response = HttpStandardResponse<null>
    }



}


export default IOtpRequestBody;