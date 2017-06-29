import {Link} from 'react-router-dom';

class SubLink extends React.Component {   
   
    render() {
        var child = this.props.child;
        return (
            //<li>
            <Link 
                key={`nav-page-id-${child.id}`} 
                to={`/${child.slug}`}
                style={{marginRight: '10px'}}
            >
                {child.title}
            </Link>
            //</li>
        )                     
    }
}

export default SubLink;