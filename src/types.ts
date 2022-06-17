export interface NFTEntity {
    name: string;
    instance: string;
    collection: NFTCollection;
    issuer: string;
    sn: string;
    id: string;
    metadata: string;
    currentOwner: string;
    price: bigint;
    burned: boolean;
    blockNumber: bigint;
    events: any;
    timestampCreateAt: Date;
    timestampUpdatedAt: Date;
    priority: any;
    resources: any;
    children: any;
    eventId: string;
}

export interface NFTCollection {
    version: string;
    name: string;
    max: number;
    issuer: string;
    symbol: String;
    id: string;
    metadata: string;
    currentOwner: string;
    events: any;
    blockNumber: bigint;
    timestampCreatedAt: Date;
    timestampUpdatedAt: Date;
    eventId: string;
    nfts: NFTEntity[];
}