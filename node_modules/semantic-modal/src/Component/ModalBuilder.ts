import Modal from './Modal';
import {ModalType, ModalSize, ModalAnimation} from '../Constant/EnumType';
export default class ModalBuilder {
    private _title: string;//标题
    private _content: string;//内容
    private _positiveCallback: Function = (): void => {
    };//positive按钮回调函数
    private _negativeCallback: Function = (): void => {
    };//negative按钮回调函数
    private _positiveText: string = '确定';//positive按钮文字
    private _negativeText: string = '取消';//negative按钮文字
    private _positiveAppendClasses: string = '';//positive按钮追加class
    private _negativeAppendClasses: string = '';//negative按钮追加class
    private _positiveIcon: string = 'checkmark';
    private _negativeIcon: string = 'remove';
    private _showPositiveButton: boolean = true;
    private _showNegativeButton: boolean = true;
    private _closeable: boolean = true;
    private _fullscreen: boolean = false;
    private _showCloseButton: boolean = true;
    private _modalAppendClasses: string = '';
    private _titleIcon: string = '';
    private _size: ModalSize = ModalSize.NORMAL;
    private _type: ModalType = ModalType.NORMAL;
    private _duration: number = 400;
    private _animation: ModalAnimation = ModalAnimation.SCALE;

    /**
     * 设置标题
     * @param value
     */
    public title(value: string): ModalBuilder {
        this._title = value;
        return this;
    }

    /**
     * 设置内容
     * @param value
     */
    public content(value: string): ModalBuilder {
        this._content = value;
        return this;
    }

    /**
     * 标题图标
     * @param value
     * @returns {ModalBuilder}
     */
    public titleIcon(value: string): ModalBuilder {
        this._titleIcon = value;
        return this;
    }

    /**
     * 动画时长
     * @param value
     * @returns {ModalBuilder}
     */
    public duration(value: number): ModalBuilder {
        this._duration = value;
        return this;
    }

    /**
     * 动画类型
     * @param value
     */
    public anim(value: ModalAnimation): ModalBuilder {
        this._animation = value;
        return this;
    }


    /**
     * 大小
     * @param value
     */
    public size(value: ModalSize): ModalBuilder {
        this._size = value;
        //大小和全屏不能同时设置
        this._fullscreen = false;
        return this;
    }


    /**
     * 类型
     * @param value
     */
    public type(value: ModalType): ModalBuilder {
        this._type = value;
        return this;
    }


    /**
     * 是否可关闭
     * @param value
     */
    public closeable(value: boolean): ModalBuilder {
        this._closeable = value;
        return this;
    }


    /**
     * 是否全屏
     * @param value
     * @returns {ModalBuilder}
     */
    public fullscreen(value: boolean): ModalBuilder {
        this._fullscreen = value;
        //大小和全屏不能同时设置
        this._size = null;
        return this;
    }

    /**
     * 设置positive按钮回调
     * @param value
     */
    public positiveCallback(value: Function): ModalBuilder {
        this._positiveCallback = value;
        return this;
    }

    /**
     * 设置negative按钮回调
     * @param value
     */
    public negativeCallback(value: Function): ModalBuilder {
        this._negativeCallback = value;
        return this;
    }

    public positiveIcon(value: string): ModalBuilder {
        this._positiveIcon = value;
        return this;
    }


    public negativeIcon(value: string): ModalBuilder {
        this._negativeIcon = value;
        return this;
    }

    /**
     * positive按钮文字
     * @param value
     */
    public positiveText(value: string): ModalBuilder {
        this._positiveText = value;
        return this;
    }

    /**
     * negative按钮文字
     * @param value
     */
    public negativeText(value: string): ModalBuilder {
        this._negativeText = value;
        return this;
    }

    /**
     * positive按钮追加class
     * @param value
     */
    public positiveAppendClasses(value: string): ModalBuilder {
        this._positiveAppendClasses = value;
        return this;
    }

    /**
     * negative 按钮追加class
     * @param value
     */
    public negativeAppendClasses(value: string): ModalBuilder {
        this._negativeAppendClasses = value;
        return this;
    }


    /**
     * 设置是否显示positive button
     * @param value
     * @returns {ModalBuilder}
     */
    public showPositiveButton(value: boolean): ModalBuilder {
        this._showPositiveButton = value;
        return this;
    }

    /**
     * 设置是否显示negative button
     * @param value
     * @returns {ModalBuilder}
     */
    public showNegativeButton(value: boolean): ModalBuilder {
        this._showNegativeButton = value;
        return this;
    }

    /**
     * 设置是否显示close button
     * @param value
     * @returns {ModalBuilder}
     */
    public showCloseButton(value: boolean): ModalBuilder {
        this._showCloseButton = value;
        return this;
    }

    /**
     * modal追加class
     * @param value
     * @returns {ModalBuilder}
     */
    public modalAppendClasses(value: string): ModalBuilder {
        this._modalAppendClasses = value;
        return this;
    }


    public build(): Modal {
        let modal: Modal = new Modal();

        modal.size = this._size;
        modal.type = this._type;
        modal.titleIcon = this._titleIcon;
        modal.title = this._title;
        modal.duration = this._duration;
        modal.animation = this._animation;
        modal.title = this._title;
        modal.content = this._content;
        modal.closeable = this._closeable;
        modal.fullscreen = this._fullscreen;
        modal.showCloseButton = this._showCloseButton;
        modal.modalAppendClasses = this._modalAppendClasses;

        modal.positiveAppendClasses = this._positiveAppendClasses;
        modal.showPositiveButton = this._showPositiveButton;
        modal.positiveCallback = this._positiveCallback;
        modal.positiveText = this._positiveText;
        modal.positiveIcon = this._positiveIcon;

        modal.negativeAppendClasses = this._negativeAppendClasses;
        modal.showNegativeButton = this._showNegativeButton;
        modal.negativeCallback = this._negativeCallback;
        modal.negativeText = this._negativeText;
        modal.negativeIcon = this._negativeIcon;

        return modal;
    }
}
