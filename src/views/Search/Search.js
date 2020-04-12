import React from 'react';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment'
import SearchIcon from '@material-ui/icons/Search';

import Button from "components/CustomButtons/Button.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";


class Search extends React.Component {


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
                    <GridItem xs={12} sm={12} md={2}><Button color="success" size="large" round><SearchIcon /> Search</Button></GridItem>
                    <GridItem xs={12} sm={12} md={1}></GridItem>

                </GridContainer>
            </div >
        );
    }

}


export default Search;
