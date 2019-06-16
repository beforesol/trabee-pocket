"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_router_dom_1 = require("react-router-dom");
const index_1 = require("../components/Home/index");
const index_2 = require("../components/DynamicPage/index");
const App = () => (React.createElement(react_router_dom_1.BrowserRouter, null,
    React.createElement("div", null,
        React.createElement(react_router_dom_1.Switch, null,
            React.createElement(react_router_dom_1.Route, { exact: true, path: "/", component: index_1.default }),
            React.createElement(react_router_dom_1.Route, { exact: true, path: "/dynamic", component: index_2.default })))));
exports.default = App;
