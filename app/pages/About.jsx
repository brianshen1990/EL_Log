import React from 'react'
import {Grid, Row, Col} from 'react-bootstrap'

class About extends React.Component{
    render() {
        return  <Grid>
            <Row>
                <Col md={2}>
                </Col>
                <Col md={8}>
                    About
                </Col>
            </Row>
        </Grid>
    }
}

export default About