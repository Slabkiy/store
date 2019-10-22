import React from 'react';
import './App.css';
import Product from './components/product';
import Cart from './components/cart';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      cart: []
    };
    this.addToCart = this.addToCart.bind(this);
  }
  addToCart(item){
    let cart = this.state.cart;
    cart.push(item);
    this.setState({
      cart
    });
    console.log(this.state.cart);
  }
  async componentDidMount(){
    try{
      const response = await fetch('/getProducts');
      const result = await response.json();
      this.setState({
        products: result,
      });
    }catch(err){
      console.log(err);
    }
  }
  
  render(){
    return(
      <div className="column">
        <div className="row">

            <Cart products={this.state.cart}/>

        </div>
        <div className="row">
          
            {
              this.state.products.map(product => 
                  <div className="col" key={product.id}>
                    <Product  product={product} addToCart={this.addToCart} />
                  </div>
                )
            }
          
        </div>
      </div>
    )
  }
}

export default App;
