import Reflux from 'reflux';
import Universal from '../Universal.js'

const Helper = {

    //Sort function which determines which columns to show in the first
    helper_sort(field1, field2) {
        const columns = Universal.Config().columns.sort;
        try {
            if (columns.indexOf(field1) >= 0 && columns.indexOf(field2) < 0) {
                return -1;
            }
            if (columns.indexOf(field1) < 0 && columns.indexOf(field2) >= 0) {
                return 1;
            }
            if (columns.indexOf(field1) < 0 && columns.indexOf(field2) < 0) {
                return field1.toLowerCase().localeCompare(field2.toLowerCase());
            }
            if (columns.indexOf(field1) >= 0 && columns.indexOf(field2) >= 0) {
                return (( columns.indexOf(field1) > columns.indexOf(field2) ) ? 1 : -1 );
            }
        } catch (e) {
            console.log("error 1" + e);
            return field1.localeCompare(field2)
        }
    },

    // Charts Config
    get_histogram(_x_data, _y_data) {
        const x_data = _x_data ? _x_data : [];
        const y_data = _y_data ? _y_data : [];

        return {
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
                labels : x_data,
                datasets : [
                    {
                        backgroundColor:"rgba(38,173,228,0.9)",
                        data : y_data
                    }
                ]
            }
        }
    },

    // Elasticsearch Search data for table
    search(timerange) {

        if (!timerange) {
            timerange = {
                type: "Relative",
                recent: "1h"
            }
        }

        if (!timerange || !timerange.type) {
            timerange.type = "Relative";
        }
        if (timerange.type === "Relative") {
            if (!timerange || !timerange.recent) {
                timerange.recent = "1h";
            }
        }
        return fetch("http://localhost:3000/__/_search", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "size": 100,
                "sort": {
                    "@timestamp": {
                        "order": "desc"
                    }
                },
                "query": {
                    "bool": {
                        "filter": {
                            "range": {
                                "@timestamp": {
                                    "gte": "now-" + timerange.recent,
                                    "lte": "now"
                                }
                            }
                        }
                    }
                }
            })
        }).then((response) => response.json()
        ).then((response) => {
            let ret = [];
            response.hits.hits.forEach(function (item) {
                ret.push(item._source);
            });
            response.hits.hits = ret;
            return response;
        });
    },

    // Elasticsearch Search data for charts
    histogram(timerange) {
        if (!timerange) {
            timerange = {
                type: "Relative",
                recent: "1h",
                interval: "minute"
            }
        }

        if (!timerange || !timerange.type) {
            timerange.type = "Relative";
        }
        if (timerange.type === "Relative") {
            if (!timerange || !timerange.recent) {
                timerange.recent = "1h";
            }
        }
        if (!timerange || !timerange.interval) {
            const _relative_interval = {
                "1h": "minute",
                "2h": "minute",
                "5h": "minute",
                "1d": "hour",
                "2d": "hour",
                "5d": "hour",
                "7d": "day"
            };
            timerange.interval = _relative_interval[timerange.recent] ? _relative_interval[timerange.recent] : "hour";
        }


        return fetch("http://localhost:3000/__/_search", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "size": 0,
                "sort": {
                    "@timestamp": {
                        "order": "desc"
                    }
                },
                "aggs": {
                    "gl_hist": {
                        "filter": {
                            "range": {
                                "@timestamp": {
                                    "gte": "now-" + timerange.recent,
                                    "lte": "now"
                                }
                            }
                        },
                        "aggs": {
                            "tps": {
                                "date_histogram": {
                                    "field": "@timestamp",
                                    "interval": timerange.interval
                                }
                            }
                        }
                    }
                }
            })
        }).then(
            (response) => response.json()
        ).then((response) => {
            let x_data = [];
            let y_data = [];
            response.aggregations.gl_hist.tps.buckets.forEach(function (item) {
                x_data.push(item.key_as_string);
                y_data.push(item.doc_count);
            });
            response.aggregations.x_data = x_data;
            response.aggregations.y_data = y_data;
            return response;
        });
    }

};

let SearchDataActions = Reflux.createActions(["RefreshData", "FacetsChanged"]);

class SearchDataStore extends Reflux.Store{

    constructor() {
        super();
        let cols = this.get_standard_columns();
        this.state = {
            data: this.get_data(),
            columns: cols,
            facets: this.get_standard_facets(cols),
            histogram: Helper.get_histogram(),
            whole_hits : 0
        };
        this.listenables= [SearchDataActions];
    }

    // Actions
    onRefreshData(){
        this.refresh_data();
    }

    onFacetsChanged(params){
        debugger
        this.handle_facets_checkbox(params);
    }

    // Handle Facets Click
    handle_facets_checkbox(params){
        // let param = {
        //     checked: e.target.checked,
        //     checked_key: this.props.checked_key,
        // };
        const checked_key = params.checked_key;
        const checked = params.checked;
        let cols = this.get_customized_columns(this.state.columns, checked_key, checked);
        let facets = this.get_standard_facets(cols);

        this.setState({
            columns: cols,
            facets: facets
        });
    };

    // Call to refresh data
    refresh_data() {
        let _that = this;
        Helper.search().then(function (response) {
            _that.setState({
                data: response.hits.hits,
                whole_hits: response.hits.total
            })
        });
        Helper.histogram().then(function (response) {
            let _config =  Helper.get_histogram(response.aggregations.x_data, response.aggregations.y_data);
            _that.setState({
                histogram: _config
            });
        })
    };

    // Get data for Table
    get_data() {
        this.refresh_data();
        return [];
    };

    // Get cols for Table
    get_standard_columns(){
        let ret = [];
        Universal.Config().columns.sort.forEach(function(item){
            if( Universal.Config().columns.L10N[item] ){
                ret.push({ Header: Universal.Config().columns.L10N[item] , id: item, key: item, accessor:item },)
            }
        });
        return ret.sort(function (a, b) {
            return Helper.helper_sort(a.key, b.key);
        });
    }

    // A method that used to add columns or remove columns
    get_customized_columns(columns, checked_key, checked){
        if(!columns){
            columns = []
        }else{
            let _columns = [];
            columns.forEach(function (item){
                _columns.push(item.key);
            });
            columns = _columns;
        }

        if(checked){
            if(columns.indexOf(checked_key) <0){
                columns.push(checked_key);
            }
        }else{
            let index = columns.indexOf(checked_key);
            if(index >=0){
                columns.splice(index, 1);
            }
        }
        let ret = [];
        columns.forEach(function(item){
            if( Universal.Config().columns.L10N[item] ){
                ret.push({ Header: Universal.Config().columns.L10N[item] , id: item, key: item,  accessor:item },)
            }
        });
        return ret.sort(function (a, b) {
            return Helper.helper_sort(a.key, b.key);
        });
    }

    // Get facets
    get_standard_facets(columns){
        if(!columns){
            columns = []
        }else{
            let _columns = [];
            columns.forEach(function (item){
                _columns.push(item.key);
            });
            columns = _columns;
        }
        let ret = [];
        for(let item in Universal.Config().columns.L10N){
            ret.push({ title: Universal.Config().columns.L10N[item] , dataIndex: item, key: item, checked: ((columns.indexOf(item) >=0) || false) },)
        }
        return ret.sort(function(a, b){
            return Helper.helper_sort(a.key, b.key);
        });
    }

};

export { SearchDataStore, SearchDataActions };