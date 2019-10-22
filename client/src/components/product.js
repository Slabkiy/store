import React from 'react';
import '../App.css';

class Product extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            price: 0,
            currency: "RUB",
            quantity: 0
        };
        this.handleChange = this.handleChange.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount(){
        this.setState({
            price: this.props.product.price
        });
        this.setState({
            currency: this.props.product.currency
        });
        this.setState({
            quantity: this.props.product.quantity
        });
    }
    inputChange(event) {
        this.setState({
            quantity: event.target.value
        });
    }
    async handleChange(event){
        const currency = event.target.value
        if(event.target.value === "RUB") {
            this.setState({
                price: this.props.product.price
            });
            this.setState({
                currency: this.props.product.currency
            })
        } else {
            const responce = await fetch(`/convert?price=${this.props.product.price}&to=${currency}`);
            const data = await responce.json();
            this.setState({
                price: data.price
            });
            this.setState({
                currency: currency || "RUB"
            });
        }
        
        
    }
    handleClick(event){
        this.props.addToCart({
            name: this.props.product.name,
            quantity: this.state.quantity > 0 ? this.state.quantity : 0,
            currency: this.props.product.currency,
            price: this.props.product.price,
        });
    }
    render(){
        return(
            <div className="column">
                <div className="col">
                    {this.props.product.name}
                </div>
                <div className="col">
                    <input type="number" min="1" value={this.state.quantity} onChange={this.inputChange}></input>
                </div>
                <div className="col row">
                    <div>
                        Price: { this.state.price }
                    </div>
                    <div>
                    <select value={this.state.currency} onChange={this.handleChange}>
                        <option value="RUB">RUB</option>
                        <option value="EUR">EUR</option>
                        <option value="USD">USD</option>
                    </select>
                    </div>
                </div>
                <div>
                    <button type="button" onClick={this.handleClick}>Add to card</button>
                </div>
            </div>
        )
    }
}

export default Product;