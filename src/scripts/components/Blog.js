import DataStore from 'flux/stores/DataStore.js';
// import $ from 'jquery';
import {Link} from 'react-router-dom';
import Post from './Post.js';


class Blog extends React.Component {
    render() {
    	 let page = DataStore.getPageBySlug(this.props.location.pathname.replace('/',''));
       let posts = DataStore.getAllPosts();

        return (
          <div id="blog">
            <Link to={`/`} className="back-button"><p>Back to home</p></Link>
            <h2>{page.title.rendered}</h2>
            <div className="container">
            {posts.map((post, i) => {
              return(
                 <Post items={post} key={post.slug}/>
                  )                  
            })}
            </div>
          </div>
        );
    }
}

export default Blog;