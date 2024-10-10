const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;
app.use(cors());

let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 },
];

//1

app.get('/cart/add', (req, res) => {
  const { productId, name, price, quantity } = req.query;

  if (!productId || !name || !price || !quantity) {
    return res.status(400).json({ error: 'Missing required query parameters' });
  }

  const newItem = {
    productId: parseInt(productId),
    name: name,
    price: parseFloat(price),
    quantity: parseInt(quantity),
  };

  cart.push(newItem);

  res.json({ cartItems: cart });
});

//2

app.get('/cart/edit', (req, res) => {
  const { productId, quantity } = req.query;

  if (!productId || !quantity) {
    return res.status(400).json({ error: 'Missing required query parameters' });
  }

  const item = cart.find((item) => item.productId === parseInt(productId));

  if (!item) {
    return res.status(404).json({ error: 'Item not found in cart' });
  }

  item.quantity = parseInt(quantity);

  res.json({ cartItems: cart });
});

//3

app.get('/cart/delete', (req, res) => {
  const { productId } = req.query;

  if (!productId) {
    return res.status(400).json({ error: 'Missing required query parameter' });
  }

  const initialLength = cart.length;
  cart = cart.filter((item) => item.productId !== parseInt(productId));

  if (cart.length === initialLength) {
    return res.status(404).json({ error: 'Item not found in cart' });
  }

  res.json({ cartItems: cart });
});

//4

app.get('/cart', (req, res) => {
  res.json({ cartItems: cart });
});

//5

app.get('/cart/total-quantity', (req, res) => {
  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
  res.json({ totalQuantity });
});

//6
app.get('/cart/total-price', (req, res) => {
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  res.json({ totalPrice });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
