import DataStore from 'flux/stores/DataStore.js';
import Player from '@vimeo/player';
import {Link} from 'react-router-dom';

class Video extends React.Component {
    
    constructor(props) {
        super(props);
        this.id = false;
      }

    render() {
        let slug = this.props.location.pathname.split('/');
        let cat = slug[slug.length-2];
        slug = slug[slug.length-1];
        let page = DataStore.getVideoBySlug(slug);
        this.id = page.video_customs.url[0];
        let image = page.featured_image_url[0] || "";
        let catVids = DataStore.getVideosByCategory(page.categories[0]);
        for(var i = 0; i < catVids.length; i++) {
            if(catVids[i].slug === page.slug){
                catVids.splice(i, 1);
            }
        }
        catVids = catVids[Math.floor(Math.random()*catVids.length)];
        console.log(catVids)

        return (
         //  <div>
        	// <div id="homepage">
         //    {homeMenu.map((page, i) => {
         //    	if(page.slug){
	        //     	var section = DataStore.getPageBySlug(page.slug);
	        //     	//console.log(section);

	        //        return(
	        //             <Slide items={section} />
	        //         )  
	        //     }                   
         //    })}
         //    </div>
         //    <div id="side-nav">
         //    	<ul>
         //    		{homeMenu.map((page, i) => {
		       //      	if(page.slug && page.slug != 'home'){
			      //          return(
			      //               <Sidelink items={page} />
			      //           )  
			      //       }                   
		       //      })}
         //    	</ul>
         //    </div>
         //  </div>
          <div id="video">
            <Link to={`/${cat}`} className="back-button"><p>Back to category</p></Link>
            <div className="container">
                <div id="vimeo-player" style={{backgroundImage: `url(${image})`}}></div>
                <div className="video-info">
                    <small>{page.video_customs.client[0]}</small>
                    <h2>{page.title.rendered}</h2>
                    <small>{page.video_customs.date[0]}</small>
                    <div dangerouslySetInnerHTML={{__html: page.content.rendered}}></div>
                </div>
                <div className="related-video">
                    <h3>Next Video</h3>
                    <Link to={`/${cat}/${catVids.slug}`}>
                        <div className="next-image" style={{backgroundImage: `url(${catVids.featured_image_url[0]})`}}>
                            <h4>{catVids.title.rendered}</h4>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
        );
    }
    componentDidMount() {
        const player = new Player('vimeo-player', {
            id: this.id,
            width: 640
        });
    }
}

export default Video;