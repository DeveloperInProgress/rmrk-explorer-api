import { RmrkSqApiService } from "./api.service";

export class NftCollectionService {
    api: RmrkSqApiService;

    constructor(
        api: RmrkSqApiService
    ){
        this.api = api
    }

    async nftCount(collectionId: string) {

    }

    async salesCount(collectionId: string) {

    }

    async floorPrice(collectionId: string) {

    }

    async uniqueOwnersCount(collectionId: string) {

    }
}