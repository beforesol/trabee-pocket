"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
require("./header.scss");
const Home = ({ type }) => {
    return (React.createElement("div", { className: "header", style: { 'backgroundColor': type } }, "header"));
};
exports.default = Home;
