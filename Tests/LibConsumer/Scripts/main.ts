import { TestValue1 } from '@xti/libproducer/dist/TestValue1';
import { TestValue2 } from '@xti/libproducer/dist/TestValue2';
import { TestHtml } from '@xti/libproducer/dist/TestHtml';

let value1 = new TestValue1();
console.log(`value1: ${value1.value()}`);
let value2 = new TestValue2();
console.log(`value2: ${value2.value()}`);
let html = new TestHtml();
console.log(`html: ${html.value()}`);

let testInterface: ITestInterface = {
    value: 1
};