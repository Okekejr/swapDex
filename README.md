# SwapDex App

## Overview

SwapDex is a decentralized mobile application built using React Native and web3 libraries. The app enables users to swap cryptocurrencies across different networks with a seamless and efficient onboarding process. It also allows users to:

- View transaction history
- Check balances
- See the top 100 tokens
- Read the latest crypto news

The swap functionality is powered by **1inch API** and **Chainlink price feeds**, while **Alchemy** is used as the RPC provider.

![Screens](https://github.com/user-attachments/assets/798e819a-8171-429f-a296-3062d3102459)

---

## Features

### 1. Onboarding Process
- Wallet connection via **Reown**.

### 2. Swap Interface
- Users can select tokens to swap.
- Price feeds fetched via **Chainlink**.
- Allowance checking before initiating swaps.
- Users can edit **slippage settings**.
- Handles **slippage errors** and **transaction failures**.

### 3. Transaction Handling
- Uses **ethers.js** for transaction formatting.
- Converts token amounts based on **decimals** (e.g., **18 for ETH**, varies for ERC20 tokens).
- Handles errors like **exceeding API rate limits** and **incorrect amount conversions**.

### 4. UI Components
- **Top UI**: Displays ETH/Polygon balance and USD equivalent.
- **Network switcher**: Toggle between ETH and Polygon.
- **Tokens Screen**: View **top 100 tokens**.
- **Latest Transactions Screen**: View **transaction history**.
- **News Screen**: Displays **latest crypto news**.
- **Transaction Hash Screen**:
  - Displays transaction confirmation.
  - Allows users to **click and view transactions** on **Etherscan/Polygonscan**.

---

## Technologies Used

- [**Expo React Native**](https://docs.expo.dev/guides/typescript/)
- [**WAGMI, Viem & ethers.js**](https://wagmi.sh) for onchain interactions
- [**Alchemy RPC Provider & Alchemy SDK**](https://www.alchemy.com)
- [**1inch API**](https://portal.1inch.dev/documentation/apis/swap/classic-swap/introduction) for swapping
- **React Query** (for caching and data fetching)
- [**Chainlink API**](https://docs.chain.link/data-feeds/price-feeds/addresses?network=ethereum&page=1&search=) for price feeds
- [**Cryptocompare API**](https://developers.cryptocompare.com/documentation/data-api/news_v1_article_list) for news
- [**Coinranking API**](https://developers.coinranking.com/api/documentation) for the top token list
- [**Reown**](https://docs.reown.com/appkit/react-native/core/installation) for wallet integration
- **Custom Hooks** for modular and reusable code

---

## Key Issues Addressed

### 1. Handling API Rate Limits
- Implemented **refetch** and increased **request interval** to prevent exceeding **1inch API limits**.
- Added **custom slippage settings** for better user control.

### 2. Error Handling & Debugging
- Displaying **error messages in the UI** instead of console logs.
- Handling **high slippage errors**, **invalid swaps**, and **failed API requests**.
- Improved **UI/UX feedback** for failed swaps.

---

🚀 **SwapDex** is designed to offer a **seamless, decentralized** swapping experience with **reliable price feeds**, **secure wallet connections**, and a **smooth UI**.  
Happy swapping! 🦄💰
