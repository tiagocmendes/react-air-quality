import React from 'react';

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";

import cache01 from "assets/img/cache01.png";

import CacheDetails from "views/CacheAnalytics/CacheDetails.js";

class CacheAnalytics extends React.Component {

    constructor() {
        super();
        this.state = {
            cacheDetails: null
        }
        this.cacheDetails = this.cacheDetails.bind(this);
    }


    cacheDetails(cache) {
        this.setState({
            cacheDetails: cache
        })
    }

    render() {
        if(this.state.cacheDetails !== null) return <CacheDetails cacheDetails={this.state.cacheDetails} />
        return (
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12} style={{ marginTop: "-50px", marginBottom: "20px" }}>
                        <h3><i class="fas fa-hdd"></i> <strong>Cache analytics</strong></h3>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4} style={{ marginTop: "10px" }}>
                        <Card profile>
                            <CardAvatar profile>
                                <a href="/">
                                    <img src={cache01} alt="..." />
                                </a>
                            </CardAvatar>
                            <CardBody profile>
                                <h3>Air Quality Cache</h3>
                                <Button onClick={() => this.cacheDetails(1)} color="success" round>
                                    Details
                                        </Button>
                            </CardBody>
                        </Card>
                    </GridItem>
                </GridContainer>
            </div>
        );
    }

}

export default CacheAnalytics;