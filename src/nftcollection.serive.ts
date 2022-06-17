import { RmrkSqApiService } from "./api.service";
import { NftEntityService } from "./nftentity.service";
import { NFTCollection } from "./types";

export class NftCollectionService {
    api: RmrkSqApiService;
    nftService: NftEntityService;
    constructor(
        api: RmrkSqApiService
    ){
        this.api = api
        this.nftService = new NftEntityService(api);
    }

    nftCount(collection: NFTCollection): number {
        return collection.nfts.length
    }

    async salesCount(collection: NFTCollection): Promise<number> {
        let count = 0;
        for (const nft of collection.nfts) {
             count += await this.nftService.salesCount(nft);
        }
        return count;
    }

    async floorPrice(collectionId: string) {

    }

    async uniqueOwnersCount(collection: NFTCollection): Promise<number> {
        const owners = collection.nfts.map((nft) => nft.currentOwner);
        return new Set(owners).size;
    }
}