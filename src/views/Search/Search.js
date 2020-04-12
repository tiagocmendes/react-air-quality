import React from 'react';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment'
import SearchIcon from '@material-ui/icons/Search';

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Table from "components/Table/Table.js";
import Button from "components/CustomButtons/Button.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";

import baseUri from "variables/baseUri.js";

class Search extends React.Component {

    constructor() {
        super();
        this.state = {
            notFound: false,
            region: null,
            message: "hello",
            color: "danger",
        }
        this.search = this.search.bind(this);
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

    search() {

        var region = document.getElementById("outlined-adornment-amount").value;

        if (region === "") {
            this.setState({
                notFound: true,
                region: null,
                message: "Region not available!",
                color: "danger",
            });
            return
        }


        fetch(baseUri.endpoints.regions + "/" + region, {
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

                if (data.length === 0) {
                    this.setState({
                        notFound: true,
                        region: null,
                        message: "Region not available!",
                        color: "danger",
                    });
                    return
                }
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
                    notFound: false,
                    region: data[0],
                    pollutants: table,
                    message: "Region not available!",
                    color: "danger",
                })

            })
            .catch(error => {
                console.log("Fetch error: " + error);
            })

    }

    render() {
        return (
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12} style={{ marginTop: "-50px", marginBottom: "20px" }}>
                        <h3><i class="fas fa-search"></i> <strong>Search region</strong></h3>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={1}></GridItem>
                    <GridItem xs={12} sm={12} md={8}>
                        <FormControl fullWidth variant="outlined" >
                            <InputLabel htmlFor="outlined-adornment-amount">Region</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-amount"
                                startAdornment={<InputAdornment position="start"><i className="fas fa-map-marked-alt"></i></InputAdornment>}
                                labelWidth={60}
                            />
                        </FormControl>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={2}><Button color="success" size="large" round onClick={this.search}> <SearchIcon /> Search</Button></GridItem>
                    <GridItem xs={12} sm={12} md={1}></GridItem>
                    <GridItem xs={12} sm={12} md={1}></GridItem>

                    {this.state.notFound === true ?
                        <GridItem xs={12} sm={12} md={5} style={{ marginTop: "20px" }}>
                            <SnackbarContent
                                message={this.state.message}
                                color={this.state.color}
                            />
                        </GridItem> :
                        ""}

                    <GridItem xs={12} sm={12} md={6}></GridItem>
                    <GridItem xs={12} sm={12} md={1}></GridItem>
                    {this.state.region !== null ?
                        <GridItem xs={12} sm={12} md={5} style={{ marginTop: "10px" }}>
                            <Card profile>
                                <CardBody profile>
                                    <div style={this.classes.aqi}>{this.state.region.aqi}</div>
                                    <h3>{this.state.region.name}</h3>
                                    <span><strong>Air Quality Indicator:</strong> {this.state.region.aqi}</span><br />
                                    <span><strong>Station:</strong> {this.state.region.name}</span><br />
                                    <span><strong>Latitude:</strong> {this.state.region.latitude}</span><br />
                                    <span><strong>Latitude:</strong> {this.state.region.longitude}</span><br />
                                    <span><strong>Primary pollutant:</strong> {this.state.region.primaryPollutant}</span><br />
                                    <span><strong>Last update:</strong> {this.state.region.time + " GMT " + this.state.region.timeZone}</span><br />
                                </CardBody>
                            </Card>
                        </GridItem>
                        : ""}
                    {this.state.region !== null ?
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
                        : ""}

                </GridContainer>
            </div >
        );
    }

}


export default Search;
