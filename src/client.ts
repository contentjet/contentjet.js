import axios, { AxiosInstance } from 'axios';

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

class Client {

  private isAuthenticated: boolean;
  private options: IClientOptions;
  private client: AxiosInstance;

  constructor(options: IClientOptions) {
    this.isAuthenticated = false;
    this.options = options;
    this.client = axios.create({
      baseURL: options.baseUrl
    });
  }

  public async authenticate(): Promise<Client> {
    const response = await this.client.post(
      `/project/${this.options.projectId}/client/authenticate`,
      {
        client_id: this.options.clientId,
        client_secret: this.options.clientSecret,
        grant_type: 'client_credentials'
      }
    );
    this.client = axios.create({
      baseURL: this.options.baseUrl,
      headers: {
        Authorization: `Bearer ${response.data.access_token}`
      }
    });
    this.isAuthenticated = true;
    return this as Client;
  }

  public async getEntry(entryId: number): Promise<IEntry> {
    const response = await this.client.get(
      `/project/${this.options.projectId}/entry/${entryId}`
    );
    return response.data as IEntry;
  }

  public async listEntries(params?: IListEntriesParams): Promise<IEntryListResponse> {
    const response = await this.client.get(
      `/project/${this.options.projectId}/entry/`,
      {
        params
      }
    );
    return response.data as IEntryListResponse;
  }

  public async getEntryType(entryTypeId: number): Promise<any> {
    const response = await this.client.get(
      `/project/${this.options.projectId}/entry-type/${entryTypeId}`
    );
    return response.data;
  }

  public async listEntryTypes(): Promise<any> {
    const response = await this.client.get(
      `/project/${this.options.projectId}/entry-type/`
    );
    return response.data;
  }

}

export default Client;
