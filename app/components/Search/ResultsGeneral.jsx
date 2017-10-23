import React from 'react'
import {Panel, Label} from 'react-bootstrap';

class ResultsGeneral extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Panel>
                <p>Whole Count: <Label>{this.props.count}</Label></p>
            </Panel>
        )
    }
}
export default ResultsGeneral