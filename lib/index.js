'use strict';

const responsive = require('@vx/responsive');
const withParentSize = responsive.withParentSize;
// const Demo = withParentSize(Demo1);

const grid = React => {
    const m = {left: 20, right: 20, top: 20, bottom: 20};
    const $ = React.createElement;
    return (cfg) => {
        return (Child) => {
            return withParentSize(
                class Grid extends React.Component {

                    constructor (props) {
                        super(props);
                    }

                    render () {
                        const p = this.props;
                        const dx = (p.parentWidth - m.left - m.right - 4) / cfg.x |0;
                        const dy = (p.parentHeight - m.top - m.bottom - 4) / cfg.y |0;
                        const d = Math.min(dx, dy);
                        const size = {
                            w: cfg.x * d,
                            h: cfg.y * d
                        };
                        return (
                            $('svg',
                                {
                                    width: size.w + m.left + m.right,
                                    height: size.h + m.top + m.bottom
                                },
                                $('defs', {},
                                    $('style', {}, `
.back { fill: #000 }
.liteBack { fill: #111 }
.l1 { stroke: black; fill: none; stroke-linecap: round; }
.l3 { stroke: black; fill: none; stroke-linecap: round; stroke-width: 3 }
.t1 { fill: #fff; text-anchor: middle; font-size: ${ 1.3 * d | 0 }px; font-family: 'Roboto', sans-serif; font-weight:500; }
`
                                    )
                                ),
                                $('g', {transform: `translate(${m.left}, ${m.top})`},
                                    $('rect', {width: size.w, height: size.h, className: 'back'}),
                                    $(Child, {data: p.data, grid: {x: cfg.x, y: cfg.y, d: d}})
                                )
                            )
                        );
                    }
                }
            );
        };
    };
};

const freq = React => {
    const $ = React.createElement;
    return (cfg) => {
        return class Freq extends React.Component {

            constructor (props) {
                super(props);
            }

            render () {
                const p = this.props;
                const grid = p.grid;
                return (
                    $('g', { transform: `translate(${cfg.x * grid.d}, ${cfg.y * grid.d})`},
                        $('rect', {
                            width: cfg.w * grid.d,
                            height: cfg.h * grid.d,
                            className: 'liteBack'
                        }),
                        $('g', { transform: `translate(${cfg.w / 2 * grid.d}, ${cfg.h * grid.d})`},
                            $('text', {
                                className: 't1', xmlSpace: 'preserve'
                            }, p.data.freq)
                        )
                    )
                );
            }

        };
    };
};

module.exports = {
    grid: grid,
    freq: freq
};
