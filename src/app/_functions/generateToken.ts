import {TokenSubmission} from "./buildQRCode";
import {ethers} from "ethers";
import {generatorAbi} from "./generatorAbi";
import {EthersjsNomoSigner} from "ethersjs-nomo-plugins/dist/ethersjs_nomo_signer";
import {zscProvider} from "ethersjs-nomo-plugins/dist/ethersjs_provider";
import {TOO_LITTLE_BALANCE_ERROR} from "../_constants/constants";

export type TokenData = TokenSubmission & {
    to: string
}

const generatorAddress = "0x336600e3841f068c9748Ac3097449E72F8FDaB64";

export async function generateToken(props: TokenData): Promise<string> {
    const {to, amount, symbol, mintable, name} = props

    const signer = new EthersjsNomoSigner(zscProvider)
    const generator = new ethers.Contract(generatorAddress, generatorAbi, signer);

    const tx = await generator.generateToken(to, BigInt(amount), name, symbol, mintable, 0);
    const receipt = await tx.wait();

    let tokenAddress: string = '';
    for(const e of receipt.events) {
        if(e.event === "NewToken") {
            tokenAddress = e.args.token;
        }
    }

    return tokenAddress;
}

export async function estimateGenerateToken(props: TokenData) {
    const {to, amount, symbol, mintable, name} = props

    const signer = new EthersjsNomoSigner(zscProvider)
    const generator = new ethers.Contract(generatorAddress, generatorAbi, signer);
    const gasEstimate = await generator.estimateGas.generateToken(to, BigInt(amount), name, symbol, mintable, 0)
    const balance = await signer.getBalance()

    // console.log('GasEstimate:', ethers.utils.formatUnits(gasEstimate, "ether"))
    // console.log('Balance:', ethers.utils.formatUnits(balance, "ether"))
    if (gasEstimate.gt(balance)) {
        // nomo.injectQRCode({qrCode: 'https://faucet.nomo.app/?t=nomo', navigateBack: false})
        throw new Error(TOO_LITTLE_BALANCE_ERROR)
    }
}