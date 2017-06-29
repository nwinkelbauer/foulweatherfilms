import DataStore from 'flux/stores/DataStore.js';
import {Link} from 'react-router-dom';

class Home extends React.Component {
    render() {
    	//let allData = DataStore.getAll();
    	let homeMenu = DataStore.getMenuBySlug('homepage');
        homeMenu = _.sortBy(homeMenu, [function(page) { return page.menu_order; }]);

        return (
          <div>
        	<div id="homepage">
            {homeMenu.map((page, i) => {
            	if(page.slug){
	            	var section = DataStore.getPageBySlug(page.slug);
	            	console.log(section);

	               return(
	                    <div id={`parallax-${i}`} className={`parallaxParent ${section.slug}`} key={`page-${section.id}`}>
							<h2>{section.title.rendered}</h2>
							<div style={{backgroundImage: `url(${section.featured_image_url[0]})`}} className="parallaxChild"></div>
						</div>
	                )  
	            }                   
            })}
            </div>
            <div id="side-nav">
            	<ul>
            		{homeMenu.map((page, i) => {
		            	if(page.slug){
			               return(
			                    <li className={`side-nav-item ${page.slug}`} key={`nav-${page.slug}`}>
			                    <Link to={`/${page.slug}`}>{page.title}</Link>
			                    <svg x="0px" y="0px" viewBox="0 0 100 100">
								<circle fill="#FFFFFF" cx="50" cy="50" r="50"/>
								</svg>
	                            </li>
			                )  
			            }                   
		            })}
            	</ul>
            </div>
          </div>
        );
    }
}

export default Home;