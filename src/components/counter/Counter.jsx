import React, {Component} from 'react';
import CounterButton from './CounterButton'

class Counter extends Component {

    constructor() {
        super();
        this.state = {
            counter: 0
        }

        this.increment = this.increment.bind(this);
        this.reset = this.reset.bind(this);
    }

    render() {
        return (
            <div className="counter">
                <div>
                    <CounterButton by={1} incrementMethod={this.increment}/>
                    <CounterButton by={-1} incrementMethod={this.increment}/>
                </div>
                <div>
                    <CounterButton by={5} incrementMethod={this.increment}/>
                    <CounterButton by={-5} incrementMethod={this.increment}/>
                </div>
                <div>
                    <CounterButton by={10} incrementMethod={this.increment}/>
                    <CounterButton by={-10} incrementMethod={this.increment}/>
                </div>
                <span className="count" style ={{color: "blue"}}>{this.state.counter}</span>
                <div>
                    <button className="reset" onClick={this.reset}>Reset</button>
                </div>
            </div>
        );
    }


    increment(by) {
        this.setState(
            (prevState) => {
                return {counter: prevState.counter + by }
            }
        );
    }

    reset() {
        this.setState( {counter: 0 } )
    }
}


export default Counter