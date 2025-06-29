
export class ViewButton{
  constructor(){
    this.#set_css()
  }

  get button(){
    return document.querySelector(`button.line-login-button`)
  }

  #set_css(){
    if(document.querySelector(`link.ine-login-css`)){return}
    const dir = import.meta.url.split("/").slice(0,-1).join("/")
    const link = document.createElement("link")
    link.className = "line-login-css"
    link.rel = "stylesheet"
    link.href = `${dir}/style.css`
    document.head.appendChild(link)
  }
}