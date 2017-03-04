const axios = require('axios');


const authenticate = (username, password) => {
  let data = {
    username: username,
    password: password,
    grant_type: 'password'
  };
  return axios.post('https://api.contentjet.io/v1/authenticate/', data);
}


const tokenRefresh = (refreshToken) => {
  let data = {
    refresh_token: refreshToken,
    grant_type: 'refresh_token'
  };
  return axios.post('https://api.contentjet.io/v1/token-refresh/', data);
}


const createInstance = (projectUUID, accessToken) => {
  return axios.create({
    baseURL: `https://api.contentjet.io/v1/project/${projectUUID}/`,
    timeout: 10000,
    headers: { 'Authorization': `Bearer ${accessToken}` }
  });
}


const getClient = (options) => {

  let instance;
  let timeoutId;
  let projectUUID = options.projectUUID;

  return authenticate(options.username, options.password).then(response => {

    let accessToken = response.data.access_token;
    let refreshToken = response.data.refresh_token;
    let expiresIn = response.data.expires_in;  // Seconds

    instance = createInstance(projectUUID, accessToken);

    const refreshTimer = () => {
      timeoutId = setTimeout(() => {

        tokenRefresh(refreshToken).then(response => {
          accessToken = response.data.access_token;
          refreshToken = response.data.refresh_token;
          expiresIn = response.data.expires_in;
          instance = createInstance(projectUUID, accessToken);
          refreshTimer();
        });

      }, (expiresIn - 60) * 1000);
    }
    refreshTimer();

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

    const destroy = () => {
      clearTimeout(timeoutId);
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
  });

};


module.exports = { getClient };
