import { NextApiRequest, NextApiResponse } from "next";
import { PayloadToSign721withQuantity, ThirdwebSDK } from "@thirdweb-dev/sdk";
import { LOYALTY_CARD_CONTRACT_ADDRESS } from "../../constants/addresses";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { address } = JSON.parse(req.body);
    if (!process.env.PRIVATE_KEY) {
      throw new Error("PRIVATE_KEY is not set");
    }

    const sdk = ThirdwebSDK.fromPrivateKey(
      process.env.PRIVATE_KEY,
      "mumbai",
      {
        secretKey: process.env.SECRET_KEY
      }
    );

    const loyaltyCardContract = await sdk.getContract(LOYALTY_CARD_CONTRACT_ADDRESS);

    const payload: PayloadToSign721withQuantity = {
      to: address,
      metadata: {
        name: "Loyalty Card",
        description: `This is a loyalty card for ${address}`,
        image: "https://res.cloudinary.com/dwnwhwyoc/image/upload/v1707917380/samples/oyrntj0oznkqpktidwgt.png",
        attributes: [
          {
            trait_type: "Points",
            value: "0"
          }
        ]
      }
    };

    const signedPayload = await loyaltyCardContract.erc721.signature.generate(payload);

    res.status(200).json({ signedPayload: JSON.parse(JSON.stringify(signedPayload)) });

  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal Server Error" });
  }
}