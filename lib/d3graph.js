'use strict';

var d3 = require('d3');

/**
 * d3graph, a function to generate a line graph of for an array of objects.
 * @param data - array of objects containing the line name and the corresponding array of values: eg. [{name: 'Example', values: [1,2,3]}]
 * @param graphWidth - integer value for graph width.
 * @param graphHeight - integer value for graph height.
 */
module.exports.d3graph = function (data, graphWidth, graphHeight) {
    var margin = { top: 20, right: 110, bottom: 30, left: 80 },
        width = graphWidth - margin.left - margin.right,
        height = graphHeight - margin.top - margin.bottom;

    var x = d3.scale.linear()
        .range([0, width]);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .tickFormat(d3.format('d'))
        .orient('bottom');

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient('left');

    var yAxisGrid = function () {
        return d3.svg.axis()
            .scale(y)
            .orient('left');
    };

    var line = d3.svg.line()
        .interpolate('basis')
        .x(function (d, i) {
            return x(i + 1);
        })
        .y(function (d) {
            return y(d);
        });

    var svg = d3.select('body').append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    x.domain([1, d3.max(data, function (c) {
        return d3.max(c.values, function (v, i) {
            return i + 1;
        });
    })]);

    y.domain([
        d3.min(data, function (c) {
            return d3.min(c.values, function (v) {
                return v;
            });
        }),
        d3.max(data, function (c) {
            return d3.max(c.values, function (v) {
                return v;
            });
        })
    ]);

    svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis)
        .append('text')
        .attr('y', -10)
        .attr('x', width)
        .attr('dy', '.71em')
        .style('text-anchor', 'end')
        .text('Iterations');

    svg.append('g')
        .attr('class', 'y axis')
        .call(yAxis)
        .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '.71em')
        .style('text-anchor', 'end')
        .text('Heap Size');

    svg.append('g')
        .attr('class', 'grid')
        .call(yAxisGrid()
            .tickSize(-width, 0, 0)
            .tickFormat('')
    );

    var heap = svg.selectAll('.heap')
        .data(data)
        .enter().append('g')
        .attr('class', 'heap');

    heap.append('path')
        .attr('class', function (d) {
            return 'line ' + d.name;
        })
        .attr('d', function (d) {
            return line(d.values);
        });

    heap.append('rect')
        .datum(function (d) {
            return { name: d.name, value: d.values[d.values.length - 1] };
        })
        .attr('class', function (d) {
            return 'line ' + d.name;
        })
        .attr('transform', function (d, i) {
            return 'translate(' + (width + 2) + ',' + (5 + (height / 2) + (15 * i)) + ')';
        })
        .attr('width', 10)
        .attr('height', 2);

    heap.append('text')
        .datum(function (d) {
            return { name: d.name, value: d.values[d.values.length - 1] };
        })
        .attr('transform', function (d, i) {
            return 'translate(' + (width + 15) + ',' + ((height / 2) + (15 * i)) + ')';
        })
        .attr('x', 3)
        .attr('dy', '.71em')
        .attr('textLength', 80)
        .attr('lengthAdjust', 'spacing')
        .text(function (d) {
            return d.name;
        });

    // Graph and body styling
    d3.select('body')
        .style('background-color', 'white')
        .style('font', '10px sans-serif');

    d3.selectAll('.axis path')
        .style('fill', 'none')
        .style('stroke', '#000')
        .style('shape-rendering', 'crispEdges');

    d3.selectAll('.axis line')
        .style('fill', 'none')
        .style('stroke', '#000')
        .style('shape-rendering', 'crispEdges');

    d3.selectAll('.grid .tick')
        .style('stroke', 'lightgrey')
        .style('stroke-opacity', '0.7')
        .style('shape-rendering', 'crispEdges');

    d3.selectAll('.line')
        .style('fill', 'none')
        .style('stroke', 'steelblue')
        .style('stroke-width', '1.5px');

    d3.selectAll('.line.totalJSHeapSize')
        .style('stroke', 'orange');
};
