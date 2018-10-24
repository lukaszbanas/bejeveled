export default class SavesApi {
  constructor(authorizationUrl, token) {
    this.url = authorizationUrl
    this.token = 'Bearer ' + JSON.stringify(token)
  }

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

  static parseRecivedData(responseObject) {
      let json, game, hash, progress;

      try {
          json = JSON.parse(responseObject.data)
          hash = responseObject.hash
          game = json.data.game
          progress = json.data.progress
      } catch (e) {
          //empty or wrong response from the server
      }

      return {game, hash, progress}
  }
}
