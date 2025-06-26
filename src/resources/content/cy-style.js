

let rich_black= '#001219';
let midnight_green= '#005f73';
let dark_cyan= '#0a9396';
let tiffany_blue= '#94d2bd';
let vanilla= '#e9d8a6';
let gamboge= '#ee9b00';
let alloy_orange= '#ca6702';
let rust= '#bb3e03';
let rufous= '#ae2012';
let auburn= '#9B2226';

var STYLE = [
    {
        "selector": "core",
        "style": {
          
            "selection-box-color": "#AAD8FF",
            "selection-box-border-color": "#8BB0D0",
            "selection-box-opacity": "0.5"
        }
    },

    {
        selector: 'node',
        style: {
            'background-color': vanilla,
            'color': vanilla,
            'label': 'data(id)',
            "width": "mapData(score, 0, 5, 20, 60)",
            "height": "mapData(score, 0, 5, 20, 60)",
            // "text-transform": "uppercase",
            // 'node-si'
        }
    },
    {
        "selector": "edge",
        "style": {
            "curve-style": "straight",
            // "haystack-radius": "0.5",
            "opacity": "0.8",
            "line-color": gamboge,
            // "width": "mapData(weight, 0, 1, 1, 8)",
            "overlay-padding": "3px",
        }
    }
];