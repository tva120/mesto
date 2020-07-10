export class UserInfo{
    constructor({name, about}){
        this._name = name;
        this._about = about;
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