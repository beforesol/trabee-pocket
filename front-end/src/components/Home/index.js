"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_router_dom_1 = require("react-router-dom");
require("./home.scss");
const Home = () => {
    return (React.createElement("div", { className: "home" },
        React.createElement("p", null, "Hello World of React and Webpack!"),
        React.createElement("p", null,
            React.createElement(react_router_dom_1.Link, { to: "/dynamic" }, "Navigate to Dynamic Page"))));
};
exports.default = Home;
