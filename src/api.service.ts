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

    async getLatestBlockForNftId(id: string) {
        const query = `
        query {
            nftEntities(last: 1, filter: {id: {equalTo: "${id}"}, blockNumber: {lessThan: "${this.height}"}}) {
                id
                blockNumber
            }
        }
        `
        const {data} = await this.connection.get(
            '/',
            {
                params: {
                    query: query
                }
            }
        )

        return data.data.nftEntities.nodes[0].blockNumber
    }

    async getLatestBlockForNftName(name: string) {
        const query = `
        query {
            nftEntities(last: 1, filter: {id: {equalTo: "${name}"}, blockNumber: {lessThan: "${this.height}"}}) {
                id
                blockNumber
            }
        }
        `
        const {data} = await this.connection.get(
            '/',
            {
                params: {
                    query: query
                }
            }
        )

        return data.data.nftEntities.nodes[0].blockNumber
    }

    async getLatestBlockForNftOwner(owner: string) {
        const query = `
        query {
            nftEntities(last: 1, filter: {id: {equalTo: "${owner}"}, blockNumber: {lessThan: "${this.height}"}}) {
                id
                blockNumber
            }
        }
        `
        const {data} = await this.connection.get(
            '/',
            {
                params: {
                    query: query
                }
            }
        )

        return data.data.nftEntities.nodes[0].blockNumber
    }

    async getLatestBlockForColId(id: string) {
        const query = `
        query {
            collectionEntities(last: 1, filter: {id: {equalTo: "${id}"}, blockNumber: {lessThan: "${this.height}"}} ) {
                id
                blockNumber
            }
        }
        `

        const {data} = await this.connection.get(
            '/',
            {
                params: {
                    query: query
                }
            }
        )

        return data.data.collectionEntities.nodes[0].blockNumber
    }

    async getLatestBlockForColName(name: string) {
        const query = `
        query {
            collectionEntities(last: 1, filter: {id: {equalTo: "${name}"}, blockNumber: {lessThan: "${this.height}"}} ) {
                id
                blockNumber
            }
        }
        `

        const {data} = await this.connection.get(
            '/',
            {
                params: {
                    query: query
                }
            }
        )

        return data.data.collectionEntities.nodes[0].blockNumber
    }

    async getLatestBlockForColOwner(owner: string) {
        const query = `
        query {
            collectionEntities(last: 1, filter: {id: {equalTo: "${owner}"}, blockNumber: {lessThan: "${this.height}"}} ) {
                id
                blockNumber
            }
        }
        `

        const {data} = await this.connection.get(
            '/',
            {
                params: {
                    query: query
                }
            }
        )

        return data.data.collectionEntities.nodes[0].blockNumber
    }

    async nftById(id: string) {
        const block = await this.getLatestBlockForNftId(id)
        const query = `
        query {
            nftEntities(filter: {id: {equalTo: "${id}"}, blockNumber: {equalTo: "${block}"}}) {
                nodes {
                    name
                    instance
                    transferable
                    collectionId
                    issuer
                    sn
                    id
                    metadata
                    currentOwner
                    price
                    burned
                    blockNumber
                    events
                    timestampCreatedAt
                    timestampUpdatedAt
                    priority
                    resources
                    children
                    eventId
                    collectionId
                }
            }
        }
        `
        const {data} = await this.connection.get(
            '/',
            {
                params: {
                    query: query
                }
            }
        )

        return data.data.nftEntities.nodes[0];
    }

    async nftByName(name: string) {
        const block = await this.getLatestBlockForNftName(name)
        const query = `
        query {
            nftEntities(filter: {name: {equalTo: "${name}"}, blockNumber: {equalTo: "${block}"}}) {
                nodes {
                    name
                    instance
                    transferable
                    collectionId
                    issuer
                    sn
                    id
                    metadata
                    currentOwner
                    price
                    burned
                    blockNumber
                    events
                    timestampCreatedAt
                    timestampUpdatedAt
                    priority
                    resources
                    children
                    eventId
                    collectionId
                }
            }
        }
        `

        const {data} = await this.connection.get(
            '/',
            {
                params: {
                    query: query
                }
            }
        )

        return data.data.nftEntities.nodes;
    }

    async nftsByOwner(owner: string) {
        const block = await this.getLatestBlockForNftOwner(owner)
        const query = `
        query {
            nftEntities(filter: {owner: {equalTo: "${owner}"}, blockNumber: {equalTo: "${block}"}}) {
                nodes {
                    name
                    instance
                    transferable
                    collectionId
                    issuer
                    sn
                    id
                    metadata
                    currentOwner
                    price
                    burned
                    blockNumber
                    events
                    timestampCreatedAt
                    timestampUpdatedAt
                    priority
                    resources
                    children
                    eventId
                    collectionId
                }
            }
        }
        `

        const {data} = await this.connection.get(
            '/',
            {
                params: {
                    query: query
                }
            }
        )

        return data.data.nftEntities.nodes;
    }

    async collectionById(id: string) {
        const block = await this.getLatestBlockForColId(id)
        const query = `
        query {
            collectionEntities(filter: {id: {equalTo: "${id}"}, blockNumber: {equalTo: "${block}"}}) {
                nodes {
                    version
                    name
                    max
                    issuer
                    symbol
                    id
                    metadata
                    currentOwner
                    events
                    blockNumber
                    timestampCreatedAt
                    timestampUpdateAt
                    eventId
                    nfts {
                        edges {
                            node {
                                id
                            }
                        }
                    }
                }
            }
        }
        `
        const {data} = await this.connection.get(
            '/',
            {
                params: {
                    query: query
                }
            }
        )

        return data.data.collectionEntities.nodes[0];
    }

    async collectionByName(name: string) {
        const block = await this.getLatestBlockForColName(name)
        const query = `
        query {
            collectionEntities(filter: {id: {equalTo: "${name}"}, blockNumber: {equalTo: "${block}"}}) {
                nodes {
                    version
                    name
                    max
                    issuer
                    symbol
                    id
                    metadata
                    currentOwner
                    events
                    blockNumber
                    timestampCreatedAt
                    timestampUpdateAt
                    eventId
                    nfts {
                        edges {
                            node {
                                id
                            }
                        }
                    }
                }
            }
        }
        `
        const {data} = await this.connection.get(
            '/',
            {
                params: {
                    query: query
                }
            }
        )

        return data.data.collectionEntities.nodes[0];
    }

    async collectionByOwner(owner: string) {
        const block = await this.getLatestBlockForColOwner(owner)
        const query = `
        query {
            collectionEntities(filter: {id: {equalTo: "${owner}"}, blockNumber: {equalTo: "${block}"}}) {
                nodes {
                    version
                    name
                    max
                    issuer
                    symbol
                    id
                    metadata
                    currentOwner
                    events
                    blockNumber
                    timestampCreatedAt
                    timestampUpdateAt
                    eventId
                    nfts {
                        edges {
                            node {
                                id
                            }
                        }
                    }
                }
            }
        }
        `
        const {data} = await this.connection.get(
            '/',
            {
                params: {
                    query: query
                }
            }
        )

        return data.data.collectionEntities.nodes;
    }
}