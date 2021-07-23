import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { commerce } from "./lib/commerce";
import { Navbar, Products, Cart } from "./components";
import { responsiveFontSizes } from "@material-ui/core";

const App = () => {
  const [products, setProducts] = useState([]);

  const [cart, setCart] = useState({});

  console.log(products);

  const getProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  const getCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);
    setCart(item.cart);
  };

  const handleUpdateCartQty = async (id, quantity) => {
    const response = await commerce.cart.update(id, { quantity });
    setCart(response.cart);
  };

  const handleRemoveCart = async (id) => {
    const response = await commerce.cart.remove(id);
    setCart(response.cart);
  };

  const handleEmptyCart = async () => {
    const response = await commerce.cart.empty();
    setCart(response.cart);
  };

  useEffect(() => {
    getProducts();
    getCart();
  }, []);

  if (products.length !== 0) {
    return (
      <Router>
        <Navbar items={cart.total_items} />
        <Switch>
          <Route path="/" exact>
            <Products products={products} handleAddToCart={handleAddToCart} />
          </Route>
          <Route path="/cart">
            <Cart
              cart={cart}
              handleUpdateCartQty={handleUpdateCartQty}
              handleRemoveCart={handleRemoveCart}
              handleEmptyCart={handleEmptyCart}
            />
          </Route>
        </Switch>
      </Router>
    );
  } else {
    return <div>....Loading</div>;
  }
};

export default App;
