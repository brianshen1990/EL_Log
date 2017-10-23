import React from 'react'
import {Grid, Row, Col, Button} from 'react-bootstrap';

import ResultsGeneral from '../components/Search/ResultsGeneral.jsx'
import ResultTable from '../components/Search/ResultTable.jsx'
import FacetsBar from '../components/Search/FacetsBar.jsx'
import ResultHistogram from  '../components/Search/ResultHistogram.jsx'

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
            }],
            whole_hits: 1000,
            facets: [{
                key: "log_type",
                title: "log_type",
                checked: true
            }],
            histogram:{
                height: 160,
                options:{
                    scaleShowVerticalLines: false,
                    scaleShowLabels : false,
                    animation: false,
                    responsive: true,
                    scales: {
                        xAxes: [{
                            type: 'category',
                            gridLines: {
                                display:false,
                            },
                            categoryPercentage: 1.0,
                            barPercentage: 0.9,
                            lineHeight:20,
                            display:false,
                        }]
                    },
                    legend: {
                        display: false
                    }
                },
                data:{
                    labels : [1],
                    datasets : [
                        {
                            backgroundColor:"rgba(38,173,228,0.9)",
                            data : [1]
                        }
                    ]
                }
            }
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