import { Button } from '@nextui-org/react';
import { jsx } from 'react/jsx-runtime';

var m=Object.defineProperty;var s=Object.getOwnPropertySymbols;var p=Object.prototype.hasOwnProperty,l=Object.prototype.propertyIsEnumerable;var r=(e,o,t)=>o in e?m(e,o,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[o]=t,d=(e,o)=>{for(var t in o||(o={}))p.call(o,t)&&r(e,t,o[t]);if(s)for(var t of s(o))l.call(o,t)&&r(e,t,o[t]);return e};function n(e,{insertAt:o}={}){if(typeof document=="undefined")return;let t=document.head||document.getElementsByTagName("head")[0],i=document.createElement("style");i.type="text/css",o==="top"&&t.firstChild?t.insertBefore(i,t.firstChild):t.appendChild(i),i.styleSheet?i.styleSheet.cssText=e:i.appendChild(document.createTextNode(e));}n(`@tailwind base;@tailwind components;@tailwind utilities;@import "@nextui-org/theme/dist/core.css";@import "@nextui-org/theme/dist/light.css";@import "@nextui-org/theme/dist/dark.css";
`);var y=e=>jsx(Button,d({},e));

export { y as CustomButton };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map