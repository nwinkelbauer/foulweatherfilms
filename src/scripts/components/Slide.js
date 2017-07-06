import Gradient from './Gradient.js'

class Slide extends React.Component {

    render() {
    	
    	let section = this.props.items;
        //console.log(section)
        return (
	        <div id={`parallax-${section.slug}`} className={`parallaxParent ${section.slug}`} key={`page-${section.id}`}>
				<h2>{section.title.rendered}</h2>
				<div style={{backgroundImage: `url(${section.featured_image_url[0]})`}} className="parallaxChild"></div>
				<Gradient items={section.slug} />
			</div>     
        );

    }
}


export default Slide;