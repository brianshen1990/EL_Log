import React from 'react'
import {Panel, Checkbox} from 'react-bootstrap';

import {SearchDataActions} from '../../store/search/SearchData.js'

class FacetsBarCheckItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: props.checked,
        };
        this.value_changed = this.value_changed.bind(this);
    }

    value_changed(e){
        debugger
        if( e && e.target && (e.target.checked !== this.state.checked) ){
            this.setState({
                checked: e.target.checked
            });
            let param = {
                checked: e.target.checked,
                checked_key: this.props.checked_key,
            };
            SearchDataActions.FacetsChanged(param);
        }
    }

    render() {
        return (
            <Checkbox checked={this.state.checked} onChange={this.value_changed}>
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