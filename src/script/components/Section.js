export class Section{
    constructor( {items, renderer}, containerSelector){
        this._renderedItems = items.reverse();
        this._renderer = renderer;
        this._container = containerSelector;
    }

    setItem(element) {
        this._container.prepend(element);
    }
    
    addItem(){
        this._renderedItems.forEach(item => this._renderer(item));
    }

    
}