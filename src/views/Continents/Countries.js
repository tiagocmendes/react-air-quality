import React from 'react';

import EyeIcon from '@material-ui/icons/Visibility';

import ArrowBack from '@material-ui/icons/ArrowBackIos';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import IconButton from '@material-ui/core/IconButton';
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import Continents from "views/Continents/Continents.js";
import CountryDetails from "views/Continents/CountryDetails.js";

import baseUri from "variables/baseUri.js";

class Countries extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            countries: null,
            selectedCountry: null,
            return: false
        }
        this.toggleReturn = this.toggleReturn.bind(this);
        this.showDetails = this.showDetails.bind(this);
        this.continent = props.continent;
    }

    classes = {
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
        },
        picture: {
            height: "40px", width: "40px", borderRadius: "50%", border: "0.5px solid #9e9e9e"
        }
    };


    showDetails(country) {
        this.setState({
            countries: this.state.countries,
            selectedCountry: country,
            return: this.state.return
        })
    }

    componentDidMount() {
        fetch(baseUri.endpoints.countries + "/" + this.continent, {
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
                var countries = [];
                data.forEach(country => countries.push([
                    <img style={this.classes.picture} src={country.flag} alt={country.name} />,
                    country.name,
                    country.continent,
                    <IconButton aria-label="delete">
                        <EyeIcon onClick={() => this.showDetails(country.name)} style={{ color: "#4caf50" }} fontSize="medium" />
                    </IconButton>
                ]));

                this.setState({
                    countries: countries,
                    selectedCountry: this.state.selectedCountry,
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
        if (this.state.selectedCountry !== null) return <CountryDetails country={this.state.selectedCountry} />
        if (this.state.return) return <Continents />
        return (
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12} style={{ marginTop: "-50px", marginBottom: "20px" }}>
                        <h3><IconButton aria-label="back">
                            <ArrowBack onClick={() => this.toggleReturn()} style={{ color: "#4caf50" }} fontSize="medium" />
                        </IconButton>
                        Countries</h3>
                    </GridItem>
                    {this.state.countries !== null ?
                        <GridItem xs={12} sm={12} md={12}>
                            <Card>
                                <CardHeader style={this.classes.cardHeader}>
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={9}>
                                            <h4 style={this.classes.cardTitleWhite}><i class="fas fa-flag"></i>  List of countries in {this.continent}</h4>
                                            <p style={this.classes.cardCategoryWhite}>Click on details to see specific air quality metrics of a country</p>
                                        </GridItem>

                                    </GridContainer>
                                </CardHeader>
                                <CardBody>
                                    <Table
                                        tableHeaderColor="success"
                                        tableHead={["", "Country", "Continent", "Air quality details"]}
                                        tableData={this.state.countries}
                                    />
                                </CardBody>
                            </Card>

                        </GridItem>
                        : ""}
                </GridContainer>
            </div>
        )
    }

}

export default Countries;