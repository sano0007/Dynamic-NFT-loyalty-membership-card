# Loyalty Membership NFT Project

This project demonstrates how to create a loyalty card NFT using Thirdweb's Loyalty Card contract. With this innovative approach, businesses can easily implement a digital loyalty program by leveraging blockchain technology. The Loyalty Card contract allows for updating the NFT's metadata, which can be utilized for features like loyalty points, tiers, or even updating the NFT image metadata.

## Features

- **NFT Loyalty Card**: Utilize NFTs as digital loyalty cards that can store points, membership tiers, and more.
- **Dynamic Metadata**: Update the metadata of the NFT to reflect the current loyalty points or membership tier of the cardholder.
- **Decentralized**: Built on blockchain technology, ensuring transparency and security for your loyalty program.

## Technology Stack

- **Thirdweb SDK**: For interacting with the blockchain and managing NFTs.
- **Next.js**: A React framework for building the frontend and server-side rendering.
- **Ethers.js**: A library to interact with the Ethereum blockchain.
- **TypeScript**: For type-safe code and better development experience.

## Getting Started

### Prerequisites

- Node.js (v14 or newer)
- Yarn or npm
- A wallet with Ethereum for deploying contracts (if deploying to a live network)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/sano0007/Dynamic-NFT-loyalty-membership-card.git
   ```

2. Navigate to the project directory:
   ```bash
   cd Dynamic-NFT-loyalty-membership-card
   ```

3. Install dependencies:
   ```bash
   yarn install
   ```

### Running the Project

1. Start the development server:
   ```bash
   yarn dev
   ```

2. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.


## How It Works

- The project uses the `@thirdweb-dev/sdk` to interact with the Ethereum blockchain and manage NFTs.
- The frontend is built with Next.js, providing a seamless experience for users to interact with their loyalty NFTs.
- The backend API routes (`/api/generate-sig` and `/api/update-points`) are used to securely sign transactions and update NFT metadata without exposing sensitive keys.

## Directory Structure

- `components/`: Reusable React components.
- `constants/`: Constants like contract addresses.
- `interfaces/`: TypeScript interfaces for type definitions.
- `pages/`: Next.js pages and API routes.
- `public/`: Static assets like images and icons.
- `styles/`: CSS modules and global styles.


