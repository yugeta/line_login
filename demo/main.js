import { Setting }   from "../src/setting.js";
import { LineLogin } from "../src/line_login.js";
import { Urlinfo }   from "../src/urlinfo.js";
import { Callback }  from "../src/callback.js";

class Main{
  constructor(){console.log(this.page_type)
    switch(this.page_type){
      case "callback":
        new Callback();
        break
      default:
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
      new LineLogin(setting_data)
    })
  }
}

switch(document.readyState){
  case "complete":
  case "interactive":
    new Main();break
  default:
    window.addEventListener("DOMContentLoaded", () => new Main())
}