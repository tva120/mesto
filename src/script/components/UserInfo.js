export class UserInfo{
    constructor({name, about}){
        this._name = name;
        this._about = about;
    }

    getUserInfo(){
        const userInfo = {
            name: this._name.textContent,
            about: this._about.textContent
        }
        return userInfo;
    }

    setUserInfo(input){
        this._name.textContent = input.author;
        this._about.textContent = input.about;
    }
}