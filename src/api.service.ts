import * as http from 'http';
import * as https from 'https';
import axios, {AxiosInstance} from 'axios';
import { NFTCollection, NFTEntity } from './types';

export class RmrkSqApiService {
    connection: AxiosInstance;
    date: Date;
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

    async getLatestBlockForNftId(id: string): Promise<bigint> {
        const query = `
        query {
            nftEntities(last: 1, filter: {id: {equalTo: "${id}"}, timestampUpdatedAt: {lessThan: "${this.date.toDateString()}"}}) {
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

        return data.data.nftEntities.nodes[0].blockNumber as bigint;
    }

    async getLatestBlockForNftName(name: string): Promise<bigint> {
        const query = `
        query {
            nftEntities(last: 1, filter: {id: {equalTo: "${name}"}, timestampUpdatedAt: {lessThan: "${this.date.toDateString()}"}}) {
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

        return data.data.nftEntities.nodes[0].blockNumber as bigint;
    }

    async getLatestBlockForNftOwner(owner: string): Promise<bigint> {
        const query = `
        query {
            nftEntities(last: 1, filter: {id: {equalTo: "${owner}"}, timestampUpdatedAt: {lessThan: "${this.date.toDateString()}"}}) {
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

        return data.data.nftEntities.nodes[0].blockNumber as bigint;
    }

    async getLatestBlockForColId(id: string): Promise<bigint> {
        const query = `
        query {
            collectionEntities(last: 1, filter: {id: {equalTo: "${id}"}, timestampUpdatedAt: {lessThan: "${this.date.toDateString()}"}} ) {
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

        return data.data.collectionEntities.nodes[0].blockNumber as bigint;
    }

    async getLatestBlockForColName(name: string): Promise<bigint> {
        const query = `
        query {
            collectionEntities(last: 1, filter: {id: {equalTo: "${name}"}, timestampUpdatedAt: {lessThan: "${this.date.toDateString()}"}} ) {
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

        return data.data.collectionEntities.nodes[0].blockNumber as bigint
    }

    async getLatestBlockForColOwner(owner: string): Promise<bigint> {
        const query = `
        query {
            collectionEntities(last: 1, filter: {id: {equalTo: "${owner}"}, timestampUpdatedAt: {lessThan: "${this.date.toDateString()}"}} ) {
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

        return data.data.collectionEntities.nodes[0].blockNumber as bigint;
    }

    async nftById(id: string): Promise<NFTEntity> {
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

        return data.data.nftEntities.nodes[0] as NFTEntity;
    }

    async nftByName(name: string): Promise<NFTEntity[]> {
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

        return data.data.nftEntities.nodes as NFTEntity[];
    }

    async nftsByOwner(owner: string): Promise<NFTEntity[]> {
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

        return data.data.nftEntities.nodes as NFTEntity[];
    }

    async collectionById(id: string): Promise<NFTCollection> {
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

        return data.data.collectionEntities.nodes[0] as NFTCollection;
    }

    async collectionByName(name: string): Promise<NFTCollection> {
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

        return data.data.collectionEntities.nodes[0] as NFTCollection;
    }

    async collectionByOwner(owner: string): Promise<NFTCollection[]> {
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

        return data.data.collectionEntities.nodes as NFTCollection[];
    }

    async customQuery(query: string): Promise<any> {
        const {data} = await this.connection.get(
            '/',
            {
                params: {
                    query: query
                }
            }
        ) 

        return data.data;
    }
}