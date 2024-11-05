"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OPCUA_ORGAN_USER_CHOICE = exports.OPCUA_ORGAN_STATES = exports.OPCUA_ORGAN_TYPE = void 0;
exports.OPCUA_ORGAN_TYPE = "OPCUA_ORGAN_TYPE";
var OPCUA_ORGAN_STATES;
(function (OPCUA_ORGAN_STATES) {
    OPCUA_ORGAN_STATES["initial"] = "initial";
    OPCUA_ORGAN_STATES["readyToDiscover"] = "readyToDiscover";
    OPCUA_ORGAN_STATES["discovering"] = "discovering";
    OPCUA_ORGAN_STATES["discovered"] = "discovered";
    OPCUA_ORGAN_STATES["readyToCreate"] = "readyToCreate";
    OPCUA_ORGAN_STATES["creating"] = "creating";
    OPCUA_ORGAN_STATES["created"] = "created";
    OPCUA_ORGAN_STATES["error"] = "error";
    OPCUA_ORGAN_STATES["timeout"] = "timeout";
    OPCUA_ORGAN_STATES["cancelled"] = "cancelled";
    OPCUA_ORGAN_STATES["pending"] = "pending";
})(OPCUA_ORGAN_STATES || (exports.OPCUA_ORGAN_STATES = OPCUA_ORGAN_STATES = {}));
var OPCUA_ORGAN_USER_CHOICE;
(function (OPCUA_ORGAN_USER_CHOICE) {
    OPCUA_ORGAN_USER_CHOICE["yes"] = "yes";
    OPCUA_ORGAN_USER_CHOICE["no"] = "no";
})(OPCUA_ORGAN_USER_CHOICE || (exports.OPCUA_ORGAN_USER_CHOICE = OPCUA_ORGAN_USER_CHOICE = {}));
//# sourceMappingURL=constants.js.map