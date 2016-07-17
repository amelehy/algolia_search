// var Searchbar = React.createClass({
//   getInitialState: function() {
//     return {message: 'default'};
//   },
//   componentDidMount: function() {
//     // this.initSearch();
//   },
//   initSearch: function(){
//     var client = $.algolia.Client('IPQITGZMEV', '869bcfea95a439b819bbf013fac36dee');
//     var index = client.initIndex('best buy');
//     var _this = this;
//     index.search('A', function searchDone(err, results) {
//       if (err) {
//         throw err;
//       }
//       console.log('We got `' + results.nbHits + '` results');
//       console.log('Here is the first one: ', results.hits[0]);
//       _this.setState({message: results.hits[0].name});
//     });
//   },
//   render: function() {
//     return (
//       <h1>{this.state.message}</h1>
//     );
//   }
// });

var InstantSearch = React.createClass({
  getInitialState: function() {
    return {message: ''};
  },
  componentDidMount: function() {
    this.initSearch();
  },
  initSearch: function(){
    var search = instantsearch({
      appId: 'IPQITGZMEV',
      apiKey: '869bcfea95a439b819bbf013fac36dee',
      indexName: 'best buy',
      urlSync: true
    });
    search.addWidget(
      instantsearch.widgets.searchBox({
        container: '#search-box',
        placeholder: 'Search for products...'
      })
    );

    search.addWidget(
      instantsearch.widgets.hits({
        container: '#hits-container',
        templates: {
          item: '<strong>Hit {{objectID}}</strong>: {{{_highlightResult.name.value}}}'
        }
      })
    );

    search.addWidget(
      instantsearch.widgets.pagination({
        container: '#pagination-container'
      })
    );

    search.start();
  },
  render: function() {
    return (
      <h1>{this.state.message}</h1>
    );
  }
});


ReactDOM.render(
  <InstantSearch/>,
  document.getElementById('container')
);
