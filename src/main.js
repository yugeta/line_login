
import { LineLogin } from "./line_login.js";

class Main{
  constructor(){
    new LineLogin()
  }
}

switch(document.readyState){
  case "complete":
  case "interactive":
    new Main();break
  default:
    window.addEventListener("DOMContentLoaded", () => new Main())
}