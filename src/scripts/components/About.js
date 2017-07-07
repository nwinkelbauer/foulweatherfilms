import DataStore from 'flux/stores/DataStore.js';
import Post from './Post.js';

class About extends React.Component {
    render() {
    	let page = DataStore.getPageBySlug('about');
    	let posts = DataStore.getAllPosts();

        return (
            <div id="about">
            	<div className="about-section container">
                	<h2>{page.title.rendered}</h2>
                	<div dangerouslySetInnerHTML={{__html: page.content.rendered}}></div>
                	<p className="email">{page.page_customs['contact-email'][0]}</p>
                	<p className="phone">{page.page_customs['contact-phone'][0]}</p>
                </div>
                <div className="blog container">
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

export default About;