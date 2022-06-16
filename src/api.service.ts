import * as http from 'http';
import * as https from 'https';
import axios, {AxiosInstance} from 'axios';

export class RmrkSqApiService {
    connection: AxiosInstance;
    height: bigint;
    constructor(
        endpoint: string
    ) {
        const httpAgent = new http.Agent({ keepAlive: true });
        const httpsAgent = new https.Agent({ keepAlive: true });
        
        this.connection = axios.create({
            httpAgent,
            httpsAgent,
            baseURL: endpoint,
            headers: {
                Accept: 'application/json'
            }
        })
    }

    async nftById(id: string) {

    }

    async nftByName(name: string) {

    }

    async nftsByOwner(owner: string) {

    }

    async collectionById(id: string) {

    }

    async collectionByName(name: string) {

    }

    async collectionByOwner(owner: string) {

    }
}