import React, {Component} from 'react'

import Modal from '../../components/UI/Modal/Modal'

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        };

        componentWillMount() {
            this.reqIntercepter = axios.interceptors.request.use(req => {
                this.setState({error: false});
                return req;
            });
            this.resIntercepter = axios.interceptors.response.use(res=>res, err => {
                this.setState({error: err})
            });
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqIntercepter);
            axios.interceptors.response.eject(this.resIntercepter);
        }

        errorConfirmedHandler = () => {
            this.setState({error: null});
        }

        render() {
            return (
                <React.Fragment>
                    <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </React.Fragment>
            );
        }
    }
}

export default withErrorHandler;