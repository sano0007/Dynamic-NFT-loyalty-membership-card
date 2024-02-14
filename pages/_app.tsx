import type { AppProps } from "next/app";
import { embeddedWallet, metamaskWallet, smartWallet, ThirdwebProvider } from "@thirdweb-dev/react";
import "../styles/globals.css";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = "mumbai";

function MyApp({ Component, pageProps }: AppProps) {
  const personalWallet = embeddedWallet();
  const smartWalletConfig = smartWallet(personalWallet, {
    factoryAddress: "0x7326134435f0032eEe8E113Caa5Fc71595f9f4C8",
    gasless: true
  });

  return (
    <ThirdwebProvider
      clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
      activeChain={activeChain}
      supportedWallets={[
        smartWalletConfig,
        metamaskWallet()
      ]}
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
