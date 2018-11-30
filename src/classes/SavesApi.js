import * as debug from 'debug'

export default class SavesApi {
  /**
   * @param {string} authorizationUrl
   * @param {string} token
   */
  constructor(authorizationUrl, token) {
    this.url = authorizationUrl
    this.token = 'Bearer ' + JSON.stringify(token)
  }

  /**
   * @param {*} data
   * @returns {Promise<Response>}
   */
  async post(data) {
    if (typeof data !== 'object') {
      data = {data}
    }

    return await fetch(this.url + 'saves/', {
      method: data.hash === '' ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Authorization': this.token,
        'Authorization-Type': '1',
        'Authorization-Game': 'bejeweled'
      },
      body: JSON.stringify(data)
    })
  }

  /**
   * @returns {Promise<Response>}
   */
  async get() {
    return await fetch(this.url + 'saves/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Authorization': this.token,
        'Authorization-Type': '1',
        'Authorization-Game': 'bejeweled'
      }
    })
  }

  /**
   * @returns {Promise<Response>}
   */
  async delete() {
    return await fetch(this.url + 'saves/', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Authorization': this.token,
        'Authorization-Type': '1',
        'Authorization-Game': 'bejeweled'
      }
    })
  }

  /**
   * @param responseObject
   * @returns {{game: (*|{namespaced, state, getters, actions, mutations}), hash: *, progress: (*|{namespaced, state, getters, actions, mutations}|ProgressEvent|number)}}
   */
  static parseRecivedData(responseObject) {
      let json, game, hash, progress;

      try {
          json = responseObject.data
          hash = json.hash
          game = json.save.game
          progress = json.save.progress
      } catch (e) {
        debug.log('load failed')
          //empty or wrong response from the server
      }

      return {game, hash, progress}
  }
}
