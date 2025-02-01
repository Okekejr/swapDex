export interface Tokens {
  uuid: string;
  symbol: string;
  name: string;
  color: string;
  iconUrl: string;
  marketCap: string;
  price: string;
  listedAt: number;
  tier: number;
  change: string;
  rank: number;
  sparkline?: string[] | null;
  lowVolume: boolean;
  coinrankingUrl: string;
  btcPrice: string;
  contractAddresses?: (string | null)[] | null;
  "24hVolume": string;
}

export interface TokensResponse {
  data: {
    coins: Tokens[];
  };
}
