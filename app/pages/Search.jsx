import React from 'react'
import {Grid, Row, Col, Button} from 'react-bootstrap';

import ResultsGeneral from '../components/Search/ResultsGeneral.jsx'

class Search extends React.Component{

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render(){
        return (
            <Grid>
                <Row>
                    <Col md={2}>
                        <ResultsGeneral count={1000}  />
                    </Col>
                    <Col md={10}>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default Search