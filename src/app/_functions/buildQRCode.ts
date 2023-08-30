import crypto from "crypto";

export type TokenSubmission = {
    name: string,
    symbol: string,
    amount: string,
    mintable: boolean
}
export function buildQRCode(data: TokenSubmission) {
    const {name, symbol, amount, mintable} = data
    const token_backend = "172.16.250.194:8080/backend";
    const qrExecuteEndPoint = "qrClickAuth";
    const qrLoadEndPoint = "qrScanAuth";

    const client_nonce = crypto.randomBytes(16).toString("hex");
    let default_qr_code: string = `http://zeniq.id/${token_backend}/${qrExecuteEndPoint}?n=${client_nonce}&r=/backend/${qrLoadEndPoint}&t=1&tETH&d=1&w=1`;
    return  default_qr_code.concat(`&tn=${name}&ts=${symbol}&ta=${amount}&tm=${mintable}`)
}