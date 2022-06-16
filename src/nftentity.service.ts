import { RmrkSqApiService } from "./api.service";

export class NftEntityService {
    api: RmrkSqApiService

    constructor(
        api: RmrkSqApiService
    ) {
        this.api = api
    }

    
}