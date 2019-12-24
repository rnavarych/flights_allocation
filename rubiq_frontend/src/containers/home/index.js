import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import PropTypes from 'prop-types';

import { uploadFile } from '../../actions/fileActions';
import AllocationResults from '../../components/allocationResults'
import './styles.scss';

class App extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            flights: null,
            passengers: null,
        };
    }

    getFileFromEvent = (e) => {
        return e.target.files[0] || null;
    };

    handleFlightsUplaoding = (e) => this.setState({ flights: this.getFileFromEvent(e) });

    handlePnrsUploading = (e) => this.setState({ passengers: this.getFileFromEvent(e) });

    sendFiles = () => {
        this.props.uploadFile({ passengers: this.state.passengers, flights: this.state.flights })
    };

    render() {
        return (
            <div className="app">
                <div className='app_uploadForm'>
                    <div className='app_uploadForm_inputBlock'>
                        <p>Flights: </p>
                        <input type="file" accept='.csv' onChange={this.handleFlightsUplaoding} />
                    </div>
                    <div className='app_uploadForm_inputBlock'>
                        <p>Passengers: </p>
                        <input type="file" accept='.csv' onChange={this.handlePnrsUploading} />
                    </div>
                    <button className='button' onClick={this.sendFiles}>
                        Send
                    </button>
                    {
                        this.props.flights.length > 0 &&
                            <AllocationResults flights={this.props.flights} />
                    }
                </div>
            </div>
        );
    }
}

App.propTypes = {
    flights: PropTypes.array,
    uploadFile: PropTypes.func
};

const mapStateToProps = ({ passengers: { flights } }) => ({ flights });
const mapDispatchToProps = (dispatch) => bindActionCreators({ uploadFile }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
