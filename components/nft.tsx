import { NFT, ThirdwebNftMedia, useContract, useNFT } from "@thirdweb-dev/react";
import { LOYALTY_CARD_CONTRACT_ADDRESS } from "../constants/addresses";
import { useEffect, useState } from "react";
import { Attributes } from "../interfaces/metadata";
import styles from "../styles/Home.module.css";
import updateLoyaltyCard from "../pages/api/update-points";

type NFTProps = {
  nft: NFT;
  tokenId: string;
}

export const NFTCard = ({ nft, tokenId }: NFTProps) => {
  const { contract } = useContract(LOYALTY_CARD_CONTRACT_ADDRESS);
  const { data: loyaltyCard, isLoading: isLoyaltyCardLoading } = useNFT(contract, tokenId);

  let [loyaltyCardPoints, setLoyaltyCardPoints] = useState();

  useEffect(() => {
    console.log("🥶", nft.metadata);
    {/* @ts-ignore */
    }
    setLoyaltyCardPoints(loyaltyCard?.metadata.attributes[0].value);
  }, [loyaltyCard]);

  return (
    <div className={styles.loyaltyCard}>
      <ThirdwebNftMedia
        metadata={nft.metadata}
        height={"100%"}
        width={"100%"}
      />
      {nft.metadata.attributes && (
        <>
          {/* @ts-ignore */}
          {nft.metadata.attributes.map((attribute: Attributes, index: number) => (
            <div key={index} className={styles.loyaltyCardPoints}>
              {attribute.trait_type}: {attribute.value}
            </div>
          ))}
        </>
      )}
      <button onClick={async () => {
        await updateLoyaltyCard(nft, parseInt(loyaltyCardPoints || "0"), tokenId);

        {/* @ts-ignore */
        }
        setLoyaltyCardPoints(loyaltyCard.metadata.attributes[0].value);
      }}
              className={styles.updatePointsBtn}
      >
        Update Points
      </button>
    </div>
  );
};