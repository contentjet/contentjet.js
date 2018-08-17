interface IClientOptions {
    baseUrl: string;
    projectId: number;
    clientId: string;
    clientSecret: string;
}
interface IListEntriesParams {
    entryType?: number;
    tags?: string;
    nonPublished?: number;
    search?: string;
    orderBy?: string;
    page?: number;
    pageSize?: number;
}
interface IEntryListItem {
    id: number;
    projectId: number;
    name: string;
    metadata: string;
    description: string;
    createdAt: string;
    modifiedAt: string;
}
interface IEntryListResponse {
    page: number;
    totalPages: number;
    totalRecords: number;
    results: IEntryListItem[];
}
interface IUser {
    id: number;
    email: string;
    name: string;
    isActive: boolean;
    isAdmin: boolean;
    createdAt: string;
    modifiedAt: string;
}
interface IEntryType {
    id: number;
    projectId: number;
    userId: number;
    name: string;
    metadata: string;
    description: string;
    createdAt: string;
    modifiedAt: string;
}
interface IEntry {
    id: number;
    entryTypeId: number;
    userId: number;
    modifiedByUserId: string;
    name: string;
    published: string;
    fields: any;
    createdAt: string;
    modifiedAt: string;
    user: IUser;
    entryType: IEntryType;
    tags: string[];
    modifiedByUser: IUser;
}
declare class Client {
    private isAuthenticated;
    private options;
    private client;
    constructor(options: IClientOptions);
    authenticate(): Promise<Client>;
    getEntry(entryId: number): Promise<IEntry>;
    listEntries(params?: IListEntriesParams): Promise<IEntryListResponse>;
    getEntryType(entryTypeId: number): Promise<any>;
    listEntryTypes(): Promise<any>;
}
export default Client;
