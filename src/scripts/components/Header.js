import {Link} from 'react-router-dom';
import $ from 'jquery';
import DataStore from 'flux/stores/DataStore.js';
import SubLinks from './SubLinks.js'
import AboutSide from './AboutSide.js';

function isEmpty(myObject) {
    for(var key in myObject) {
        if (myObject.hasOwnProperty(key)) {
            return false;
        }
    }
    return true;
}

class Header extends React.Component {   

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.vars = {ticking: false}; 
        this.state = {  visibility : 'hidden' };
      }

    render() {
        let headerMenu = DataStore.getMenuBySlug('menu');
        headerMenu = _.sortBy(headerMenu, [function(page) { return page.menu_order; }]);
        let home = DataStore.getPageBySlug('home');
        let logo = home.logo_image_url[0];

        return (
            <div id="header" className="header">
                <img src={logo} height='40px' ref="logo_header" style={{ visibility: `${this.state.visibility}`}}/>
                <ul>
                <li><Link to="/" style={{marginRight: '10px'}} >Home</Link></li>

                {headerMenu.map((page) => {
                    if(page.slug != 'home' && page.slug){
                        let classer1 = (!Array.isArray(page.children)) ? 'page-port ' : '';
                        let classer2 = (page.slug === "portfolio" || page.slug === "about") ? 'deactivate ' + page.slug : '';
                        let slug = page.slug 
                       return(
                            <li key={`nav-page-id-${page.id}`} className={classer1}><Link 
                                key={`nav-page-id-${page.id}`} 
                                to={`/${page.slug}`}
                                style={{marginRight: '10px'}}
                                className={classer2}
                            >
                                {page.title}
                            </Link>
                            { !isEmpty(page.children) && <SubLinks items={page.children}/> }
                            </li>
                        )                     
                   }
                })}
                </ul>
                <AboutSide />
            </div>
        );
    }

    componentDidMount() {
        let comp = document.getElementsByClassName('deactivate');
        for (var i = 0; i < comp.length; i++) {
            comp[i].addEventListener('click', this.handleClick, false);
        }
        
       // window.addEventListener('scroll', this.handleScroll, false);
    }

    componentWillUnmount() {
        let comp = document.getElementsByClassName('deactivate');
        for (var i = 0; i < comp.length; i++) {
            comp[i].removeEventListener('click', this.handleClick);
        }
        
        //window.removeEventListener('scroll', this.handleScroll);
    }

    handleClick(event) {
        event.preventDefault();
        event.stopPropagation();
        if(event.target.classList.contains("about")){
            $("#about").toggleClass("active");
            $(event.target).toggleClass("active");
        }
    }

}

export default Header;