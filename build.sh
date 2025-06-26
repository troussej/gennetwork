
echo "Starting build process..."
mkdir -p dist/web
rm -r dist/web/*
cp src/resources/content/* dist/web/
cp dist/data.js dist/web/data.js
cp node_modules/cytoscape/dist/cytoscape.min.js dist/web/
npx sass src/resources/content/style/style.scss dist/web/style.css
echo "Build completed successfully."