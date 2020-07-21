export class Section{
    constructor( {renderer}, containerSelector, items){
        this._renderer = renderer;
        this._container = containerSelector;
        this.items = items;
    }

    setItem(element) {
        this._container.prepend(element);
    }
    
    addItem(){
        this.items.reverse().forEach(item => this._renderer(item));
    }
    
}