/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Plotly.ts":
/*!***********************!*\
  !*** ./src/Plotly.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   newPlot: () => (/* binding */ newPlot)\n/* harmony export */ });\n/// <reference types=\"plotly.js\" />\n// @ts-ignore\nvar newPlot = Plotly.newPlot;\n\n\n\n//# sourceURL=webpack://my-webpack-project/./src/Plotly.ts?");

/***/ }),

/***/ "./src/Tools.ts":
/*!**********************!*\
  !*** ./src/Tools.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GetWellData: () => (/* binding */ GetWellData),\n/* harmony export */   PlotData: () => (/* binding */ PlotData)\n/* harmony export */ });\n/* harmony import */ var _Plotly__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Plotly */ \"./src/Plotly.ts\");\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (undefined && undefined.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (g && (g = 0, op[0] && (_ = 0)), _) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\n\nfunction CalculatePercentageFilled(tankdata) {\n    var barrelsFilled = (tankdata.Capacity -\n        tankdata.Multiplier *\n            (tankdata.LatestReading.top_feet * 12 +\n                tankdata.LatestReading.top_inches)) /\n        tankdata.Multiplier;\n    return barrelsFilled / tankdata.Capacity;\n}\nfunction GetReadingDate(tankdata) {\n    var dateObject = new Date(tankdata.LatestReading.updated_at * 1000);\n    var month = dateObject.getMonth() + 1;\n    var day = dateObject.getDate();\n    var year = dateObject.getFullYear();\n    return month + \"/\" + day + \"/\" + year;\n}\nfunction CalculateTotalHeightInches(tankdata) {\n    var topHeight = tankdata.LatestReading.top_feet * 12 + tankdata.LatestReading.top_inches;\n    var topHeightPercentage = 1 - CalculatePercentageFilled(tankdata);\n    return Math.round(topHeight / topHeightPercentage);\n}\nfunction CalculateBaseHeightInches(tankdata) {\n    return (CalculateTotalHeightInches(tankdata) -\n        (tankdata.LatestReading.top_feet * 12 + tankdata.LatestReading.top_inches));\n}\nfunction CalculateTopHeightInches(tankdata) {\n    return (tankdata.LatestReading.top_feet * 12 + tankdata.LatestReading.top_inches);\n}\nfunction InchesToHeightString(inches) {\n    var feet = Math.floor(inches / 12);\n    var inchesLeft = inches % 12;\n    return \"\".concat(feet, \"' \").concat(inchesLeft, \"\\\"\");\n}\nfunction PlotData(data, divElement) {\n    var baseTrace = {\n        x: [],\n        y: [],\n        name: \"Base Height\",\n        type: \"bar\",\n        marker: {\n            color: \"#008000\",\n        },\n        text: [],\n    };\n    var topTrace = {\n        x: [],\n        y: [],\n        name: \"Top Height\",\n        type: \"bar\",\n        marker: {\n            color: \"#79ad79\",\n        },\n        text: [],\n    };\n    for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {\n        var tankdata = data_1[_i];\n        if (tankdata.Type == \"OIL\") {\n            baseTrace.x.push(tankdata.Name);\n            baseTrace.y.push(CalculateBaseHeightInches(tankdata) / CalculateTotalHeightInches(tankdata));\n            baseTrace.text.push(InchesToHeightString(CalculateBaseHeightInches(tankdata)));\n            topTrace.x.push(tankdata.Name);\n            topTrace.y.push(CalculateTopHeightInches(tankdata) / CalculateTotalHeightInches(tankdata));\n            topTrace.text.push(InchesToHeightString(CalculateTopHeightInches(tankdata)));\n        }\n    }\n    (0,_Plotly__WEBPACK_IMPORTED_MODULE_0__.newPlot)(divElement, [baseTrace, topTrace], {\n        barmode: \"stack\",\n    });\n}\nfunction GetWellData(wellName) {\n    return __awaiter(this, void 0, void 0, function () {\n        var res, wellTanks;\n        return __generator(this, function (_a) {\n            switch (_a.label) {\n                case 0: return [4 /*yield*/, fetch(\"/getWellTankReadings?wellName=\".concat(encodeURIComponent(wellName)))];\n                case 1:\n                    res = _a.sent();\n                    return [4 /*yield*/, res.json()];\n                case 2:\n                    wellTanks = (_a.sent());\n                    return [2 /*return*/, wellTanks];\n            }\n        });\n    });\n}\n\n\n\n//# sourceURL=webpack://my-webpack-project/./src/Tools.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tools */ \"./src/Tools.ts\");\n\njQuery(function () {\n    $(\"#wellSelect\").select2();\n    var wellSelect = document.getElementById(\"wellSelect\");\n    fetch(\"/getWells\")\n        .then(function (res) { return res.json(); })\n        .then(function (wellList) {\n        for (var _i = 0, wellList_1 = wellList; _i < wellList_1.length; _i++) {\n            var wellName = wellList_1[_i];\n            var el = document.createElement(\"option\");\n            el.value = wellName;\n            el.innerText = wellName;\n            wellSelect.appendChild(el);\n        }\n    });\n    $(\"#wellSelect\").on(\"change\", function () {\n        var _a;\n        (_a = document.getElementsByClassName(\"plot-container\")[0]) === null || _a === void 0 ? void 0 : _a.remove();\n        var graphDisplay = document.getElementById(\"graphDisplay\");\n        var loadingIcon = document.getElementById(\"loadingIcon\");\n        loadingIcon.style.display = \"inline-block\";\n        (0,_Tools__WEBPACK_IMPORTED_MODULE_0__.GetWellData)(wellSelect.value).then(function (wellData) {\n            console.log(wellData);\n            (0,_Tools__WEBPACK_IMPORTED_MODULE_0__.PlotData)(wellData, graphDisplay);\n            loadingIcon.style.display = \"none\";\n        });\n    });\n});\n\n\n//# sourceURL=webpack://my-webpack-project/./src/index.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;