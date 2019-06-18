"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_router_dom_1 = require("react-router-dom");
const Header_1 = require("../Header");
require("./home.scss");
class Home extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            type: 'green'
        };
    }
    render() {
        const { type } = this.state;
        return (React.createElement("div", { className: "home" },
            React.createElement(Header_1.default, { type: type }),
            React.createElement("p", null, "Hello World of React and Webpack!"),
            React.createElement("p", null,
                React.createElement(react_router_dom_1.Link, { to: "/dynamic" }, "Navigate to Dynamic Page"))));
    }
    ;
}
;
exports.default = Home;
