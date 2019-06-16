"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const DynamicPage = () => {
    return (React.createElement("div", null,
        React.createElement("h1", null, "Dynamic Page"),
        React.createElement("p", null, "This page was loaded asynchronously!!!")));
};
exports.default = DynamicPage;
