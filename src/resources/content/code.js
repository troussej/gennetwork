



var cy = cytoscape({

    container: document.getElementById('cy'), // container to render in


    style: STYLE,

    elements: DATA,

    layout: {
        name: 'cose',
        nodeOverlap: 20,
        animate: false
        // rows: 3
    }

});
