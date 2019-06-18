"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_router_dom_1 = require("react-router-dom");
const Home_1 = require("../components/Home");
const DynamicPage_1 = require("../components/DynamicPage");
const App = () => (React.createElement(react_router_dom_1.BrowserRouter, null,
    React.createElement("div", null,
        React.createElement(react_router_dom_1.Switch, null,
            React.createElement(react_router_dom_1.Route, { exact: true, path: "/", component: Home_1.default }),
            React.createElement(react_router_dom_1.Route, { exact: true, path: "/dynamic", component: DynamicPage_1.default })))));
exports.default = App;
