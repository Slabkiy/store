import React from 'react';
import '../App.css';
class Cart extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            prices: {}
        }
        this.count = this.count.bind(this);
    }
    async count(event){
        try{
            const response = await fetch('/count', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.props.products)
            });
            const result = await response.json();
            this.setState({
                prices: result
            });
        }catch(err){
            throw new Error(err);
        }
    }
    render(){
        console.log(this.state);
        
        return(
            <div>
                <div className="column">
                    <div className="col">Cart: {this.props.products.length}</div>
                    <div className="col">Prices: {
                        Object.keys(this.state.prices).map(item => <span key={item}>
                            <b> {this.state.prices[item]} </b> {item}
                        </span>)
                    }</div>
                    <div className="col">
                        <button type="button" onClick={this.count}>Count</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Cart;