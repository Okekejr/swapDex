import { Abi } from "viem";

export const usdc_eth: Abi = [
  {
    constant: false,
    inputs: [{ name: "newImplementation", type: "address" }],
    name: "upgradeTo",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "newImplementation", type: "address" },
      { name: "data", type: "bytes" },
    ],
    name: "upgradeToAndCall",
    outputs: [],
    payable: true,
    stateMutability: "payable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "implementation",
    outputs: [{ name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ name: "newAdmin", type: "address" }],
    name: "changeAdmin",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "admin",
    outputs: [{ name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ name: "_implementation", type: "address" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor",
  },
  { payable: true, stateMutability: "payable", type: "fallback" },
  {
    anonymous: false,
    inputs: [
      { indexed: false, name: "previousAdmin", type: "address" },
      { indexed: false, name: "newAdmin", type: "address" },
    ],
    name: "AdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, name: "implementation", type: "address" }],
    name: "Upgraded",
    type: "event",
  },
];
