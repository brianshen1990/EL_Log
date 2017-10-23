import React from 'react'
import {Grid, Row, Col, Button} from 'react-bootstrap';

import ResultsGeneral from '../components/Search/ResultsGeneral.jsx'
import ResultTable from '../components/Search/ResultTable.jsx'

class Search extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            columns: [{
                Header: 'Number',
                accessor: 'number'
            }],
            data:[{
                number:10
            }]
        };
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
                        <ResultTable data={this.state.data} cols={this.state.columns} />
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default Search