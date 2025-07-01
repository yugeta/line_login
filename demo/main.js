import { Setting }    from "../src/setting.js";
import { GetCode }    from "../src/get_code.js";
import { ViewButton } from "../src/view_button.js";
import { Urlinfo }    from "../src/urlinfo.js";
import { Callback }   from "../src/callback.js";

class Main{
  constructor(){
    switch(this.page_type){
      case "callback":
        new Callback().promise.then(this.profile.bind(this))
        break
      default:
        new ViewButton()
        this.init()
    }
  }

  get page_type(){
    if(new Urlinfo().filename === "callback.html"){
      return "callback"
    }
    else{
      return null
    }
  }

  async init(){
    new Setting("setting.json").promise.then(setting_data => {
      new GetCode(setting_data)
    })
  }

  // Profileデータの取得後の処理
  get profile_area(){
    return document.querySelector(`.parsonal`)
  }
  profile(datas){
    console.log(datas)
    this.profile_area.textContent = JSON.stringify(datas, null, "  ")
  }
}

switch(document.readyState){
  case "complete":
  case "interactive":
    new Main();break
  default:
    window.addEventListener("DOMContentLoaded", () => new Main())
}