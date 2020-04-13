import React from 'react';

import ChartistGraph from "react-chartist";

import ArrowBack from '@material-ui/icons/ArrowBackIos';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import IconButton from '@material-ui/core/IconButton';
import AccessTime from "@material-ui/icons/AccessTime";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import {
    dailySalesChart,
    emailsSubscriptionChart,
    completedTasksChart
  } from "variables/charts.js";

import CacheAnalytics from "views/CacheAnalytics/CacheAnalytics.js";

import baseUri from "variables/baseUri.js";

class CacheDetails extends React.Component {

    constructor(props) {
        super(props);

        this.cacheType = null;
        this.endpoint = null;
        if (props.cacheDetails === 1) {
            this.endpoint = baseUri.cache.regions;
            this.cacheType = "Air Quality";
        }
        else if (props.cacheDetails === 2) {
            this.cacheType = "Continents";
            this.endpoint = baseUri.cache.continents;
        }
        else {
            this.cacheType = "Countries";
            this.endpoint = baseUri.cache.countries;
        }
            

        this.state = {
            histogram: emailsSubscriptionChart,
            data: null,
            return: false
        }
        this.toggleReturn = this.toggleReturn.bind(this);
    }

    componentDidMount() {


        fetch(this.endpoint, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
        })
            .then(response => {
                if (!response.ok) throw new Error(response.status);
                else return response.json();

            })
            .then(data => {
                console.log(data);
                var histogram = [];
                histogram.push(data.requests);
                histogram.push(data.hits);
                histogram.push(data.misses)
                emailsSubscriptionChart.data.series[0] = histogram;
                this.setState({
                    histogram: emailsSubscriptionChart,
                    data: data,
                    return: false
                })

            })
            .catch(error => {
                console.log("Fetch error: " + error);
            })
    }

    toggleReturn() {
        this.setState({
            return: true
        })
    }

    render() {
        if (this.state.return) return <CacheAnalytics />
        return (
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12} style={{ marginTop: "-50px", marginBottom: "20px" }}>
                        <h3><IconButton aria-label="back">
                            <ArrowBack onClick={() => this.toggleReturn()} style={{ color: "#4caf50" }} fontSize="medium" />
                        </IconButton>
                            <strong>{this.cacheType} Cache Details</strong></h3>
                    </GridItem>
                    {this.state.data !== null ? 
                    <GridItem xs={12} sm={12} md={12}>
                        <Card chart>
                            <CardHeader color="success">
                                <ChartistGraph
                                    className="ct-chart"
                                    data={emailsSubscriptionChart.data}
                                    type="Bar"
                                    options={emailsSubscriptionChart.options}
                                    responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                                    listener={emailsSubscriptionChart.animation}
                                />
                            </CardHeader>
                            <CardBody>
                                <h3><strong><i className="fas fa-handshake"></i> Requests:</strong> {this.state.data.requests}</h3>
                                <h4><strong style={{color: "#5cb360"}}><i className="fas fa-check-square"></i> Hits: </strong> {this.state.data.hits}<br /><strong style={{color: "#f55a4e"}}><i className="fas fa-window-close"></i> Misses:</strong> {this.state.data.misses}</h4>
                                <h4><strong><i class="fas fa-hourglass-start"></i> Time to live: </strong> {this.state.data.timeToLive} seconds<br /><strong><i className="fas fa-clock"></i> Timer:</strong> {this.state.data.timer} seconds</h4>
                            </CardBody>
                            <CardFooter chart>
                                <div><strong><i className="fas fa-history"></i>  Last update:</strong> {new Date(this.state.data.lastRefresh).toString()}</div>
                            </CardFooter>
                        </Card>
                    </GridItem>
                    : "" }
                </GridContainer>
            </div>

        );
    }

}

export default CacheDetails;
