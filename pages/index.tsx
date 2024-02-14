import styles from "../styles/Home.module.css";
import { NextPage } from "next";
import { ConnectWallet, useAddress, useContract, useOwnedNFTs, Web3Button } from "@thirdweb-dev/react";
import { LOYALTY_CARD_CONTRACT_ADDRESS } from "../constants/addresses";
import { NFTCard } from "../components/nft";

const Home: NextPage = () => {
  const address = useAddress();
  const { contract } = useContract(LOYALTY_CARD_CONTRACT_ADDRESS);
  const { data: ownedNFTs, isLoading: isOwnedNFTsLoading } = useOwnedNFTs(contract, address);
  const claimLoyaltyCard = async () => {
    try {
      const signedPayloadReq = await fetch("/api/generate-sig", {
        method: "POST",
        body: JSON.stringify({
          address
        })
      });

      const json = await signedPayloadReq.json();

      if (!signedPayloadReq.ok) {
        throw new Error(json.message);
      }

      const signedPayload = json.signedPayload;

      const loyaltyCard = await contract?.erc721.signature.mint(signedPayload);
      alert("Loyalty card minted!");

    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.loginCard}>
          <ConnectWallet />
          {address ? (
            <>
              {!isOwnedNFTsLoading && (
                ownedNFTs && ownedNFTs.length > 0 ? (
                  ownedNFTs.map((nft) => (
                    <>
                      <NFTCard nft={nft} tokenId={nft.metadata.id} />
                    </>
                  ))
                ) : (
                  <>
                    <p>No Loyalty cards owned.</p>
                    <Web3Button
                      contractAddress={LOYALTY_CARD_CONTRACT_ADDRESS}
                      action={() => claimLoyaltyCard()}
                    >Claim Loyalty Card
                    </Web3Button>
                  </>
                )
              )}
            </>
          ) : (
            <p> Login to view Loyalty card.</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
