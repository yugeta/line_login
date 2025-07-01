import { ViewButton } from "./view_button.js";
import { Uuid }       from "./uuid.js";


export class LineLogin{
  constructor(options){
    const button = new ViewButton().button
    if(button){
      button.addEventListener("click", () => {
        this.#auth(options)
      })
    }
  }

  #auth(setting){
    const url = this.#generateLineLoginUrl(setting)
    location.href = url
  }

  #generateLineLoginUrl(setting){
    const queries = [
      `response_type=code`,
      `client_id=${setting.client_id}`,
      `redirect_uri=${encodeURIComponent(setting.callback_url)}`,
      `state=${new Uuid().make()}`,
      `scope=${encodeURIComponent("openid profile email")}`
    ]
    return `https://access.line.me/oauth2/v2.1/authorize?` + queries.join("&")
  }
}