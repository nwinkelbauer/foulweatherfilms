import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';

class Sidelink extends React.Component {
    
    constructor(props) {
	    super(props);
	    this.handleScroll = this.handleScroll.bind(this);
	    this.requestTick = this.requestTick.bind(this);
	    this.scrollHandler = this.scrollHandler.bind(this);
	    this.vars = {ticking: false};
	    this.state = {opacity: '0'};
	  }

    render() {
        return (
	        <li className={`side-nav-item ${this.props.items.slug}`} key={`nav-${this.props.items.slug}`}>
		        <Link to={`/${this.props.items.slug}`} style={this.state}>{this.props.items.title}</Link>
	            <svg x="0px" y="0px" viewBox="0 0 100 100">
					<circle fill="#FFFFFF" cx="50" cy="50" r="50"/>
				</svg> 
			</li>   
        );

    }

    componentDidMount() {
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

		if(topPosition < windowHeight){
			size = ((.8-(topPosition/windowHeight))*1.25);
			//size = (size > 40) ? 40 : size;
		}
    	this.setState({opacity: `${size}`});
    	this.vars.ticking = false;
	}
}


export default Sidelink;