import React from 'react'
import ReactTable from 'react-table'

import 'react-table/react-table.css';

class ResultTable extends React.Component {
    render() {
        return (
            <ReactTable className="-striped -highlight" showPagination={false} defaultPageSize={100}
                        columns={this.props.cols} data={this.props.data} />
        )
    }
}
export default ResultTable