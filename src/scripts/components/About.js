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
                	{page.page_customs['contact-email'][0] && <p className="email"><a href={`mailto:${page.page_customs['contact-email'][0]}`}>{page.page_customs['contact-email'][0]}</a></p>}
                	{page.page_customs['contact-phone'][0] && <p className="phone">{page.page_customs['contact-phone'][0]}</p>}
                    {page.page_customs['contact-vimeo'][0] && <p className="vimeo"><a href={page.page_customs['contact-vimeo'][0]}>foulweatherfilms</a></p>}
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