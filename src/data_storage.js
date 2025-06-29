

export class DataStorage{
  #datas

  constructor(data){
    this.#datas = data
  }

  #name = "line_login_setting"

  save(){
    const json   = JSON.stringify(this.#datas)
    const encode = encodeURIComponent(json)
    const base64 = btoa(encode)
    window.localStorage.setItem(this.#name, base64)
  }

  load(){
    const base64 = window.localStorage.getItem(this.#name)
    if(!base64){
      return null
    }
    const encode = atob(base64)
    const json   = decodeURIComponent(encode)
    return JSON.parse(json)
  }

  clear(){
    window.localStorage.removeItem(this.#name)
  }
}