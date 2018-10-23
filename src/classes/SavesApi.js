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
}