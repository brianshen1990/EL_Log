import React from 'react'
import { Bar } from 'react-chartjs-2';


class ResultHistogram extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return <Bar data={this.props.data} options={this.props.options}
                    height={this.props.height} width="800" redraw/>
    }

}

export default ResultHistogram