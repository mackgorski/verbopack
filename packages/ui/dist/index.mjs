import { Button } from '@nextui-org/react';
import { jsx } from 'react/jsx-runtime';

var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};

// #style-inject:#style-inject
function styleInject(css, { insertAt } = {}) {
  if (typeof document === "undefined") return;
  const head = document.head || document.getElementsByTagName("head")[0];
  const style = document.createElement("style");
  style.type = "text/css";
  if (insertAt === "top") {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

// src/styles/base.css
styleInject('@tailwind base;\n@tailwind components;\n@tailwind utilities;\n@import "@nextui-org/theme/dist/core.css";\n@import "@nextui-org/theme/dist/light.css";\n@import "@nextui-org/theme/dist/dark.css";\n');
var CustomButton = (props) => {
  return /* @__PURE__ */ jsx(Button, __spreadValues({}, props));
};

export { CustomButton };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map