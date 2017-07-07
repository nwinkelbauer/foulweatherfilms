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
        let home = DataStore.getPageBySlug('home');
        let logo = home.logo_image_url[0];

        return (
            <div id="header" className="header">
                <img src={logo} height='40px' />
                <ul>
                <li><Link to="/" style={{marginRight: '10px'}} >Home</Link></li>

                {headerMenu.map((page) => {
                    if(page.slug != 'home' && page.slug){
                        let classer = (page.slug === 'portfolio') ? 'page-port' : '';
                       return(
                            <li key={`nav-page-id-${page.id}`} className={classer}><Link 
                                key={`nav-page-id-${page.id}`} 
                                to={`/${page.slug}`}
                                style={{marginRight: '10px'}}
                                className={classer}
                                id={classer}
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

    componentDidMount() {
        document.getElementById('page-port').addEventListener('click', this.handleClick, false);
    }

    componentWillUnmount() {
        document.getElementById('page-port').removeEventListener('click', this.handleClick);
    }

    handleClick(event) {
        event.preventDefault();
        event.stopPropagation();
        //console.log(this);
    }
}

export default Header;