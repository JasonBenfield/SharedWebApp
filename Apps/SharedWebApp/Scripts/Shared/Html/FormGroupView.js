"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormGroupView = void 0;
var tslib_1 = require("tslib");
var Column_1 = require("../Grid/Column");
var LabelColumn_1 = require("../Grid/LabelColumn");
var Block_1 = require("../Html/Block");
var BlockViewModel_1 = require("../Html/BlockViewModel");
var InputGroup_1 = require("../Html/InputGroup");
var TextSpan_1 = require("../Html/TextSpan");
var MarginCss_1 = require("../MarginCss");
var FormGroupView = /** @class */ (function (_super) {
    tslib_1.__extends(FormGroupView, _super);
    function FormGroupView(vm) {
        if (vm === void 0) { vm = new BlockViewModel_1.BlockViewModel(); }
        var _this = _super.call(this, vm) || this;
        _this.captionColumn = _this.addContent(new LabelColumn_1.LabelColumn());
        _this.labelTextSpan = _this.captionColumn.addContent(new TextSpan_1.TextSpan());
        _this.valueColumn = _this.addContent(new Column_1.Column());
        _this.addCssName('form-group row');
        _this.setMargin(MarginCss_1.MarginCss.bottom(3));
        _this.inputGroup = _this.valueColumn.addContent(new InputGroup_1.InputGroup());
        return _this;
    }
    FormGroupView.prototype.setCaption = function (caption) {
        this.labelTextSpan.setText(caption);
    };
    return FormGroupView;
}(Block_1.Block));
exports.FormGroupView = FormGroupView;
//# sourceMappingURL=FormGroupView.js.map