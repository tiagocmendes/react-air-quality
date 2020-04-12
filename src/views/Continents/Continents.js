import React from 'react';

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import continent1 from "assets/img/continents-01.png";
import continent2 from "assets/img/continents-02.png";
import continent3 from "assets/img/continents-03.png";
import continent4 from "assets/img/continents-04.png";
import continent5 from "assets/img/continents-05.png";
import continent6 from "assets/img/continents-06.png";

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
        this.images = [continent1, continent2, continent3, continent4, continent5, continent6];
        this.countriesPage = this.countriesPage.bind(this);
    }

    componentDidMount() {

        fetch(baseUri.endpoints.continents, {
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
                var continents = [];
                data.forEach(element => {
                    continents.push(element.name);
                });
                this.setState({
                    continents: continents.sort(),
                    selectedContinent: this.state.selectedContinent,
                    redirect: this.state.redirect
                })
            })
            .catch(error => {
                console.log("Fetch error: " + error);
            })

    }

    countriesPage(continent) {
        this.setState({
            selectedContinent: continent,
            redirect: true
        })
    }

    render() {
        if (this.state.redirect) return <Countries continent={this.state.selectedContinent} />
        return (
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12} style={{ marginTop: "-50px", marginBottom: "20px" }}>
                        <h3><i className="fas fa-globe-europe"></i> Continents</h3>
                    </GridItem>
                    {this.state.continents !== null ?
                        this.state.continents.map((continent, key) => {
                            return <GridItem xs={12} sm={12} md={4} style={{ marginTop: "10px" }}>
                                <Card profile>
                                    <CardAvatar profile>
                                        <a href="/">
                                            <img src={this.images[key]} alt="..." />
                                        </a>
                                    </CardAvatar>
                                    <CardBody profile>
                                        <h3>{continent}</h3>
                                        <Button color="success" round onClick={() => this.countriesPage(continent)}>
                                            Countries
                                        </Button>
                                    </CardBody>
                                </Card>
                            </GridItem>
                        })
                        : ""}
                </GridContainer>
            </div>
        );
    }
}

export default Continents;