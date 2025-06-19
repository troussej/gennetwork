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
            'background-color': '#666',
            'label': 'data(id)',
            "width": "mapData(score, 0, 5, 20, 60)",
            "height": "mapData(score, 0, 5, 20, 60)",
            // 'node-si'
        }
    },
    {
        "selector": "edge",
        "style": {
            "curve-style": "haystack",
            "haystack-radius": "0.5",
            "opacity": "0.8",
            "line-color": "#bbb",
            // "width": "mapData(weight, 0, 1, 1, 8)",
            "overlay-padding": "3px"
        }
    }
];