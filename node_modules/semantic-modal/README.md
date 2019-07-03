# semantic-modal
[![npm version](https://badge.fury.io/js/semantic-modal.svg)](https://badge.fury.io/js/semantic-modal)

a wrapper for semantic modal.

## [Demo](https://lsxiao.github.io/semantic-modal)
![](https://raw.githubusercontent.com/lsxiao/semantic-modal/master/demo.gif?raw=true)

## Install

```bash
sudo yarn add semantic-modal -D
```
or
```bash
sudo npm install semantic-modal --save
```

## Usage


### script
```html
<script src="./dist/semantic-modal.min.js"></script>
<script>
new SemanticModal
     .ModalBuilder()
     .title('旧信息归档')
     .content('您的收件箱已满，是否要我们启用自动归档旧邮件？')
     .titleIcon('inbox')
     .type(SemanticModal.ModalType.NORMAL)
     .size(SemanticModal.ModalSize.SMALL)
     .closeable(true)
     .showCloseButton(true)
     .showNegativeButton(true)
     .showPositiveButton(true)
     .positiveCallback(function () {
         alert('you click positive button');
     })
     .negativeCallback(function () {
         alert('you click negative button');
     })
     .build()     
     .show();
</script>

```

### module import
```javascript
import {Modal, ModalBuilder, ModalType, ModalSize, ModalAnimation} from 'semantic-modal';
new ModalBuilder()
     .title('旧信息归档')
     .content('您的收件箱已满，是否要我们启用自动归档旧邮件？')
     .titleIcon('inbox')
     .type(SemanticModal.ModalType.NORMAL)
     .size(SemanticModal.ModalSize.SMALL)
     .closeable(true)
     .showCloseButton(true)
     .showNegativeButton(true)
     .showPositiveButton(true)
     .positiveCallback(function () {
         alert('you click positive button');
     })
     .negativeCallback(function () {
         alert('you click negative button');
     })
     .build()     
     .show();
```




## Maintained by
知乎 : [@面条](https://www.zhihu.com/people/lsxiao)

Github : [@lsxiao](https://github.com/lsxiao)


## License
MIT
