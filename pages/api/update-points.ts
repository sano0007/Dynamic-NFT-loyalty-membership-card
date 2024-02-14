import { NFT } from "@thirdweb-dev/react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";

export default async function updateLoyaltyCard(
  nft: NFT,
  loyaltyCardPoints: number,
  nftTokenId: string
) {
  try {

    console.log("🍅🍅🍅", process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID);
    console.log("🍅🍅🍅", process.env.PRIVATE_KEY);

    // if (!process.env.PRIVATE_KEY) {
    //   throw new Error("PRIVATE_KEY is not set");
    // }

    const sdk = ThirdwebSDK.fromPrivateKey(
      "5b8e77644fc2cb047a80555590c6ed6f0b10438272788ec0ce42edede309b155",
      "mumbai",
      {
        secretKey: process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID
      }
    );
    console.log("🌸");
    const loyaltyCardContract = await sdk.getContract(process.env.LOYALTY_CARD_CONTRACT_ADDRESS!);
    const metadata = {
      ...nft.metadata,
      attributes: [
        {
          trait_type: "Points",
          value: loyaltyCardPoints + 10
        }
      ]
    };

    const updatedNFT = await loyaltyCardContract.erc721.update(nftTokenId, metadata);
    alert("Points updated successfully!");

    // try {
    //   const updatedNFT = await loyaltyCardContract.erc721.update(nftTokenId, metadata);
    //   alert("Points updated successfully!");
    // } catch (e) {
    //   alert("You can't update the points of this loyalty card.")
    //   return { error: "updating loyalty card points failed with error" + e}
    // }

  } catch (e) {
    console.error(e);
  }
}