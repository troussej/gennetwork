
echo "Starting build process..."
mkdir -p dist/web
rm dist/web/*
cp src/resources/content/* dist/web/
cp dist/data.js dist/web/data.js
cp node_modules/cytoscape/dist/cytoscape.min.js dist/web/
echo "Build completed successfully."