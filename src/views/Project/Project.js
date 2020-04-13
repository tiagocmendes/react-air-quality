import React from 'react';

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

class Project extends React.Component {

    render() {
        return (
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12} style={{ marginTop: "-50px", marginBottom: "20px" }}>
                        <h3><i class="fab fa-github"></i> <strong>Project Details</strong></h3>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                        <ul>
                            <li><strong>Third-party API:</strong> <a href="https://aqicn.org/json-api/doc/">https://aqicn.org/json-api/doc/</a></li>
                            <li><strong>React project: </strong> <a href="https://github.com/tiagocmendes/react-air-quality">https://github.com/tiagocmendes/react-air-quality</a></li>
                            <li><strong>Spring Boot project: </strong> <a href="https://github.com/tiagocmendes/spring-air-quality">https://github.com/tiagocmendes/spring-air-quality</a></li>
                        </ul>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                        <h4><strong>Author:</strong> Tiago Mendes<br /> <small><em>15th April 2020</em></small></h4>
                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}

export default Project;