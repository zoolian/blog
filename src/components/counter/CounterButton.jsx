import React, {Component} from 'react';
import PropTypes from 'prop-types'

class CounterButton extends Component {

    render() {
        return (
        <div className="counter">
            <div>
                <button onClick={() => this.props.incrementMethod(this.props.by)}>{this.props.by}</button>
                
            </div>
        </div>
        );
    }

}

CounterButton.defaultProps = { by : 1 }
CounterButton.propTypes = { by : PropTypes.number }

export default CounterButton