



var cy = cytoscape({

    container: document.getElementById('cy'), // container to render in


    style: STYLE,

    elements: DATA,

    layout: {
        name: 'cose',
        // rows: 3
    }

});
