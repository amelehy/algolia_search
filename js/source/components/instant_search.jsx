var InstantSearch = React.createClass({

  config: {
    appId: 'IPQITGZMEV',
    apiKey: '869bcfea95a439b819bbf013fac36dee',
    indexName: 'best buy', 
    searchBoxId: '#search-box', 
    searchBoxPlaceholder: 'Search for products...', 
    hitsId: '#hits-container', 
    paginationId: '#pagination-container'
  },

  componentDidMount: function() {
    this.initSearch();
  },
  initSearch: function(){
    var searchHandle = instantsearch({
      appId: this.config.appId,
      apiKey: this.config.apiKey,
      indexName: this.config.indexName,
      urlSync: true
    });
    this.initSearchBoxWidget(searchHandle);
    this.initHitsWidget(searchHandle);
    this.initPaginationWidget(searchHandle);
    searchHandle.start();
  },
  initSearchBoxWidget: function(searchHandle){
    var _this = this;
    searchHandle.addWidget(
      instantsearch.widgets.searchBox({
        container: _this.config.searchBoxId,
        placeholder: _this.config.searchBoxPlaceholder,
        autofocus: true,
        poweredBy: false
      })
    );
  },
  initHitsWidget: function(searchHandle){
    var _this = this;
    searchHandle.addWidget(
      instantsearch.widgets.hits({
        container: _this.config.hitsId,
        templates: {
          item: _this.renderSearchItem
        }, 
        hitsPerPage: 10
      })
    );
  },
  initPaginationWidget: function(searchHandle){
    var _this = this;
    searchHandle.addWidget(
      instantsearch.widgets.pagination({
        container: _this.config.paginationId
      })
    );
  },
  renderSearchItem: function(data){
    return <SearchItem 
      imageUrl = {data.image}
      name = {data._highlightResult.name.value}
      price = {data.price}
      description = {data.description}
      deeplink = {data.url}
      />;
  },
  render: function() {
    return (
      <div>
        <div id="search-box-container">
          <input type="text" id="search-box"/>
        </div>
        <div id="hits-container"></div>
        <div id="pagination-container"></div>
      </div>
    );
  }
});