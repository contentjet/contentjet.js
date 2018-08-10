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

class Client {

  isAuthenticated: boolean;
  options: IClientOptions;
  client: AxiosInstance;

  constructor(options: IClientOptions) {
    this.isAuthenticated = false;
    this.options = options;
    this.client = axios.create({
      baseURL: options.baseUrl
    });
  }

  async authenticate() {
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
        'Authorization': `Bearer ${response.data.access_token}`
      }
    });
    this.isAuthenticated = true;
  }

  async getEntry(entryId: number): Promise<any> {
    const response = await this.client.get(
      `/project/${this.options.projectId}/entry/${entryId}`
    );
    return response.data;
  }

  async listEntries(params: IListEntriesParams) {
    const response = await this.client.get(
      `/project/${this.options.projectId}/entry/`,
      {
        params
      }
    )
    return response.data;
  }

  async getEntryType(entryTypeId: number): Promise<any> {
    const response = await this.client.get(
      `/project/${this.options.projectId}/entry-type/${entryTypeId}`
    );
    return response.data;
  }

  async listEntryTypes(): Promise<any> {
    const response = await this.client.get(
      `/project/${this.options.projectId}/entry-type/`
    );
    return response.data;
  }

}

export default Client;
