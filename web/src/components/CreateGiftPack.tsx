import { useMemo, useEffect, useState } from "react";
import { Transaction, TransactionButton, TransactionStatusLabel, TransactionStatus, TransactionStatusAction } from "@coinbase/onchainkit/transaction"
import { encode, getContract, ZERO_ADDRESS } from "thirdweb";
import { CHAIN, GIFT_PACK_ADDRESS, CLIENT } from "~/constants";
import { createPack } from "~/thirdweb/84532/0xa9dc74673fb099885e830eb534b89e65dd5a68f6";
import { approve as approveERC20 } from "thirdweb/extensions/erc20";
import { approve as approveERC721 } from "thirdweb/extensions/erc721";
import { setApprovalForAll as setApprovalForAllERC1155 } from "thirdweb/extensions/erc1155";
import { isAddressEqual } from "viem";

type Props = {
  erc20s: { token: string; amount: string }[];
  erc721s: { token: string; tokenId: string }[];
  erc1155s: { token: string; tokenId: string; amount: string }[];
  ethAmount: string;
};

type Call = {
  to: `0x${string}`;
  data: `0x${string}`;
  value: bigint;
};

export function CreateGiftPack({ erc20s, erc721s, erc1155s, ethAmount }: Props) {
  const createPackTransaction = useMemo(async () => {
    const tx = createPack({
      contract: getContract({
        chain: CHAIN,
        address: GIFT_PACK_ADDRESS,
        client: CLIENT,
      }),
      erc20Tokens: erc20s.map(({ token, amount }) => ({
        tokenAddress: token,
        amount: BigInt(amount),
      })),
      erc721Tokens: erc721s.map(({ token, tokenId }) => ({
        tokenAddress: token,
        tokenId: BigInt(tokenId),
      })),
      erc1155Tokens: erc1155s.map(({ token, tokenId, amount }) => ({
        tokenAddress: token,
        tokenId: BigInt(tokenId),
        amount: BigInt(amount),
      }))
    });

    
    return {
      to: tx.to as `0x${string}`,
      value: BigInt(ethAmount),
      data: await encode(tx),
    };
  }, [erc20s, erc721s, erc1155s, ethAmount]);

  const erc20ApprovalTransactions = useMemo(() => {
    return erc20s
      .filter(({ token }) => !isAddressEqual(token, ZERO_ADDRESS))
      .map(({ token, amount }) => {
        return approveERC20({
          contract: getContract({
            chain: CHAIN,
            address: token,
            client: CLIENT,
          }),
          spender: GIFT_PACK_ADDRESS as `0x${string}`,
          amountWei: BigInt(amount),
        });
    });
  }, [erc20s]);

  const erc721ApprovalTransactions = useMemo(() => {
    return erc721s.map(({ token, tokenId }) => {
      return approveERC721({
        contract: getContract({
          chain: CHAIN,
          address: token,
          client: CLIENT,
        }),
        to: GIFT_PACK_ADDRESS as `0x${string}`,
        tokenId: BigInt(tokenId),
      });
    });
  }, [erc721s]);

  const erc1155ApprovalTransactions = useMemo(() => {
    return erc1155s.map(({ token }) => {
      return setApprovalForAllERC1155({
        contract: getContract({
          chain: CHAIN,
          address: token,
          client: CLIENT,
        }),
        operator: GIFT_PACK_ADDRESS as `0x${string}`,
        approved: true,
      });
    });
  }, [erc1155s]);

  const [calls, setCalls] = useState<Call[]>([]);

  useEffect(() => {
    const prepareCalls = async () => {
      const preparedCalls = await Promise.all([
        ...erc20ApprovalTransactions.map(async tx => ({
          to: tx.to as `0x${string}`,
          data: await encode(tx),
          value: BigInt(0)
        })),
        ...erc721ApprovalTransactions.map(async tx => ({
          to: tx.to as `0x${string}`,
          data: await encode(tx),
          value: BigInt(0)
        })),
        ...erc1155ApprovalTransactions.map(async tx => ({
          to: tx.to as `0x${string}`,
          data: await encode(tx),
          value: BigInt(0)
        })),
        {
          to: (await createPackTransaction).to,
          data: (await createPackTransaction).data,
          value: (await createPackTransaction).value
        }
      ]);
      setCalls(preparedCalls);
    };

    void prepareCalls();
  }, [erc20ApprovalTransactions, erc721ApprovalTransactions, erc1155ApprovalTransactions, createPackTransaction]);

  return (
    <div className="p-4 flex flex-col items-center justify-center">
      <Transaction
        calls={calls}
        isSponsored
        >
        <TransactionButton 
          text="Create Gift Pack"
          className="px-4 py-2 text-lg font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
        />
        <TransactionStatus>
          <TransactionStatusLabel />
          <TransactionStatusAction />
        </TransactionStatus>
      </Transaction>
    </div>
  );
} 