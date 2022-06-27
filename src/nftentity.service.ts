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
            nFTEntities(blockHeight: "${this.api.blockHeight}", filter: {id: {equalTo: "${nft.id}"}}) {
                nodes {
                    owners
                }
            }
        }
        `
        const data = await this.api.customQuery(query);
        const ownersList = (data as any).nFTEntities.nodes[0].owners;
        return numberOfSales(ownersList);
    }

    async uniqueOwnersOverTime(nft: NFTEntity) {
        const query = `
        query {
            nFTEntities(blockHeight: "${this.api.blockHeight}", filter: {id: {equalTo: "${nft.id}"}}) {
                nodes {
                    owners
                }
            }
        }
        `
        const data = await this.api.customQuery(query);
        const ownersList = (data as any).nFTEntities.nodes[0].owners;
        return new Set(ownersList).size;
    }
}