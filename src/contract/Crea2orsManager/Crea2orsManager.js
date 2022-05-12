export default [
  {
    type: "event",
    name: "OfferAccepted",
    inputs: [
      {
        type: "tuple",
        name: "",
        internalType: "struct Crea2orsManager.Token",
        indexed: false,
        components: [
          {
            type: "address",
            name: "_address",
            internalType: "address",
          },
          {
            type: "uint256",
            name: "_tokenId",
            internalType: "uint256",
          },
        ],
      },
      {
        type: "tuple",
        name: "",
        internalType: "struct Crea2orsManager.Offer",
        indexed: false,
        components: [
          {
            type: "address",
            name: "_offerAddress",
            internalType: "address",
          },
          {
            type: "uint256",
            name: "_offerPrice",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "_offerAmount",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "_offerTime",
            internalType: "uint256",
          },
        ],
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "OfferCancelled",
    inputs: [
      {
        type: "tuple",
        name: "",
        internalType: "struct Crea2orsManager.Token",
        indexed: false,
        components: [
          {
            type: "address",
            name: "_address",
            internalType: "address",
          },
          {
            type: "uint256",
            name: "_tokenId",
            internalType: "uint256",
          },
        ],
      },
      {
        type: "tuple",
        name: "",
        internalType: "struct Crea2orsManager.Offer",
        indexed: false,
        components: [
          {
            type: "address",
            name: "_offerAddress",
            internalType: "address",
          },
          {
            type: "uint256",
            name: "_offerPrice",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "_offerAmount",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "_offerTime",
            internalType: "uint256",
          },
        ],
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "OfferMade",
    inputs: [
      {
        type: "tuple",
        name: "",
        internalType: "struct Crea2orsManager.Token",
        indexed: false,
        components: [
          {
            type: "address",
            name: "_address",
            internalType: "address",
          },
          {
            type: "uint256",
            name: "_tokenId",
            internalType: "uint256",
          },
        ],
      },
      {
        type: "tuple",
        name: "",
        internalType: "struct Crea2orsManager.Offer",
        indexed: false,
        components: [
          {
            type: "address",
            name: "_offerAddress",
            internalType: "address",
          },
          {
            type: "uint256",
            name: "_offerPrice",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "_offerAmount",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "_offerTime",
            internalType: "uint256",
          },
        ],
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "OrderCancelled",
    inputs: [
      {
        type: "tuple",
        name: "",
        internalType: "struct Crea2orsManager.Order",
        indexed: false,
        components: [
          {
            type: "address",
            name: "_creator",
            internalType: "address",
          },
          {
            type: "address",
            name: "_nftAddress",
            internalType: "address",
          },
          {
            type: "uint256",
            name: "_tokenId",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "_amount",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "_price",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "_startTime",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "_endTime",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "_orderType",
            internalType: "uint256",
          },
          {
            type: "address",
            name: "_buyer",
            internalType: "address",
          },
          {
            type: "uint256",
            name: "_buyPrice",
            internalType: "uint256",
          },
        ],
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "OrderCreated",
    inputs: [
      {
        type: "tuple",
        name: "",
        internalType: "struct Crea2orsManager.Order",
        indexed: false,
        components: [
          {
            type: "address",
            name: "_creator",
            internalType: "address",
          },
          {
            type: "address",
            name: "_nftAddress",
            internalType: "address",
          },
          {
            type: "uint256",
            name: "_tokenId",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "_amount",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "_price",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "_startTime",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "_endTime",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "_orderType",
            internalType: "uint256",
          },
          {
            type: "address",
            name: "_buyer",
            internalType: "address",
          },
          {
            type: "uint256",
            name: "_buyPrice",
            internalType: "uint256",
          },
        ],
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "OrderFinalized",
    inputs: [
      {
        type: "tuple",
        name: "",
        internalType: "struct Crea2orsManager.Order",
        indexed: false,
        components: [
          {
            type: "address",
            name: "_creator",
            internalType: "address",
          },
          {
            type: "address",
            name: "_nftAddress",
            internalType: "address",
          },
          {
            type: "uint256",
            name: "_tokenId",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "_amount",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "_price",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "_startTime",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "_endTime",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "_orderType",
            internalType: "uint256",
          },
          {
            type: "address",
            name: "_buyer",
            internalType: "address",
          },
          {
            type: "uint256",
            name: "_buyPrice",
            internalType: "uint256",
          },
        ],
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "OrderNewBid",
    inputs: [
      {
        type: "tuple",
        name: "",
        internalType: "struct Crea2orsManager.Order",
        indexed: false,
        components: [
          {
            type: "address",
            name: "_creator",
            internalType: "address",
          },
          {
            type: "address",
            name: "_nftAddress",
            internalType: "address",
          },
          {
            type: "uint256",
            name: "_tokenId",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "_amount",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "_price",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "_startTime",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "_endTime",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "_orderType",
            internalType: "uint256",
          },
          {
            type: "address",
            name: "_buyer",
            internalType: "address",
          },
          {
            type: "uint256",
            name: "_buyPrice",
            internalType: "uint256",
          },
        ],
      },
    ],
    anonymous: false,
  },
  {
    type: "function",
    stateMutability: "payable",
    outputs: [
      {
        type: "bool",
        name: "",
        internalType: "bool",
      },
    ],
    name: "acceptOffer",
    inputs: [
      {
        type: "tuple",
        name: "token",
        internalType: "struct Crea2orsManager.Token",
        components: [
          {
            type: "address",
            name: "_address",
            internalType: "address",
          },
          {
            type: "uint256",
            name: "_tokenId",
            internalType: "uint256",
          },
        ],
      },
      {
        type: "tuple",
        name: "offer",
        internalType: "struct Crea2orsManager.Offer",
        components: [
          {
            type: "address",
            name: "_offerAddress",
            internalType: "address",
          },
          {
            type: "uint256",
            name: "_offerPrice",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "_offerAmount",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "_offerTime",
            internalType: "uint256",
          },
        ],
      },
    ],
  },
  {
    type: "function",
    stateMutability: "payable",
    outputs: [
      {
        type: "bool",
        name: "",
        internalType: "bool",
      },
    ],
    name: "buyAsset",
    inputs: [
      {
        type: "tuple",
        name: "order",
        internalType: "struct Crea2orsManager.Order",
        components: [
          {
            type: "address",
            name: "_creator",
            internalType: "address",
          },
          {
            type: "address",
            name: "_nftAddress",
            internalType: "address",
          },
          {
            type: "uint256",
            name: "_tokenId",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "_amount",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "_price",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "_startTime",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "_endTime",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "_orderType",
            internalType: "uint256",
          },
          {
            type: "address",
            name: "_buyer",
            internalType: "address",
          },
          {
            type: "uint256",
            name: "_buyPrice",
            internalType: "uint256",
          },
        ],
      },
    ],
  },
  {
    type: "function",
    stateMutability: "payable",
    outputs: [
      {
        type: "bool",
        name: "",
        internalType: "bool",
      },
    ],
    name: "cancelOffer",
    inputs: [
      {
        type: "tuple",
        name: "token",
        internalType: "struct Crea2orsManager.Token",
        components: [
          {
            type: "address",
            name: "_address",
            internalType: "address",
          },
          {
            type: "uint256",
            name: "_tokenId",
            internalType: "uint256",
          },
        ],
      },
      {
        type: "tuple",
        name: "offer",
        internalType: "struct Crea2orsManager.Offer",
        components: [
          {
            type: "address",
            name: "_offerAddress",
            internalType: "address",
          },
          {
            type: "uint256",
            name: "_offerPrice",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "_offerAmount",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "_offerTime",
            internalType: "uint256",
          },
        ],
      },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [
      {
        type: "bool",
        name: "",
        internalType: "bool",
      },
    ],
    name: "cancelOrder",
    inputs: [
      {
        type: "tuple",
        name: "order",
        internalType: "struct Crea2orsManager.Order",
        components: [
          {
            type: "address",
            name: "_creator",
            internalType: "address",
          },
          {
            type: "address",
            name: "_nftAddress",
            internalType: "address",
          },
          {
            type: "uint256",
            name: "_tokenId",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "_amount",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "_price",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "_startTime",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "_endTime",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "_orderType",
            internalType: "uint256",
          },
          {
            type: "address",
            name: "_buyer",
            internalType: "address",
          },
          {
            type: "uint256",
            name: "_buyPrice",
            internalType: "uint256",
          },
        ],
      },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "bool",
        name: "",
        internalType: "bool",
      },
    ],
    name: "cancelledOrFinalized",
    inputs: [
      {
        type: "bytes32",
        name: "",
        internalType: "bytes32",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [
      {
        type: "bool",
        name: "",
        internalType: "bool",
      },
    ],
    name: "createOrder",
    inputs: [
      {
        type: "tuple",
        name: "order",
        internalType: "struct Crea2orsManager.Order",
        components: [
          {
            type: "address",
            name: "_creator",
            internalType: "address",
          },
          {
            type: "address",
            name: "_nftAddress",
            internalType: "address",
          },
          {
            type: "uint256",
            name: "_tokenId",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "_amount",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "_price",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "_startTime",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "_endTime",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "_orderType",
            internalType: "uint256",
          },
          {
            type: "address",
            name: "_buyer",
            internalType: "address",
          },
          {
            type: "uint256",
            name: "_buyPrice",
            internalType: "uint256",
          },
        ],
      },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "bool",
        name: "",
        internalType: "bool",
      },
    ],
    name: "existOffer",
    inputs: [
      {
        type: "bytes32",
        name: "",
        internalType: "bytes32",
      },
      {
        type: "bytes32",
        name: "",
        internalType: "bytes32",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "bool",
        name: "",
        internalType: "bool",
      },
    ],
    name: "existOrder",
    inputs: [
      {
        type: "bytes32",
        name: "",
        internalType: "bytes32",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [
      {
        type: "bool",
        name: "",
        internalType: "bool",
      },
    ],
    name: "finalizeOrder",
    inputs: [
      {
        type: "tuple",
        name: "order",
        internalType: "struct Crea2orsManager.Order",
        components: [
          {
            type: "address",
            name: "_creator",
            internalType: "address",
          },
          {
            type: "address",
            name: "_nftAddress",
            internalType: "address",
          },
          {
            type: "uint256",
            name: "_tokenId",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "_amount",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "_price",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "_startTime",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "_endTime",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "_orderType",
            internalType: "uint256",
          },
          {
            type: "address",
            name: "_buyer",
            internalType: "address",
          },
          {
            type: "uint256",
            name: "_buyPrice",
            internalType: "uint256",
          },
        ],
      },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "uint8",
        name: "",
        internalType: "enum Crea2orsManager.OrderState",
      },
    ],
    name: "getOrderState",
    inputs: [
      {
        type: "tuple",
        name: "order",
        internalType: "struct Crea2orsManager.Order",
        components: [
          {
            type: "address",
            name: "_creator",
            internalType: "address",
          },
          {
            type: "address",
            name: "_nftAddress",
            internalType: "address",
          },
          {
            type: "uint256",
            name: "_tokenId",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "_amount",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "_price",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "_startTime",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "_endTime",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "_orderType",
            internalType: "uint256",
          },
          {
            type: "address",
            name: "_buyer",
            internalType: "address",
          },
          {
            type: "uint256",
            name: "_buyPrice",
            internalType: "uint256",
          },
        ],
      },
    ],
  },
  {
    type: "function",
    stateMutability: "payable",
    outputs: [
      {
        type: "bool",
        name: "",
        internalType: "bool",
      },
    ],
    name: "makeOffer",
    inputs: [
      {
        type: "tuple",
        name: "token",
        internalType: "struct Crea2orsManager.Token",
        components: [
          {
            type: "address",
            name: "_address",
            internalType: "address",
          },
          {
            type: "uint256",
            name: "_tokenId",
            internalType: "uint256",
          },
        ],
      },
      {
        type: "uint256",
        name: "_price",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "_amount",
        internalType: "uint256",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "address",
        name: "_offerAddress",
        internalType: "address",
      },
      {
        type: "uint256",
        name: "_offerPrice",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "_offerAmount",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "_offerTime",
        internalType: "uint256",
      },
    ],
    name: "offers",
    inputs: [
      {
        type: "bytes32",
        name: "",
        internalType: "bytes32",
      },
      {
        type: "bytes32",
        name: "",
        internalType: "bytes32",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "address",
        name: "_creator",
        internalType: "address",
      },
      {
        type: "address",
        name: "_nftAddress",
        internalType: "address",
      },
      {
        type: "uint256",
        name: "_tokenId",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "_amount",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "_price",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "_startTime",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "_endTime",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "_orderType",
        internalType: "uint256",
      },
      {
        type: "address",
        name: "_buyer",
        internalType: "address",
      },
      {
        type: "uint256",
        name: "_buyPrice",
        internalType: "uint256",
      },
    ],
    name: "orders",
    inputs: [
      {
        type: "bytes32",
        name: "",
        internalType: "bytes32",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "payable",
    outputs: [
      {
        type: "bool",
        name: "",
        internalType: "bool",
      },
    ],
    name: "placeBid",
    inputs: [
      {
        type: "tuple",
        name: "order",
        internalType: "struct Crea2orsManager.Order",
        components: [
          {
            type: "address",
            name: "_creator",
            internalType: "address",
          },
          {
            type: "address",
            name: "_nftAddress",
            internalType: "address",
          },
          {
            type: "uint256",
            name: "_tokenId",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "_amount",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "_price",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "_startTime",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "_endTime",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "_orderType",
            internalType: "uint256",
          },
          {
            type: "address",
            name: "_buyer",
            internalType: "address",
          },
          {
            type: "uint256",
            name: "_buyPrice",
            internalType: "uint256",
          },
        ],
      },
    ],
  },
];
