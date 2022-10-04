class Utils {

    /**
     * generate random string of a particular length
     * @param length number (default 16)
     * @returns string
     */
    static uniqueId = (length = 26) => {

        const raw = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghtjklmnopqrstuvwxyz0123456789';

        let ref = 'E0';

        for (let i = 0; i < length - 2; i++) {
            const index = Math.floor(Math.random() * raw.length)
            ref += raw[index];
        }
        return ref;
    }

    /**
     * Convert number to money format
     * @param num number
     * @param symbol string e.g($,EUR)
     * @returns string
     */
    static toMoney = (num = 0, symbol?: string, fixed = 2, direction?: 'left' | 'right') => {

        const p = num.toFixed(fixed).split(".");
        const prefix = p[0].charAt(0) == "-" ? '-' : '';
        const e = p[0].split("").reverse().reduce(function (acc, num, i, orig) {
            return num == "-" ? acc : num + (i && !(i % 3) ? "," : "") + acc;
        })
        symbol = symbol ?? '$';
        direction = direction ?? 'left';
        return `${direction === 'left' ? symbol : ''} ${prefix}${e}.${p[1]} ${direction === 'right' ? symbol : ''}`;
    }

    static capitalize = (str: string) => {
        return str[0].toUpperCase() + str.substring(1);
    }

    /**
   * Generate random numbers
   */
    static generateNumber = () => {
        const random = Date.now().toString();
        const sub = random.substr(6, random.length);

        const salt = Math.floor(100 + Math.random() * 900);
        const num = Number(`${salt}${sub}`);
        return { code: 200, data: `${num}` };
    }


}


export default Utils;