import axios from 'axios'

import { PathUtils } from 'utils'

import Error3 from './error3'

function normalizeUrl(url) {
  return url.replace(/^\/+|\/+$/g, '')
}

export default class HttpApi {
  constructor(storeService) {
    this.base = normalizeUrl(process.env.REACT_APP_API_BASE_PATH)
    // this.auth = auth;
    this.withCredentials = process.env.REACT_APP_API_WITH_CREDENTIALS
    this.defaultHeaders = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }

    this.storeService = storeService
    this.storeUnsubscribe = this.storeService.subscribe('auth', this.setToken)
  }

  get url() {
    const { base } = this

    return `${PathUtils.getServerUrl()}/${base}`
  }

  headers = headers => {
    const defaults = { ...this.defaultHeaders }

    if (this.token) {
      defaults.authorization = `Token ${this.token}`
    }

    return {
      ...defaults,
      ...headers,
    }
  };

  setDefaultHeader = (header, value) => {
    this.defaultHeaders[header] = value
    return this
  };

  setToken = ({ accessToken }) => {
    this.token = accessToken
    return this
  };

  processResponse = res => {
    if (res.status >= 300) {
      // let error = res.data.error || 'Something went wrong';
      throw Error3.from(res.data.error)
    }

    return res
  };

  processOptions = options => options;

  read(url, params, headers = {}) {
    const options = {
      baseURL: this.url,
      url: normalizeUrl(url),
      params,
      method: 'GET',
      headers: this.headers(headers),
      validateStatus() {
        return true
      },
      withCredentials: this.withCredentials,
    }

    return this.request(options)
  }

  write(method, url, data, params, headers = {}) {
    const options = {
      baseURL: this.url,
      url: normalizeUrl(url),
      params,
      data,
      method,
      headers: this.headers(headers),
      validateStatus() {
        return true
      },
      withCredentials: this.withCredentials,
    }

    return this.request(options)
  }

  request(options) {
    return axios.request(this.processOptions(options))
      .then(this.processResponse.bind(this))
  }
}
