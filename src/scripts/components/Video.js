import DataStore from 'flux/stores/DataStore.js';
import Player from '@vimeo/player';
import {Link} from 'react-router-dom';

class Video extends React.Component {
    
    constructor(props) {
        super(props);
        this.vimeoHandler = this.vimeoHandler.bind(this);
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
        let index = catVids.indexOf(page);
        catVids = index < (catVids.length - 1) ? catVids[index+1] : catVids[0];

        return (
          <div id="video">
            <Link to={`/${cat}`} className="back-button"><p>Back to category</p></Link>
            <div className="container">
                <div id="vimeo-player" key={`${this.id}`}></div>
                <div className="video-info">
                    <small>{page.video_customs.client[0]}</small>
                    <h2>{page.title.rendered}</h2>
                    <small>{page.video_customs.date[0]}</small>
                    <div dangerouslySetInnerHTML={{__html: page.content.rendered}}></div>
                </div>
               
            </div>
        </div>
        );
    }

    componentDidMount() {
      this.vimeoHandler();
    }

    componentDidUpdate() {
      this.vimeoHandler();
    }

    vimeoHandler() {
      const player = new Player('vimeo-player', {
            id: this.id,
            width: 640
        });
    }
}

export default Video;