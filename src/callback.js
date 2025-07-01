import { Urlinfo }     from "../src/urlinfo.js";
import { DataStorage } from "../src/data_storage.js";
import { GetToken }    from "../src/get_token.js";
import { GetProfile }  from "../src/get_profile.js";
import { GetVerify }   from "../src/get_verify.js";

export class Callback{
  #resolve
  #reject
  #token_data
  #profile_data = {}
  #verify_data  = {}

  get #code(){
    const queries  = new Urlinfo().queries || {}
    return queries.code
  }

  get #setting(){
    return new DataStorage().load()
  }

  
  constructor(){
    this.promise = new Promise((resolve, reject) => {
      this.#resolve = resolve
      this.#reject  = reject
      
      if(this.#code){
        this.#init()
      }
      else{
        console.error("認証コードがありません")
        this.#reject("認証コードがありません")
      }
    })
  }

  #init(){
    this.#access_token()
  }

  #access_token(){
    new GetToken(this.#code, this.#setting)
    .promise.then( token_data => {
      this.#token_data = token_data || {}
      this.#get_profile(token_data)
    })
  }

  #get_profile(){
    new GetProfile(this.#token_data.access_token)
    .promise.then( profile_data => {
      this.#profile_data = profile_data || {}
      this.#get_verify()
    })
  }

  #get_verify(){
    new GetVerify(this.#token_data.id_token, this.#setting.client_id)
    .promise.then( verify_data => {
      this.#verify_data = verify_data || {}
      this.#loaded()
    })
  }

  #loaded(){
    const datas = {...this.#profile_data, ...this.#verify_data}
    new DataStorage().clear()
    this.#finish(datas)
  }

  #finish(data){
    this.#resolve(data)
  }
}