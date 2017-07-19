import DataStore from 'flux/stores/DataStore.js';
import $ from 'jquery';
import {Link} from 'react-router-dom';
import Gallery from './Gallery.js';


class Photo extends React.Component {
    

    render() {
    	let page = DataStore.getPageBySlug(this.props.location.pathname.replace('/',''));
        let link = page._links['wp:attachment'][0].href;
        let file = page.content.rendered;
        var el = $( '<div></div>' );
        el.html(file);
        let images = new Array();
        $('img', el).each(function( index, value ) { 
            images.push({src: value.src, srcset: value.srcset.split(",")});
        });
        return (
          <div id="photo">
            <Link to={`/`} className="back-button"><p>Back to home</p></Link>
            <h2>{page.title.rendered}</h2>
            <Gallery images={images} showThumbnails />
          </div>
        );
    }
}

export default Photo;