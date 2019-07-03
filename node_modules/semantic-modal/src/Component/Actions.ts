import {ActionButton} from "./ActionButton";
import {Align} from "../Constant/EnumType";
class ActionsBuilder {
    private _buttons: ActionButton[] = [];
    private _align: Align = Align.RIGHT;

    public add(button: ActionButton): ActionsBuilder {
        this._buttons.push(button);
        return this;
    }

    public align(value: Align): ActionsBuilder {
        this._align = value;
        return this;
    }

    public build(): Actions {
        let actions = new Actions();
        actions.align = this._align;
        actions.buttons = this._buttons;

        return actions;
    }
}

class Actions {
    private _buttons: ActionButton[];
    private _align: Align;

    private _dom: any;


    set buttons(value: ActionButton[]) {
        this._buttons = value;
    }

    set align(value: Align) {
        this._align = value;
    }

    public getDom(): any {
        if (this._dom) {
            return this._dom;
        }

        return this.createDom();
    }

    private createDom(): any {
        let $: any = (<any>window).jQuery || (<any>window).$;
        let $dom = $(`<div class='actions'></div>`);

        if (this._align != null) {
            $dom.css('text-align', Align[this._align].toLowerCase());
        }

        if (this._buttons && this._buttons.length > 0) {
            for (let button of this._buttons) {
                $dom.append(button.getDom());
            }
        }

        return this._dom = $dom;
    }
}

export {Actions, ActionsBuilder};