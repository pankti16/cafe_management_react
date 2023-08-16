import React from 'react';
import { connect } from 'react-redux';
import { HomeText } from '../../utils/Texts';

class Home extends React.Component {
    render(){
        return(
            <div className="container my-5">
                <p>{HomeText.description}</p>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {}
}

export default connect(mapStateToProps,null)(Home);