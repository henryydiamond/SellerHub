const express = require('express');
const products = require('./data/products');
const app = express();

app.get('/api/products', (req, res) => {
	res.json(products);
});
app.get('/api/product/:id', (req, res) => {
	const product = products.find(p => p._id === req.params.id);
	res.json(product);
});
const PORT = 5000 || process.env.PORT;
app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
