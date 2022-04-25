import React, {Component} from 'react'

const asyncComponent = (importCommponent) => {
    return class extends Component {
        state = {
            component: null
        }

        componentDidMount () {
            importCommponent()
                .then(cmp => {
                    this.setState({component: cmp.default});
                })
        }

        render() {
            const C = this.state.component;
            return C ? <C {...this.props} /> : null;
        }
    }
}

export default asyncComponent;