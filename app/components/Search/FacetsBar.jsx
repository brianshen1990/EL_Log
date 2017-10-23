import React from 'react'
import {Panel, Checkbox} from 'react-bootstrap';


class FacetsBarCheckItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: props.checked,
        };
    }

    render() {
        return (
            <Checkbox checked={this.state.checked}>
                {this.props.title}
            </Checkbox>
        )
    }

}

class FacetsBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if(this.props.facets && this.props.facets.length > 0) {
            return <Panel>
                {this.props.facets.map((item, idx) => {
                    return (
                        <FacetsBarCheckItem checked_key={item.key} title={item.title} checked={item.checked}/>
                    )
                })}
            </Panel>
        }else{
            return  <Panel>
                empty
            </Panel>
        }
    }
}

export default FacetsBar