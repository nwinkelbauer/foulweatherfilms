import {Link} from 'react-router-dom';
import DataStore from 'flux/stores/DataStore.js';
import SubLinks from './SubLinks.js'

function isEmpty(myObject) {
    for(var key in myObject) {
        if (myObject.hasOwnProperty(key)) {
            return false;
        }
    }
    return true;
}

class Header extends React.Component {   

    render() {
        let headerMenu = DataStore.getMenuBySlug('menu');
        headerMenu = _.sortBy(headerMenu, [function(page) { return page.menu_order; }]);

        return (
            <div id="header" className="header">
                <ul>
                <li><Link to="/" style={{marginRight: '10px'}} >Home</Link></li>

                {headerMenu.map((page) => {
                    if(page.slug != 'home' && page.slug){
                       return(
                            <li key={`nav-page-id-${page.id}`}><Link 
                                key={`nav-page-id-${page.id}`} 
                                to={`/${page.slug}`}
                                style={{marginRight: '10px'}}
                            >
                                {page.title}
                            </Link>
                            { !isEmpty(page.children) && <SubLinks items={page.children}/> }
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