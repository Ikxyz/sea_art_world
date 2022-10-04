
const crypto = require('crypto');



/**
 * @description Encrypt, Hashing of data
 */
class Encrypt {



  /**
   * Generate new password hash
   * *i.e this is to strengthen users password or pin
   * @param pwd String
   */
  static generatePassword(pwdStr: string): string {
    return  Encrypt.hash(pwdStr).toString();
  }






  /**
  * Generate hash from provider parameters
  * @param str:[String]
  */
  static hash(str: string, algo?: "sha512"|"sha256"|"md5", salt?: string): string {
    if (!str) {
      throw 'invalid pin. exit h1';
    }
    var hash = crypto.createHash(algo || "sha512", salt);

    hash.update(str);
    return hash.digest('hex');

  }

  /**
  * Generate hash from provider parameters
  * @param str:[String]
  */
  static secureHash(str: string, algo?: "sha512"|"sha256"|"md5", salt?: string): string {
    if (!str) throw 'invalid pin';
    return crypto.createHmac(algo || "sha512", salt).update(str).digest('hex');
  }

}

export default Encrypt;