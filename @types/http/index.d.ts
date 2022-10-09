export interface HttpStandardResponse<D> {
  "status": boolean,
  "code": number,
  "message": string,
  "data": D
}