import { RmrkSqApiService } from "./api.service";
import { NFTEntity } from "./types";

export function numberOfSales(ownerList: string[]): number {
    const origList = ownerList;
    ownerList.shift();
    const sales = ownerList.map((owner, i)=>{
        return owner === ownerList[i-1] ? 0 : 1;
    }).reduce((sum, toAdd) => sum + toAdd, 0);
    return sales;
}

export function wrapNFTs(nfts: any): NFTEntity[] {
    const wrappedNfts = nfts.edges.map((edge) => edge.node as NFTEntity)
    return wrappedNfts
}

export async function getLatestBlockForTimestamp(timestamp: Date, api: RmrkSqApiService): Promise<bigint> {
    const query = `
    query {
        blockTimestamps(last: 1, filter: {timestamp: {lessThanOrEqualTo: "${timestamp.toISOString()}"}}) {
            nodes {
                blockNumber
            }
        }
    }
    `

    const {data} = await api.connection.get(
        '/',
        {
            params: {
                query: query
            }
        }
    )

    return data.data.blockTimestamps.nodes[0].blockNumber as bigint;
}