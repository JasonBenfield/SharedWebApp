"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TestValue1_1 = require("@xti/libproducer/dist/TestValue1");
var TestValue2_1 = require("@xti/libproducer/dist/TestValue2");
var TestHtml_1 = require("@xti/libproducer/dist/TestHtml");
var value1 = new TestValue1_1.TestValue1();
console.log("value1: ".concat(value1.value()));
var value2 = new TestValue2_1.TestValue2();
console.log("value2: ".concat(value2.value()));
var html = new TestHtml_1.TestHtml();
console.log("html: ".concat(html.value()));
var testInterface = {
    value: 1
};
//# sourceMappingURL=main.js.map