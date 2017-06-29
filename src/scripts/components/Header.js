import {Link} from 'react-router-dom';
import DataStore from 'flux/stores/DataStore.js'

class Header extends React.Component {   
   
    render() {
        //let allPages = DataStore.getAllPages();
        //allPages = _.sortBy(allPages, [function(page) { return page.menu_order; }]); // Sort pages by order
        let headerMenu = DataStore.getMenuBySlug('menu');
        headerMenu = _.sortBy(headerMenu, [function(page) { return page.menu_order; }]);
        console.log(headerMenu)

        return (
            <div className="header">
                <Link to="/" style={{marginRight: '10px'}} >Home</Link>

                {headerMenu.map((page) => {
                    if(page.slug != 'home'){
                       return(
                            <Link 
                                key={`nav-page-id-${page.id}`} 
                                to={`/${page.slug}`}
                                style={{marginRight: '10px'}}
                            >
                                {page.title}
                            </Link>
                        )                     
                   }
                })}
            </div>
        );
    }
}

export default Header;