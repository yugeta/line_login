import { DataStorage } from "./data_storage.js"

export class Setting{
  #resolve
  #reject

  constructor(path){
    this.promise = new Promise((resolve, reject) => {
      this.#resolve = resolve
      this.#reject  = reject
      if(path){
        this.#load(path)
      }
      else{
        this.#finish()
      }
    })
  }

  async #load(path){
    const res = await fetch(path, {
      method: 'GET',
    })
    .then((res)=>{return res.json()})
    new DataStorage(res).save()
    this.#finish(res)
  }

  #finish(data){
    this.#resolve(data)
  }
}