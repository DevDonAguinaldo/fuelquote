import {Color, ButtonSize} from "../Constant/EnumType";
class ActionButtonBuilder {
    private _text: string = '';
    private _icon: string = '';
    private _color: Color;
    private _basic: boolean = false;
    private _inverted: boolean = false;
    private _size: ButtonSize = ButtonSize.MEDIUM;
    private _appendClasses: string = '';
    private _loading: boolean = false;
    private _circle: boolean = false;
    private _disabled: boolean = false;
    private _active: boolean = false;
    private _negative: boolean = false;
    private _positive: boolean = false;

    public text(value: string): ActionButtonBuilder {
        this._text = value;
        return this;
    }

    public icon(value: string): ActionButtonBuilder {
        this._icon = value;
        return this;
    }

    public color(value: Color): ActionButtonBuilder {
        this._color = value;
        return this;
    }

    public basic(value: boolean): ActionButtonBuilder {
        this._basic = value;
        return this;
    }

    public inverted(value: boolean): ActionButtonBuilder {
        this._inverted = value;
        return this;
    }

    public size(value: ButtonSize): ActionButtonBuilder {
        this._size = value;
        return this;
    }

    public appendClasses(value: string): ActionButtonBuilder {
        this._appendClasses = value;
        return this;
    }

    public loading(value: boolean): ActionButtonBuilder {
        this._loading = value;
        return this;
    }

    public circle(value: boolean): ActionButtonBuilder {
        this._circle = value;
        return this;
    }

    public disabled(value: boolean): ActionButtonBuilder {
        this._disabled = value;
        return this;
    }

    public actvie(value: boolean): ActionButtonBuilder {
        this._active = value;
        return this;
    }

    public negative(value: boolean): ActionButtonBuilder {
        this._negative = value;
        return this;
    }

    public positive(value: boolean): ActionButtonBuilder {
        this._positive = value;
        return this;
    }

    public build(): ActionButton {
        let button: ActionButton = new ActionButton();

        button.text = this._text;
        button.icon = this._icon;
        button.color = this._color;
        button.basic = this._basic;
        button.inverted = this._inverted;
        button.size = this._size;
        button.appendClasses = this._appendClasses;
        button.loading = this._loading;
        button.circle = this._circle;
        button.disabled = this._disabled;
        button.active = this._active;
        button.negative = this._negative;
        button.positive = this._positive;

        return button;
    }
}

class ActionButton {
    private _text: string;
    private _icon: string;
    private _color: Color;
    private _basic: boolean;
    private _inverted: boolean;
    private _size: ButtonSize;
    private _loading: boolean;
    private _circle: boolean;
    private _disabled: boolean;
    private _active: boolean;
    private _appendClasses: string;
    private _negative: boolean;
    private _positive: boolean;

    private _dom: any;


    set text(value: string) {
        this._text = value;
    }

    set icon(value: string) {
        this._icon = value;
    }

    set color(value: Color) {
        this._color = value;
    }

    set basic(value: boolean) {
        this._basic = value;
    }

    set inverted(value: boolean) {
        this._inverted = value;
    }

    set size(value: ButtonSize) {
        this._size = value;
    }

    set appendClasses(value: string) {
        this._appendClasses = value;
    }

    set loading(value: boolean) {
        this._loading = value;
    }

    set circle(value: boolean) {
        this._circle = value;
    }

    set disabled(value: boolean) {
        this._disabled = value;
    }

    set active(value: boolean) {
        this._active = value;
    }

    set negative(value: boolean) {
        this._negative = value;
    }

    set positive(value: boolean) {
        this._positive = value;
    }

    public getDom(): any {
        if (this._dom) {
            return this._dom;
        }
        return this.createDom();
    }

    private createDom(): any {
        let $: any = (<any>window).jQuery || (<any>window).$;
        let $dom = $(`<div class="ui button">${this._text}</div>`);

        if (this._icon) {
            $dom.prepend(`<i class="icon ${this._icon}"></i>`);
        }

        if (this._color != null) {
            $dom.addClass(Color[this._color].toLowerCase());
        }

        if (this._basic) {
            $dom.addClass('basic');
        }

        if (this._inverted) {
            $dom.addClass('inverted');
        }

        if (this._size != null) {
            $dom.addClass(ButtonSize[this._size].toLowerCase());
        }

        if (this._loading) {
            $dom.addClass('loading');
        }

        if (this._circle) {
            $dom.addClass('circular');
        }

        if (this._disabled) {
            $dom.addClass('disabled');
        }

        if (this._active) {
            $dom.addClass('active');
        }

        if (this._negative) {
            $dom.addClass('negative');
        }

        if (this._positive) {
            $dom.addClass('positive');
        }

        if (this._appendClasses) {
            $dom.addClass(this._appendClasses);
        }

        return this._dom = $dom;
    }
}

export {ActionButton, ActionButtonBuilder}