import React from 'react';

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import avatar from "assets/img/faces/marc.jpg";

import Countries from "views/Continents/Countries.js";

import baseUri from "variables/baseUri.js";

class Continents extends React.Component {

    constructor() {
        super();
        this.state = {
            continents: null,
            selectedContinent: null,
            redirect: false 
        }
    }

    componentDidMount() {

        fetch(baseUri.)


    }

    render() {
        if(this.state.redirect) return <Countries continent={this.state.selectedContinent} />
        return (
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <h3><i className="fas fa-globe-europe"></i> Continents</h3>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4} style={{marginTop: "30px"}}>
                        <Card profile>
                            <CardAvatar profile>
                                <a href="#pablo" onClick={e => e.preventDefault()}>
                                    <img src={avatar} alt="..." />
                                </a>
                            </CardAvatar>
                            <CardBody profile>
                                <h3>Europe</h3>
                                <Button color="success" round>
                                    Countries
                                </Button>
                            </CardBody>
                        </Card>
                    </GridItem>

                </GridContainer>
            </div>
        );
    }
}

export default Continents;