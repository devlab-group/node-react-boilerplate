import uuidv4 from 'uuid/v4'

export default class ReactUtils {
  static getDisplayName = Component => Component.displayName || Component.name || 'Component'

  static getRandomInputId = () => uuidv4()
}
