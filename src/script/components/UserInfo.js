export class UserInfo{
    constructor({name, about, avatar}){
        this._name = name;
        this._about = about;
        this._avatar = avatar;
    }

    getUserInfo(){

        return {
            name: this._name.textContent,
            about: this._about.textContent
        };
    }

    setUserInfo({author, about}){
        this._name.textContent = author;
        this._about.textContent = about;
    }
}