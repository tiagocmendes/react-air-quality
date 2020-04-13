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
                    return: false
                })
                /*
                var pollutants = [];
                pollutants.push(data[0].pollutants);

                pollutants = Object.entries(pollutants[0]);
                
                var table = [];
                pollutants.forEach(element => table.push([
                    <i className="fas fa-smog"></i>,
                    element[0],
                    element[1].v
                ]))

                this.setState({
                    airQuality: data[0],
                    pollutants: table,
                    return: this.state.return
                })
                */

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
                                <h4> Subscriptions</h4>
                                <p>Last Campaign Performance</p>
                            </CardBody>
                            <CardFooter chart>
                                <div>
                                    <AccessTime /> campaign sent 2 days ago
              </div>
                            </CardFooter>
                        </Card>
                    </GridItem>
                </GridContainer>
            </div>

        );
    }

}

export default CacheDetails;
