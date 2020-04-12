import React from 'react';

import ArrowBack from '@material-ui/icons/ArrowBackIos';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import IconButton from '@material-ui/core/IconButton';
import Table from "components/Table/Table.js";

import Continents from "views/Continents/Continents.js";

class Countries extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            return: false
        }
        this.toggleReturn = this.toggleReturn.bind(this);
    }

    toggleReturn() {
        this.setState({
            return: true
        })
    }


    render() {
        if(this.state.return) return <Continents />
        return (
            <div>
                 <GridContainer>
                    <GridItem xs={12} sm={12} md={12} style={{ marginTop: "-50px", marginBottom: "20px" }}>
                    <h3><IconButton aria-label="back">
                            <ArrowBack onClick={() => this.toggleReturn()} style={{ color: "#4caf50" }} fontSize="medium" />
                        </IconButton>
                        Countries</h3>
                    </GridItem>
                </GridContainer>
            </div>
        )
    }

}

export default Countries;