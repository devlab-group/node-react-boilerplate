export default class PathUtils {
  // eslint-disable-next-line
  static getImagePath = path => require(`assets/images/${path}`)

  static getServerUrl = () => {
    let url = process.env.REACT_APP_API_HTTPS === 'true' ? 'https://' : 'http://'

    url += process.env.REACT_APP_API_HOST

    if (process.env.REACT_APP_API_PORT) {
      url += `:${process.env.REACT_APP_API_PORT}`
    }

    return url
  }
}
