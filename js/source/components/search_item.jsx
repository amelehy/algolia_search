var SearchItem = React.createClass({
  render: function() {
    return (
      <a className='deeplink' href={this.props.deeplink} target="_blank">
        <div className="search-item-container">
          <img src = {this.props.imageUrl} />
          <div className='item-name margin-top-10' dangerouslySetInnerHTML={{__html: this.props.name}}></div>
          <div className='margin-top-10 description'>{this.props.description}</div>
          <b className='price'>${this.props.price}</b>
        </div>
      </a>
    );
  }
});