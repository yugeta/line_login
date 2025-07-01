

export class GetToken{
  #resolve
  #reject
  #url = "https://api.line.me/oauth2/v2.1/token"

  constructor(code, setting){
    this.promise = new Promise((resolve, reject) => {
      this.#resolve = resolve
      this.#reject  = reject
      if(code && setting){
        this.code    = code
        this.setting = setting
        this.#init()
      }
      else{
        console.warn("Not enoough data.")
        this.#finish()
      }
    })
  }

  async #init(){
    const res = await this.#get_data()
    this.#finish(res)
  }

  async #get_data(){
    const formData = {
      grant_type    : "authorization_code",
      code          : this.code,
      client_id     : this.setting.client_id,
      client_secret : this.setting.channel_secret,
      redirect_uri  : this.setting.callback_url,
    }

    return await fetch(this.#url, {
      method: 'POST',
      headers: {"Content-Type": "application/x-www-form-urlencoded"},
      body: new URLSearchParams(formData),
    })
    .then((res)=>{return res.json()})
  }

  #finish(datas){
    this.#resolve(datas)
  }
}