import {
  SuckerTransactionStatus,
  SuckerTransactionsDocument,
  SuckerTransactionsQuery,
  SuckerTransactionsQueryVariables,
} from "@/generated/graphql";
import { getBendystrawClient } from "@/graphql/bendystrawClient";

export async function getSuckerTransactions(
  suckerGroupId: string,
  version: number,
  chainId: number,
  status?: SuckerTransactionStatus,
) {
  try {
    const client = getBendystrawClient(chainId);
    const result = await client.request<
      SuckerTransactionsQuery,
      SuckerTransactionsQueryVariables
    >(SuckerTransactionsDocument, { suckerGroupId, version, status });
    return result.suckerTransactions?.items ?? [];
  } catch (err) {
    console.error((err as any).message);
    return [];
  }
}
