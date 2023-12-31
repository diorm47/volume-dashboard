const mainApiOptions = {
  baseUrl: "https://api.nvolume.com",

  headers: {
    Accept: "*/*",
    "Content-Type": "application/json",
  },
};

class MainApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  _checkResponseStatus(response) {
    return response.ok
      ? response.json()
      : response.json().then((err) => Promise.reject(err.message));
  }
  async _sendRequest({
    endpoint,
    method = "GET",
    body,
    requiresToken = false,
  }) {
    const headers = { ...this._headers };

    if (requiresToken) {
      headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    }

    const res = await fetch(`${this._baseUrl}${endpoint}`, {
      method,
      headers,
      body: JSON.stringify(body),
    });

    return this._checkResponseStatus(res);
  }

  // Sign actions list
  async authorizationAction(userData) {
    return this._sendRequest({
      endpoint: `/public-api/v1/users/register`,
      method: "POST",
      body: userData,
    });
  }
  async loginAction(userData) {
    return this._sendRequest({
      endpoint: `/public-api/v1/users/login`,
      method: "POST",
      body: userData,
    });
  }

  // User me
  async reEnter() {
    return this._sendRequest({
      endpoint: "/private-api/v1/users/base",
      requiresToken: true,
    });
  }
  async logout() {
    return this._sendRequest({
      endpoint: "/private-api/v1/users/logout",
      requiresToken: true,
      method: "POST",
    });
  }
}

export const mainApi = new MainApi(mainApiOptions);
