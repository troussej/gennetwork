
mkdir -p dist/web
rm dist/web/*
cp content/* dist/web/
cp dist/data.js dist/web/data.js
cp node_modules/cytoscape/dist/cytoscape.min.js dist/web/