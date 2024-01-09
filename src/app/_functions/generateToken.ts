import { TokenSubmission } from "./buildQRCode";
import { ethers } from "ethers";
import { generatorAbi } from "./generatorAbi";
import { EthersjsNomoSigner } from "ethersjs-nomo-webons";
import { zscSigner, zscProvider } from "ethersjs-nomo-webons";
import { TOO_LITTLE_BALANCE_ERROR } from "../_constants/constants";

export type TokenData = TokenSubmission & {
  to: string;
};

const generatorAddress = "0x336600e3841f068c9748Ac3097449E72F8FDaB64";

export async function generateToken(props: TokenData): Promise<string> {
  const { to, amount, symbol, mintable, name } = props;

  const signer = new EthersjsNomoSigner(zscProvider);
  const generator = new ethers.Contract(generatorAddress, generatorAbi, signer);

  const tx = await generator.generateToken(
    to,
    ethers.getBigInt(amount),
    name,
    symbol,
    mintable,
    0
  );
  const receipt = await tx.wait();
  console.log("RECEIPT" + receipt);

  let tokenAddress: string = "";
  const events = receipt.events ?? [];
  for (const e of events) {
    if (e.event === "NewToken") {
      tokenAddress = e.args.token;
    }
  }

  return tokenAddress;
}

export async function estimateGenerateToken(props: TokenData) {
  const { to, amount, symbol, mintable, name } = props;

  const signer = new EthersjsNomoSigner(zscProvider);
  const generator = new ethers.Contract(generatorAddress, generatorAbi, signer);

  const ownAddress = await zscSigner.getAddress();
  const accountBalance = await zscProvider.getBalance(ownAddress);

  // console.log('GasEstimate:', ethers.utils.formatUnits(gasEstimate, "ether"))
  // console.log('Balance:', ethers.utils.formatUnits(balance, "ether"))
  if (accountBalance <= 0) {
    // nomo.injectQRCode({qrCode: 'https://faucet.nomo.app/?t=nomo', navigateBack: false})
    throw new Error(TOO_LITTLE_BALANCE_ERROR);
  }
}
