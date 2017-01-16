const axios = require('axios');


const getClient = (options) => {
  const instance = axios.create({
    baseURL: `https://api.contentjet.io/v1/project/${options.projectUUID}/`,
    timeout: 10000,
    headers: { 'Authorization': `Bearer ${options.apiKey}` }
  });

  const getProject = () => {
    return instance.get().then(result => result.data);
  }

  const getEntry = (entryUUID) => {
    return instance.get(`entry/${entryUUID}`).then(result => result.data);
  }

  const listEntries = (queryParameters) => {
    return instance.get('entry/', { params: queryParameters }).then(result => result.data);
  }

  const getEntryType = (entryTypeUUID) => {
    return instance.get(`entry-type/${entryTypeUUID}`).then(result => result.data);
  }

  const listEntryTypes = (queryParameters) => {
    return instance.get('entry-type/', { params: queryParameters }).then(result => result.data);
  }

  const getMedia = (mediaUUID) => {
    return instance.get(`media/${mediaUUID}`).then(result => result.data);
  }

  const listMedia = (queryParameters) => {
    return instance.get('media/', { params: queryParameters }).then(result => result.data);
  }

  return {
    project: {
      get: getProject
    },
    entry: {
      get: getEntry,
      list: listEntries
    },
    entryType: {
      get: getEntryType,
      list: listEntryTypes
    },
    media: {
      get: getMedia,
      list: listMedia
    }
  }

};


module.exports = { getClient };
