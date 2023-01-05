sampleApp.pages[1] = class 
{
    constructor()
    {
        this.items = new Map();
    }

    addItem(itemId, text)
    {
        this.items.set(itemId, text);
    }

    viewItem(itemId)
    {
        return this.items.get(itemId);
    }
}