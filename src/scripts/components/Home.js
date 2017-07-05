import DataStore from 'flux/stores/DataStore.js';
import Slide from './Slide.js';
import Sidelink from './Sidelink.js';

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
	            	//console.log(section);

	               return(
	                    <Slide items={section} />
	                )  
	            }                   
            })}
            </div>
            <div id="side-nav">
            	<ul>
            		{homeMenu.map((page, i) => {
		            	if(page.slug && page.slug != 'home'){
			               return(
			                    <Sidelink items={page} />
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