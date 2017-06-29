import $ from 'jquery';
import {Link} from 'react-router-dom';

function ObjToArray(obj){
    	var array = $.map(obj, function(value, index) {
            return [value];
        });
        return array;
    }

class SubLinks extends React.Component {   
   
    render() {
    	let array = ObjToArray( this.props.items );
        return (<ul>
                {array.map((page) => {
                    if(page.slug){
                       return(
                            <li key={`nav-page-id-${page.id}`}><Link 
                                key={`nav-page-id-${page.id}`} 
                                to={`/${page.slug}`}
                                style={{marginRight: '10px'}}
                            >
                                {page.title}
                            </Link>
                            </li>
                        )                     
                   }
                })}
                </ul>
        );
    }

}

export default SubLinks;