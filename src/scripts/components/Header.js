import {Link} from 'react-router-dom';
import DataStore from 'flux/stores/DataStore.js';
import SubLinks from './SubLinks.js'

class Header extends React.Component {   
   
    render() {
        //let allPages = DataStore.getAllPages();
        //allPages = _.sortBy(allPages, [function(page) { return page.menu_order; }]); // Sort pages by order
        let headerMenu = DataStore.getMenuBySlug('menu');
        headerMenu = _.sortBy(headerMenu, [function(page) { return page.menu_order; }]);
        console.log(headerMenu)

        return (
            <div className="header">
                <ul>
                <li><Link to="/" style={{marginRight: '10px'}} >Home</Link></li>

                {headerMenu.map((page) => {
                    if(page.slug != 'home' && page.slug){
                       return(
                            <li><Link 
                                key={`nav-page-id-${page.id}`} 
                                to={`/${page.slug}`}
                                style={{marginRight: '10px'}}
                            >
                                {page.title}
                            </Link>
                            <SubLinks children={page.children} />
                            </li>
                        )                     
                   }
                })}
                </ul>
            </div>
        );
    }
}

export default Header;