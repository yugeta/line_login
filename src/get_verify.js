
export class GetVerify{
  #resolve
  #reject
  #id_token
  #client_id
  #url = "https://api.line.me/oauth2/v2.1/verify"

  constructor(id_token, client_id){
    this.#id_token  = id_token
    this.#client_id = client_id
    this.promise = new Promise((resolve, reject) => {
      this.#resolve = resolve
      this.#reject  = reject
      this.#init()
    })
  }

  async #init(){
    const res = await this.#get_profile()
    this.#finish(res)
  }

  async #get_profile(){
    const formData = {
      id_token    : this.#id_token,
      client_id   : this.#client_id,
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