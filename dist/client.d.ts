import { AxiosInstance } from 'axios';
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
}
declare class Client {
    isAuthenticated: boolean;
    options: IClientOptions;
    client: AxiosInstance;
    constructor(options: IClientOptions);
    authenticate(): Promise<void>;
    getEntry(entryId: number): Promise<any>;
    listEntries(params: IListEntriesParams): Promise<any>;
    getEntryType(entryTypeId: number): Promise<any>;
    listEntryTypes(): Promise<any>;
}
export default Client;
