
class Post extends React.Component {
    constructor(props) {
        super(props);
        this.timeLapsed = this.timeLapsed.bind(this);
        // this.handleClick = this.handleClick.bind(this);
        // this.post = this.props.items;
        // this.state = {  __html: this.post.excerpt.rendered };
        // this.expanded = false;
        // this.expandState = "more";
      }

    render() {
        // return (
        //     <div className="blog-post" ref="post_read_more">
        //         { this.post.featured_image_url[0] && 
        //             <div className="image-container"><div className="image" style={{backgroundImage: `url(${this.post.featured_image_url[0]})`}}></div></div>
        //         }
        //         <div className="content-container">
        //         <div className="content">
        //             <h3>{this.post.title.rendered}</h3>
        //             <div dangerouslySetInnerHTML={this.state} ref="excerptToContent"></div>
        //             <a className="read-more" href={`/about/${this.post.slug}`} ref="read_more">Read {this.expandState}</a>
        //         </div></div>
        //     </div>
        // );
        let post = this.props.items;
        let date = new Date(post.date);
        date = this.timeLapsed(date);
        return (
            <div className="post">
                <h3 className="title">{post.title.rendered}</h3>
                <small className="small">{`Posted ${date} ago`}</small>
                <div dangerouslySetInnerHTML={{__html: post.content.rendered}}></div>
            </div>
        );
    }
    //Returns time since given date in string rounding to largest time scale
    timeLapsed(date) {
        let current = new Date();
        let time = current.getTime() - date.getTime(); //in milliseconds
        let desc = "";
        time = time/60000; //minutes
        if(time < 60){ //less than an hour
            desc = (time.toFixed() == 1) ? " minute" : " minutes";
            return "" + time.toFixed().toString() + desc;
        } 
        time = time/60; //hours
         if(time < 24){ //less than an day
            desc = (time.toFixed() == 1) ? " hour" : " hours";
            return "" + time.toFixed().toString() + desc;
        }
        time = time/24; //days
         if(time < 7){ //less than a week
            desc = (time.toFixed() == 1) ? " day" : " days";
            return "" + time.toFixed().toString() + desc;
        }  
        let weeks = time/7; //weeks
         if(weeks < 5){//less than a month
            desc = (weeks.toFixed() == 1) ? " week" : " weeks";
            return "" + weeks.toFixed().toString() + desc;
        }
        time = time/30; //months
         if(time < 12){ //less than an year
            desc = (time.toFixed() == 1) ? " month" : " months";
            return "" + time.toFixed().toString() + desc;
        }
        time = time/12; //years
        desc = (time.toFixed() == 1) ? " year" : " years";
        return "" + time.toFixed().toString() + desc;   
    }

    // componentDidMount() {
    //     //this.refs.read_more.addEventListener('click', this.handleClick, false);
    // }

    // componentWillUnmount() {
    //     //this.refs.read_more.removeEventListener('click', this.handleClick);
    // }

    // handleClick(event) {
    //     event.preventDefault();
    //     event.stopPropagation();
    //     if(this.expanded){
    //         this.expandState="more";
    //         this.setState({__html: this.post.excerpt.rendered});
    //         this.expanded = false;
    //     } else {
    //         this.expandState="less";
    //         this.setState({__html: this.post.content.rendered});
    //         this.expanded = true;
    //     }
    // }
}

export default Post;