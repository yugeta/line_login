import { Urlinfo }     from "../src/urlinfo.js";
import { DataStorage } from "../src/data_storage.js";

export class Callback{
  constructor(){
    console.log(new Urlinfo().queries)
    this.#init()
  }

  #url = "https://api.line.me/oauth2/v2.1/token"

  get #code(){
    const queries  = new Urlinfo().queries || {}
    return queries.code
  }

  async #init(){
    const setting = new DataStorage().load()
    this.queries  = new Urlinfo().queries || {}
    const token   = await this.#access_token(setting, this.#code)
    const profile = await this.#get_profile(token)
    console.log("Profile", profile)
  }

  async #access_token(setting){
    const formData = {
      grant_type    : "authorization_code",
      code          : this.#code,
      client_id     : setting.client_id,
      client_secret : setting.channel_secret,
      redirect_uri  : setting.callback_url,
    }

    const tokenData = await fetch(this.#url, {
      method: 'POST',
      headers: {"Content-Type": "application/x-www-form-urlencoded"},
      body: new URLSearchParams(formData),
    })
    .then((res)=>{return res.json()})
    if (tokenData.access_token) {
      // console.log("アクセストークン", tokenData)
      return tokenData
    }
    else{
      console.error("アクセストークン取得失敗", tokenData)
    }
  }

  async #get_profile(token){
    // ユーザープロフィール取得
    const profileRes = await fetch("https://api.line.me/v2/profile", {
      headers: {
        "Authorization": `Bearer ${token.access_token}`
      }
    })
    return await profileRes.json()
  }

}