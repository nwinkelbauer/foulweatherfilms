import Gradient from './Gradient.js';
import Player from '@vimeo/player';

class Slide extends React.Component {

    constructor(props) {
        super(props);
        this.handleScroll = this.handleScroll.bind(this);
        this.requestTick = this.requestTick.bind(this);
        this.scrollHandler = this.scrollHandler.bind(this);
        this.vars = {ticking: false};
        this.video = false; 
        this.playing = true;
      }

    render() {
    	
    	let section = this.props.items;
        let gradient = '.4';
        if(section.page_customs.gradient && section.page_customs.gradient[0] !== ""){
            gradient = section.page_customs.gradient[0];
        }
        //console.log(gradient)
        // <source src={`https://player.vimeo.com/video/${section.page_customs.video[0]}`} type="video/mp4" />
        return (
	        <div id={`parallax-${section.slug}`} className={`parallaxParent ${section.slug}`} key={`page-${section.id}`}>
				<video autoPlay loop muted playsInline className="media" data-object-fit poster={section.featured_image_url[0]} ref="background_video">
                    { section.video_image_url && <source src={section.video_image_url} type="video/mp4" /> }
                </video>
                <h2>{section.title.rendered}</h2>
				<Gradient items={section.slug} gradient={gradient} />
                {section.slug === 'home' &&
                    <div  className="logo-header"><img src={section.logo_image_url[0]}></img></div>
                  }
			</div>     
        );

    }
    
    componentDidMount() {
        if(this.refs.background_video) {
            this.video = this.refs.background_video;
        }
        window.addEventListener('scroll', this.handleScroll, false);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll(event) {
       this.requestTick();
    }

    requestTick() {
        if(!this.vars.ticking) {
            this.vars.ticking = true;
            requestAnimationFrame(this.scrollHandler);
        }
    }

    scrollHandler() {
        var size = 0,
            windowHeight = window.innerHeight/2,
            elementID = `parallax-${this.props.items.slug}`,
            topPosition = Math.abs(document.getElementById(elementID).getBoundingClientRect().top);

        if(!this.playing && (topPosition < windowHeight) && this.video && this.video.hasChildNodes()){
            this.video.play();
            this.playing = true;
        }
        if(this.playing && (topPosition > windowHeight) && this.video && this.video.hasChildNodes()){
            this.video.pause();
            this.playing = false;
        }
        this.vars.ticking = false;
    }
}


export default Slide;