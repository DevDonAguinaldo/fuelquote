import {ModalType, ModalSize, ModalAnimation, Color, Align} from '../Constant/EnumType';
import Util from '../Tool/Util';
import {ActionButtonBuilder, ActionButton} from "./ActionButton";
import {ActionsBuilder} from "./Actions";

export default class Modal {
    private _title: string;//标题
    private _content: string;//内容
    private _positiveCallback: Function;//positive按钮回调函数
    private _negativeCallback: Function;//negative按钮回调函数
    private _positiveText: string;//positive按钮文字
    private _negativeText: string;//negative按钮文字
    private _positiveIcon: string = 'ok';
    private _negativeIcon: string = 'remove';
    private _positiveAppendClasses: string;//positive按钮追加class
    private _negativeAppendClasses: string;//negative按钮追加class
    private _showPositiveButton: boolean;
    private _showNegativeButton: boolean;
    private _closeable: boolean;
    private _fullscreen: boolean;
    private _showCloseButton: boolean;
    private _modalAppendClasses: string;
    private _type: ModalType;
    private _size: ModalSize;
    private _titleIcon: string;
    private _duration: number = 400;
    private _animation: ModalAnimation = ModalAnimation.SCALE;

    private _id: string;
    private _$modal: any;
    private _init: boolean = false;

    constructor() {
        this._id = Util.guid();
    }

    set title(value: string) {
        this._title = value;
    }

    set content(value: string) {
        this._content = value;
    }

    set positiveCallback(value: Function) {
        this._positiveCallback = value;
    }

    set negativeCallback(value: Function) {
        this._negativeCallback = value;
    }

    set positiveText(value: string) {
        this._positiveText = value;
    }

    set negativeText(value: string) {
        this._negativeText = value;
    }

    set positiveAppendClasses(value: string) {
        this._positiveAppendClasses = value;
    }

    set negativeAppendClasses(value: string) {
        this._negativeAppendClasses = value;
    }

    set size(value: ModalSize) {
        this._size = value;
    }

    set closeable(value: boolean) {
        this._closeable = value;
    }

    set type(value: ModalType) {
        this._type = value;
    }

    set showPositiveButton(value: boolean) {
        this._showPositiveButton = value;
    }

    set showNegativeButton(value: boolean) {
        this._showNegativeButton = value;
    }

    set fullscreen(value: boolean) {
        this._fullscreen = value;
    }

    set showCloseButton(value: boolean) {
        this._showCloseButton = value;
    }


    set modalAppendClasses(value: string) {
        this._modalAppendClasses = value;
    }


    set positiveIcon(value: string) {
        this._positiveIcon = value;
    }

    set negativeIcon(value: string) {
        this._negativeIcon = value;
    }

    set titleIcon(value: string) {
        this._titleIcon = value;
    }


    set duration(value: number) {
        this._duration = value;
    }

    set animation(value: ModalAnimation) {
        this._animation = value;
    }

    private init(): Modal {
        if (this._init) {
            return;
        }
        this._$modal = this.createSemanticModalInstance();
        this._init = true;
        return this;
    }

    /**
     * 构建semantic modal 插件实例
     */
    private createSemanticModalInstance(): any {
        let $: any = (<any>window).jQuery || (<any>window).$;

        let setting: any = {
            closable: this._closeable,
            duration: this._duration,
            transition: ModalAnimation[this._animation].toLowerCase()
        };

        //size
        let sizeClass = '';
        switch (this._size) {
            case ModalSize.SMALL: {
                sizeClass = 'small';
                break;
            }
            case ModalSize.LARGE: {
                sizeClass = 'large';
                break;
            }
            case ModalSize.NORMAL:
            default:
        }

        //modal
        let $modal = $(`<div class='ui ${sizeClass} modal' id='${this._id}'></div>`);

        //append class
        if (this._modalAppendClasses) {
            $modal.addClass(this._modalAppendClasses);
        }

        //type
        let isBasic: boolean = false;
        if (this._type == ModalType.BASIC) {
            isBasic = true;
            $modal.addClass('basic');
        }

        //close按钮
        if (this._showCloseButton) {
            let closeButtonAppendClasses = isBasic ? 'white' : 'black';
            $modal.append(`<i class='close icon ${closeButtonAppendClasses}' style='top: 0.5rem;right: 0.5rem'></i>`);
        }

        //全屏
        if (this._fullscreen) {
            $modal.addClass('fullscreen');
        }


        //标题
        if (this._title) {
            let $header: any = $(`<div class='ui header ${isBasic ? 'icon' : ''}' style='${isBasic ? ';text-align:center;' : ''};word-break: break-all;word-wrap: break-word'>${this._title}</div>`);
            let $titleIcon: any = this._titleIcon ? $(`<i class='icon ${this._titleIcon}'></i>`) : null;
            if ($titleIcon) {
                $header.prepend($titleIcon);
            }
            $modal.append($header);
        }

        //内容
        if (this._content) {
            $modal.append(`<div class='content' style='${isBasic ? ';text-align:center;' : ''}${!this._title ? ';margin-top:1.5rem;' : ''}'><p style='word-break: break-all;word-wrap: break-word'>${this._content}</p></div>`);
        }

        //actions
        let actionsBuilder: ActionsBuilder = new ActionsBuilder();
        if (isBasic) {
            actionsBuilder.align(Align.CENTER);
        }

        if (this._showNegativeButton) {
            let buttonBuilder = new ActionButtonBuilder()
                .negative(true)
                .text(this._negativeText)
                .icon(this._negativeIcon)
                .appendClasses(this._negativeAppendClasses);
            if (isBasic) {
                buttonBuilder.color(Color.RED).basic(true).inverted(true);
            }
            actionsBuilder.add(buttonBuilder.build());
        }

        if (this._showPositiveButton) {
            let buttonBuilder = new ActionButtonBuilder()
                .positive(true)
                .text(this._positiveText)
                .icon(this._positiveIcon)
                .appendClasses(this._positiveAppendClasses);
            if (isBasic) {
                buttonBuilder.color(Color.GREEN).basic(false).inverted(true);
            }
            actionsBuilder.add(buttonBuilder.build());
        }

        let hasButtons: boolean = this._showNegativeButton || this._showPositiveButton;

        if (hasButtons) {
            $modal.append(actionsBuilder.build().getDom());
        }

        //回调函数
        if (this._positiveCallback instanceof Function) {
            setting.onApprove = this._positiveCallback;
        }
        else {
            throw new Error(`the positive callback must be a function,but you provide a  ${typeof this._positiveCallback}.`);
        }

        if (this._negativeCallback instanceof Function) {
            setting.onDeny = this._negativeCallback;
        }
        else {
            throw new Error(`the negative callback must be a function,but you provide a ${typeof this._negativeCallback}.`);
        }

        $modal.modal(setting);

        return $modal;
    }

    /**
     * 创建actionButton
     */
    private createActionButton(): any {

    }

    public show(): void {
        this.modalInvoke('show');
    }

    public hide(): void {
        this.modalInvoke('hide');
    }

    public toggle(): void {
        this.modalInvoke('toggle');
    }

    private modalInvoke(method: string): any {
        this.init();
        return this._$modal.modal(method);
    }
}