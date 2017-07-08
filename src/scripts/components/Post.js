

class Post extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.post = this.props.items;
        this.state = {  __html: this.post.excerpt.rendered };
        this.expanded = false;
        this.expandState = "more";
      }

    render() {
        return (
            <div className="blog-post" ref="post_read_more">
                { this.post.featured_image_url[0] && 
                    <div className="image-container"><div className="image" style={{backgroundImage: `url(${this.post.featured_image_url[0]})`}}></div></div>
                }
                <div className="content-container">
                <div className="content">
                    <h3>{this.post.title.rendered}</h3>
                    <div dangerouslySetInnerHTML={this.state} ref="excerptToContent"></div>
                    <a className="read-more" href={`/about/${this.post.slug}`} ref="read_more">Read {this.expandState}</a>
                </div></div>
            </div>
        );
    }
    componentDidMount() {
        this.refs.read_more.addEventListener('click', this.handleClick, false);
    }

    componentWillUnmount() {
        this.refs.read_more.removeEventListener('click', this.handleClick);
    }

    handleClick(event) {
        event.preventDefault();
        event.stopPropagation();
        if(this.expanded){
            this.expandState="more";
            this.setState({__html: this.post.excerpt.rendered});
            this.expanded = false;
        } else {
            this.expandState="less";
            this.setState({__html: this.post.content.rendered});
            this.expanded = true;
        }
    }
}

export default Post;