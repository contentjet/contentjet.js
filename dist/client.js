"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
class Client {
    constructor(options) {
        this.isAuthenticated = false;
        this.options = options;
        this.client = axios_1.default.create({
            baseURL: options.baseUrl
        });
    }
    async authenticate() {
        const response = await this.client.post(`/project/${this.options.projectId}/client/authenticate`, {
            client_id: this.options.clientId,
            client_secret: this.options.clientSecret,
            grant_type: 'client_credentials'
        });
        this.client = axios_1.default.create({
            baseURL: this.options.baseUrl,
            headers: {
                'Authorization': `Bearer ${response.data.access_token}`
            }
        });
        this.isAuthenticated = true;
    }
    async getEntry(entryId) {
        const response = await this.client.get(`/project/${this.options.projectId}/entry/${entryId}`);
        return response.data;
    }
    async listEntries(params) {
        const response = await this.client.get(`/project/${this.options.projectId}/entry/`, {
            params
        });
        return response.data;
    }
    async getEntryType(entryTypeId) {
        const response = await this.client.get(`/project/${this.options.projectId}/entry-type/${entryTypeId}`);
        return response.data;
    }
    async listEntryTypes() {
        const response = await this.client.get(`/project/${this.options.projectId}/entry-type/`);
        return response.data;
    }
}
exports.default = Client;
