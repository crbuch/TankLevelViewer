/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Plotly.ts":
/*!***********************!*\
  !*** ./src/Plotly.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   newPlot: () => (/* binding */ newPlot)
/* harmony export */ });
/// <reference types="plotly.js" />
// @ts-ignore
var newPlot = Plotly.newPlot;



/***/ }),

/***/ "./src/Tools.ts":
/*!**********************!*\
  !*** ./src/Tools.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GetWellData: () => (/* binding */ GetWellData),
/* harmony export */   PlotData: () => (/* binding */ PlotData)
/* harmony export */ });
/* harmony import */ var _Plotly__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Plotly */ "./src/Plotly.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

var FONT_SIZE = 16;
function CalculatePercentageFilled(tankdata) {
    var barrelsFilled = tankdata.Capacity -
        tankdata.Multiplier *
            (tankdata.LatestReading.top_feet * 12 +
                tankdata.LatestReading.top_inches);
    return 1 - (barrelsFilled / tankdata.Capacity);
}
function CalculateTotalHeightInches(tankdata) {
    var topHeight = tankdata.LatestReading.top_feet * 12 + tankdata.LatestReading.top_inches;
    var topHeightPercentage = 1 - CalculatePercentageFilled(tankdata);
    return Math.round(topHeight / topHeightPercentage);
}
function CalculateBaseHeightInches(tankdata) {
    return (CalculateTotalHeightInches(tankdata) -
        (tankdata.LatestReading.top_feet * 12 + tankdata.LatestReading.top_inches));
}
function CalculateTopHeightInches(tankdata) {
    return (tankdata.LatestReading.top_feet * 12 + tankdata.LatestReading.top_inches);
}
function InchesToHeightString(inches) {
    var feet = Math.floor(inches / 12);
    var inchesLeft = inches % 12;
    if (feet && inches) {
        return "".concat(feet, "' ").concat(inchesLeft, "\"");
    }
    else if (feet && !inches) {
        return "".concat(feet, "'");
    }
    else if (!feet && inches) {
        return "".concat(inches, "\"");
    }
}
function PlotHeight(data, divElement, chartName) {
    var baseTrace = {
        x: [],
        y: [],
        name: "Base Height Oil",
        type: "bar",
        marker: {
            color: "#008000",
        },
        text: [],
        textfont: {
            size: FONT_SIZE
        }
    };
    var topTrace = {
        x: [],
        y: [],
        name: "Top Height Oil",
        type: "bar",
        marker: {
            color: "#79ad79",
        },
        text: [],
        textfont: {
            size: FONT_SIZE
        }
    };
    var baseTraceWater = {
        x: [],
        y: [],
        name: "Base Height Water",
        type: "bar",
        marker: {
            color: "#0000ff",
        },
        text: [],
        textfont: {
            size: FONT_SIZE
        }
    };
    var topTraceWater = {
        x: [],
        y: [],
        name: "Top Height Water",
        type: "bar",
        marker: {
            color: "#8585ff",
        },
        text: [],
        textfont: {
            size: FONT_SIZE
        }
    };
    for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
        var tankdata = data_1[_i];
        if (tankdata.Type == "OIL") {
            baseTrace.x.push("".concat(tankdata.Name));
            baseTrace.y.push(CalculateBaseHeightInches(tankdata) /
                CalculateTotalHeightInches(tankdata));
            baseTrace.text.push(InchesToHeightString(CalculateBaseHeightInches(tankdata)));
            topTrace.x.push("".concat(tankdata.Name));
            topTrace.y.push(CalculateTopHeightInches(tankdata) /
                CalculateTotalHeightInches(tankdata));
            topTrace.text.push(InchesToHeightString(CalculateTopHeightInches(tankdata)));
        }
        else if (tankdata.Type == "WATER") {
            baseTraceWater.x.push("".concat(tankdata.Name));
            baseTraceWater.y.push(CalculateBaseHeightInches(tankdata) /
                CalculateTotalHeightInches(tankdata));
            baseTraceWater.text.push(InchesToHeightString(CalculateBaseHeightInches(tankdata)));
            topTraceWater.x.push("".concat(tankdata.Name));
            topTraceWater.y.push(CalculateTopHeightInches(tankdata) /
                CalculateTotalHeightInches(tankdata));
            topTraceWater.text.push(InchesToHeightString(CalculateTopHeightInches(tankdata)));
        }
    }
    (0,_Plotly__WEBPACK_IMPORTED_MODULE_0__.newPlot)(divElement, [baseTrace, topTrace, baseTraceWater, topTraceWater], {
        barmode: "stack",
        title: "".concat(chartName, " Tank Levels"),
        xaxis: {
            type: "category",
            title: "Tank Names",
        },
    });
}
function PlotPercentage(data, divElement, chartName) {
    var oilTrace = {
        x: [],
        y: [],
        name: "Oil",
        type: "bar",
        marker: {
            color: "#008000",
        },
        text: [],
        textfont: {
            size: FONT_SIZE
        }
    };
    var waterTrace = {
        x: [],
        y: [],
        name: "Water",
        type: "bar",
        marker: {
            color: "#0000ff",
        },
        text: [],
        textfont: {
            size: FONT_SIZE
        }
    };
    for (var _i = 0, data_2 = data; _i < data_2.length; _i++) {
        var tankdata = data_2[_i];
        if (tankdata.Type == "OIL") {
            oilTrace.x.push("".concat(tankdata.Name));
            oilTrace.y.push(CalculatePercentageFilled(tankdata));
            oilTrace.text.push("".concat(Math.round(CalculatePercentageFilled(tankdata) * 100), "%"));
        }
        else if (tankdata.Type == "WATER") {
            waterTrace.x.push("".concat(tankdata.Name));
            waterTrace.y.push(CalculatePercentageFilled(tankdata));
            waterTrace.text.push("".concat(Math.round(CalculatePercentageFilled(tankdata) * 100), "%"));
        }
    }
    (0,_Plotly__WEBPACK_IMPORTED_MODULE_0__.newPlot)(divElement, [oilTrace, waterTrace], {
        title: "".concat(chartName, " Tank Percentages"),
        yaxis: {
            range: [0, 1],
            tickformat: ".0%",
        },
        xaxis: {
            type: "category",
            title: "Tank Names",
        },
    });
}
function PlotLoads(data, divElement, chartName) {
    var oilTrace = {
        x: [],
        y: [],
        name: "Oil",
        type: "bar",
        marker: {
            color: "#008000",
        },
        text: [],
        textfont: {
            size: FONT_SIZE
        }
    };
    var waterTrace = {
        x: [],
        y: [],
        name: "Water",
        type: "bar",
        marker: {
            color: "#0000ff",
        },
        text: [],
        textfont: {
            size: FONT_SIZE
        }
    };
    for (var _i = 0, data_3 = data; _i < data_3.length; _i++) {
        var tankdata = data_3[_i];
        if (tankdata.Type == "OIL") {
            oilTrace.x.push("".concat(tankdata.Name));
            var barrels = CalculatePercentageFilled(tankdata) * tankdata.Capacity;
            oilTrace.y.push(barrels);
            oilTrace.text.push("".concat(Math.round(barrels), " Barrels, \n ").concat(Math.floor(barrels / 180), " Load(s)"));
        }
        else if (tankdata.Type == "WATER") {
            waterTrace.x.push("".concat(tankdata.Name));
            var barrels = CalculatePercentageFilled(tankdata) * tankdata.Capacity;
            waterTrace.y.push(barrels);
            waterTrace.text.push("".concat(Math.round(barrels), " Barrels, \n ").concat(Math.floor(barrels / 180), " Load(s)"));
        }
    }
    (0,_Plotly__WEBPACK_IMPORTED_MODULE_0__.newPlot)(divElement, [oilTrace, waterTrace], {
        title: "".concat(chartName, " Tank Barrels"),
        xaxis: {
            type: "category",
            title: "Tank Names",
        },
    });
}
function PlotData(data, divElement, chartName, graphType) {
    if (graphType == "Height") {
        PlotHeight(data, divElement, chartName);
    }
    else if (graphType == "Percentage") {
        PlotPercentage(data, divElement, chartName);
    }
    else if (graphType == "Loads") {
        PlotLoads(data, divElement, chartName);
    }
}
function GetWellData(wellName) {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("/getWellTankReadings?wellName=".concat(encodeURIComponent(wellName)))];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2: return [2 /*return*/, (_a.sent())];
            }
        });
    });
}



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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tools */ "./src/Tools.ts");

jQuery(function () {
    $("#wellSelect").select2();
    $("#graphTypeSelect").select2();
    var wellSelect = document.getElementById("wellSelect");
    var graphTypeSelect = document.getElementById("graphTypeSelect");
    var graphDisplay = document.getElementById("graphDisplay");
    var loadingIcon = document.getElementById("loadingIcon");
    var CURRENT_DATA;
    fetch("/getWells")
        .then(function (res) { return res.json(); })
        .then(function (wellList) {
        for (var _i = 0, wellList_1 = wellList; _i < wellList_1.length; _i++) {
            var wellName = wellList_1[_i];
            var el = document.createElement("option");
            el.value = wellName;
            el.innerText = wellName;
            wellSelect.appendChild(el);
        }
    });
    $("#graphTypeSelect").on("change", function () {
        var _a;
        if (CURRENT_DATA) {
            (_a = document.getElementsByClassName("plot-container")[0]) === null || _a === void 0 ? void 0 : _a.remove();
            loadingIcon.style.display = "inline-block";
            (0,_Tools__WEBPACK_IMPORTED_MODULE_0__.PlotData)(CURRENT_DATA, graphDisplay, wellSelect.value, graphTypeSelect.value);
            loadingIcon.style.display = "none";
        }
    });
    $("#wellSelect").on("change", function () {
        var _a;
        (_a = document.getElementsByClassName("plot-container")[0]) === null || _a === void 0 ? void 0 : _a.remove();
        loadingIcon.style.display = "inline-block";
        (0,_Tools__WEBPACK_IMPORTED_MODULE_0__.GetWellData)(wellSelect.value).then(function (wellData) {
            CURRENT_DATA = wellData;
            (0,_Tools__WEBPACK_IMPORTED_MODULE_0__.PlotData)(CURRENT_DATA, graphDisplay, wellSelect.value, graphTypeSelect.value);
            loadingIcon.style.display = "none";
        });
    });
});

})();

/******/ })()
;