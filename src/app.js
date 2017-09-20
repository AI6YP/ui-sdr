'use strict';

const lib = require('../lib')
    , update = require('immutability-helper')
    , React = require('react')
    , ReactDOM = require('react-dom');

const $ = React.createElement;
const Freq = lib.freq(React)({x:3, y:4, w:10, h:1});
const Grid = lib.grid(React)({x:16, y:9})(Freq);

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {freq: '\u2007\u2007\u200714.000.000', b: 2}
        };
        this.updateState = this.updateState.bind(this);
    }

    updateState (spec) {
        this.setState(function (state) {
            return update(state, spec);
        });
    }

    render () {
        return $(Grid, {data: this.state.data});
    }
}

ReactDOM.render($(App, {}), document.getElementById('root'));
