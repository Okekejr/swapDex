import { Abi, Address } from "viem";

export interface SupportedToken {
  address: Address;
  symbol: string;
  name: string;
  decimals: number;
  logoURI: string;
  eip2612?: boolean;
  tags?: string[] | null;
  abi?: Abi;
  contractUrl: string;
  rpcUrl: string;
}
