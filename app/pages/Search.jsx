import React from 'react'
import {Grid, Row, Col, Button} from 'react-bootstrap';

import ResultsGeneral from '../components/Search/ResultsGeneral.jsx'
import ResultTable from '../components/Search/ResultTable.jsx'
import FacetsBar from '../components/Search/FacetsBar.jsx'
import ResultHistogram from  '../components/Search/ResultHistogram.jsx'

import {SearchDataStore} from '../Store/Search/SearchData.js'

class Search extends React.Component{

    constructor(props) {
        super(props);
        this.store = new SearchDataStore();
        let columns = this.store.get_standard_columns();
        let facets = this.store.get_standard_facets(columns);

        this.state = {
            columns:columns,
            data: this.store.getdata(),
            whole_hits: 0,
            facets:facets,
            histogram: this.store.get_histogram()
        }

    }

    componentDidMount() {
        let _that = this;
        _that.store.refresh_data(function (response) {
            _that.setState({
                data: response.hits.hits,
                whole_hits: response.hits.total
            })
        },function (response) {
            _that.setState({
                histogram: response
            });
        });
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