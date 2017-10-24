import React from 'react'
import Reflux from 'reflux';
import {Grid, Row, Col, Button} from 'react-bootstrap';

import ResultsGeneral from '../components/Search/ResultsGeneral.jsx'
import ResultTable from '../components/Search/ResultTable.jsx'
import FacetsBar from '../components/Search/FacetsBar.jsx'
import ResultHistogram from  '../components/Search/ResultHistogram.jsx'

import {SearchDataStore, SearchDataActions} from '../Store/Search/SearchData.js'

class Search extends Reflux.Component{

    constructor(props) {
        super(props);
        this.state = {};
        this.store = new SearchDataStore();
    }

    componentDidMount() {
        SearchDataActions.RefreshData();
    }

    componentWillUnmount() {
    }

    render(){
        return (
            <Grid>
                <Row>
                    <Col md={2}>
                        <ResultsGeneral count={this.state.whole_hits}  />
                        <br />
                        <FacetsBar facets={this.state.facets} />
                    </Col>
                    <Col md={10}>
                        <ResultHistogram {...this.state.histogram} />
                        <ResultTable data={this.state.data} cols={this.state.columns} />
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default Search