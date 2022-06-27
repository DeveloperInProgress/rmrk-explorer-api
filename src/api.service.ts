import * as http from 'http';
import * as https from 'https';
import axios, {AxiosError, AxiosInstance} from 'axios';
import { NFTCollection, NFTEntity } from './types';
import { wrapNFTs } from './utils';

export class RmrkSqApiService {
    connection: AxiosInstance;
    blockHeight: bigint;
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

    async getLatestIndexedBlock(): Promise<bigint> {
        const query = `
        query {
            _metadata {
                lastProcessedHeight
            }
        }
        ` 

        try {
            const {data} = await this.connection.get(
                '/',
                {
                    params: {
                        query: query
                    }
                }
            ) 
            return data.data._metadata.lastProcessedHeight as bigint;
        } catch(e) {
            throw e;
        }
    }

    /*
    async getLatestBlockForNftId(id: string): Promise<bigint> {
        const query = `
        query {
            nFTEntities(last: 1, filter: {id: {equalTo: "${id}"}, timestampUpdatedAt: {lessThan: "${this.blockHeight}"}}) {
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
    */

    async nftById(id: string): Promise<NFTEntity> {
        if(!this.blockHeight) {
            this.blockHeight = await this.getLatestIndexedBlock();
        }
        const query = `
        query {
            nFTEntities(blockHeight: "${this.blockHeight}", filter: {id: {equalTo: "${id}"}}) {
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

        try {
            const {data} = await this.connection.get(
                '/',
                {
                    params: {
                        query: query
                    }
                }
            )
            return data.data.nFTEntities.nodes[0] as NFTEntity;
        } catch(e) {
            throw e;
        }
    }

    async nftByName(name: string): Promise<NFTEntity[]> {
        if(!this.blockHeight) {
            this.blockHeight = await this.getLatestIndexedBlock();
        }
        const query = `
        query {
            nFTEntities(blockHeight: "${this.blockHeight}", filter: {name: {equalTo: "${name}"}}) {
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

        return data.data.nFTEntities.nodes as NFTEntity[];
    }

    async nftsByOwner(owner: string): Promise<NFTEntity[]> {
        if(!this.blockHeight) {
            this.blockHeight = await this.getLatestIndexedBlock();
        }
        const query = `
        query {
            nftEntities(blockHeight: "${this.blockHeight}", filter: {owner: {equalTo: "${owner}"}}) {
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

        return data.data.nFTEntities.nodes as NFTEntity[];
    }

    async collectionById(id: string): Promise<NFTCollection> {
        if(!this.blockHeight) {
            this.blockHeight = await this.getLatestIndexedBlock();
        }
        const query = `
        query {
            collectionEntities(blockHeight: "${this.blockHeight}", filter: {id: {equalTo: "${id}"}}) {
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
                    timestampUpdatedAt
                    eventId
                    nfts {
                        edges {
                            node {
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
                }
            }
        }
        `

        let {data} = await this.connection.get(
            '/',
            {
                params: {
                    query: query
                }
            }
        )

        const collection = data.data.collectionEntities.nodes[0];
        collection.nfts = wrapNFTs(collection.nfts);
        return collection as NFTCollection;
    }

    async collectionByName(name: string): Promise<NFTCollection> {
        if(!this.blockHeight) {
            this.blockHeight = await this.getLatestIndexedBlock();
        }
        const query = `
        query {
            collectionEntities(blockHeight: "${this.blockHeight}", filter: {name: {equalTo: "${name}"}}) {
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
                    timestampUpdatedAt
                    eventId
                    nfts {
                        edges {
                            node {
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

        const collection = data.data.collectionEntities.nodes[0];
        collection.nfts = wrapNFTs(collection.nfts);
        return collection as NFTCollection;
    }

    async collectionByOwner(owner: string): Promise<NFTCollection[]> {
        if(!this.blockHeight) {
            this.blockHeight = await this.getLatestIndexedBlock();
        }
        const query = `
        query {
            collectionEntities(blockHeight: "${this.blockHeight}", filter: {currentOwner: {equalTo: "${owner}"}}) {
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
                    timestampUpdatedAt
                    eventId
                    nfts {
                        edges {
                            node {
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

        let collections = data.data.collectionEntities.nodes;
        collections = (collections as any[]).map((collection)=>wrapNFTs(collection.nfts));
        return collections as NFTCollection[];
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