

export class GetProfile{
  #resolve
  #reject
  #url = "https://api.line.me/v2/profile"

  constructor(access_token){
    this.promise = new Promise((resolve, reject) => {
      this.#resolve = resolve
      this.#reject  = reject
      if(access_token){
        this.access_token = access_token
        this.#init()
      }
      else{
        console.warn("Not token data.")
        this.#finish()
      }
    })
  }

  async #init(){
    const res = await this.#get_profile()
    this.#finish(res)
  }

  async #get_profile(){
    // ユーザープロフィール取得
    const profileRes = await fetch(this.#url, {
      headers: {
        "Authorization": `Bearer ${this.access_token}`
      }
    })
    return await profileRes.json()
  }

  #finish(datas){
    this.#resolve(datas)
  }
}