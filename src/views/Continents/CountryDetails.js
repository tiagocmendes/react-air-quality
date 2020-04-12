import React from 'react';

import ArrowBack from '@material-ui/icons/ArrowBackIos';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import IconButton from '@material-ui/core/IconButton';

import Card from "components/Card/Card.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Table from "components/Table/Table.js";

import Countries from "views/Continents/Countries.js";

import baseUri from "variables/baseUri.js";

class CountryDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            airQuality: null,
            pollutants: [],
            return: false
        }
        this.continent = props.continent;
        this.country = props.country;
        this.toggleReturn = this.toggleReturn.bind(this);
    }


    classes = {
        aqi: {
            height: "30px",
            width: "60px",
            borderRadius: "10%",
            color: "white",
            backgroundColor: "#4caf50",
            alignItems: "center",
            padding: "20px 20px",
            fontSize: "20px",
            fontWeight: "500",
            marginLeft: "36%"
        },
        cardCategoryWhite: {
            color: "rgba(255,255,255,.62)",
            margin: "0",
            fontSize: "14px",
            fontWeight: "500",
            marginTop: "0",
            marginBottom: "0"
        },
        cardTitleWhite: {
            color: "#FFFFFF",
            marginTop: "0px",
            minHeight: "auto",
            fontWeight: "500",
            fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
            marginBottom: "3px",
            textDecoration: "none"
        },
        cardHeader: {
            backgroundColor: "#4caf50"
        }

    }

    componentDidMount() {
        fetch(baseUri.endpoints.regions + "/" + this.country.name, {
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
        if (this.state.return) return <Countries continent={this.continent} />
        return (
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12} style={{ marginTop: "-50px", marginBottom: "20px" }}>
                        <h3><IconButton aria-label="back">
                            <ArrowBack onClick={() => this.toggleReturn()} style={{ color: "#4caf50" }} fontSize="medium" />
                        </IconButton>
                            <strong>Air Quality Details</strong></h3>
                    </GridItem>
                    {this.state.airQuality !== null ?
                        <GridItem xs={12} sm={12} md={5} style={{ marginTop: "10px" }}>
                            <Card profile>
                                <CardAvatar profile>
                                    <a href="/">
                                        <img style={{ borderRadius: "50%", height: "100px", width: "100px" }} src={this.country.flag} alt="..." />
                                    </a>
                                </CardAvatar>
                                <CardBody profile>
                                    <div style={this.classes.aqi}>{this.state.airQuality.aqi}</div>
                                    <h3>{this.country.name}</h3>
                                    <span><strong>Air Quality Indicator:</strong> {this.state.airQuality.aqi}</span><br />
                                    <span><strong>Station:</strong> {this.state.airQuality.name}</span><br />
                                    <span><strong>Latitude:</strong> {this.state.airQuality.latitude}</span><br />
                                    <span><strong>Latitude:</strong> {this.state.airQuality.longitude}</span><br />
                                    <span><strong>Primary pollutant:</strong> {this.state.airQuality.primaryPollutant}</span><br />
                                    <span><strong>Last update:</strong> {this.state.airQuality.time + " GMT " + this.state.airQuality.timeZone}</span><br />
                                </CardBody>
                            </Card>
                        </GridItem>
                        : ""}
                    {this.state.airQuality !== null ?
                    <GridItem xs={12} sm={12} md={7}>
                        <Card>
                            <CardHeader style={this.classes.cardHeader}>
                                <h4 style={this.classes.cardTitleWhite}><i className="fas fa-smog"></i>  Other Pollutants</h4>
                                <p style={this.classes.cardCategoryWhite}>Concentration of different pollutants in the air</p>
                            </CardHeader>
                            <CardBody>
                                <Table
                                    tableHeaderColor="success"
                                    tableHead={["", "Pollutant", "Value"]}
                                    tableData={this.state.pollutants}
                                />
                            </CardBody>
                        </Card>

                    </GridItem>
                    : "" }
                </GridContainer>
            </div>
        );
    }
}


export default CountryDetails;