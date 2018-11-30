export default class LvlHelperClass {
  /**
   * @param {*} lvl
   * @returns {Promise}
   */
  getJsonData = async lvl => {
    return await import('../levels/' + lvl)
      .then(file => {
        return file.default
      })
      .catch(error => {
        throw new Error('Error while loading level data: ' + error)
      })
  }
}
