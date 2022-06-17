import { RmrkSqApiService } from "./api.service";
import { NFTEntity } from "./types";
import { numberOfSales } from "./utils";

export class NftEntityService {
    api: RmrkSqApiService

    constructor(
        api: RmrkSqApiService
    ) {
        this.api = api
    }

    async salesCount(nft: NFTEntity) {
        const query = `
        query {
            nftEntities(filter: {id: {equalTo: "${nft.id}"}, timestampUpdatedAt: {lessThan: "${this.api.date.toDateString()}"}}) {
                nodes {
                    currentOwner
                }
            }
        }
        `
        const data = this.api.customQuery(query);
        const ownersList = (data as any).nftEntities.nodes.map((node) => node.currentOwner);
        return numberOfSales(ownersList);
    }

    async uniqueOwnersOverTime(nft: NFTEntity) {
        const query = `
        query {
            nftEntities(filter: {id: {equalTo: "${nft.id}"}, blockNumber: {lessThan: "${this.api.date.toDateString()}"}}) {
                nodes {
                    currentOwner
                }
            }
        }
        `
        const data = this.api.customQuery(query);
        const ownersList = (data as any).nftEntities.nodes.map((node) => node.currentOwner);
        return new Set(ownersList).size;
    }
}