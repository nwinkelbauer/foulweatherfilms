import DataStore from 'flux/stores/DataStore.js';
import $ from 'jquery';
import {Link} from 'react-router-dom';

function ObjToArray(obj){
    var array = $.map(obj, function(value, index) {
        return [value];
    });
    return array;
}

class Portfolio extends React.Component {
    render() {
    	 let page = DataStore.getPageBySlug(this.props.location.pathname.replace('/',''));
         let videos = DataStore.getVideosByCategory(page.page_customs.category[0]);
         videos = ObjToArray(videos);

         //console.log(page)
         //console.log(videos)
        return (
          <div id="portfolio">
            <Link to={`/`} className="back-button"><p>Back to home</p></Link>
            <h2>{page.title.rendered}</h2>
        	<div className="videos">
            {videos.map((video, i) => {
            	
            if(video.video_customs.url[0]){

               return(
                    <div className="video" key={video.slug}>
                        <Link to={`/${page.slug}/${video.slug}`}>
                        <div style={{backgroundImage: `url(${video.featured_image_url[0]})`}} className="videoThumbnail"></div>
                        <div className="video-info">
                            <div>
                                <small>{video.video_customs.client[0]}</small>
                                <h3>{video.title.rendered}</h3>
                                <small>{video.video_customs.date[0]}</small>
                            </div>
                        </div>
                        </Link>
                    </div>
                )  
            }
	                              
            })}
            </div>
          </div>
        );
    }
}

export default Portfolio;