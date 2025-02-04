export interface quote {
  dstAmount: string;
  srcToken: SrcTokenOrDstToken;
  dstToken: SrcTokenOrDstToken;
  protocols?: ((ProtocolsEntityEntityEntity[] | null)[] | null)[] | null;
  gas: number;
}

export interface SrcTokenOrDstToken {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  eip2612: boolean;
  isFoT: boolean;
  logoURI: string;
  tags?: string[] | null;
}

export interface ProtocolsEntityEntityEntity {
  name: string;
  part: number;
  fromTokenAddress: string;
  toTokenAddress: string;
}
