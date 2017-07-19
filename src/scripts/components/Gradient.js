import ReactDOM from 'react-dom';

class Gradient extends React.Component {
    
    constructor(props) {
	    super(props);
	    this.handleScroll = this.handleScroll.bind(this);
	    this.requestTick = this.requestTick.bind(this);
	    this.scrollHandler = this.scrollHandler.bind(this);
	    this.vars = {ticking: false};
	    //var backgroundColor = 
	    this.state = {background: `rgba(0, 0, 0, ${props.gradient})`};
	  }

    render() {
        return (
	        <div className="gradient-container" style={this.state} key={`gradient-${this.props.items}`}></div>    
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
		
		var shade = this.props.gradient,
			windowHeight = window.innerHeight,
			topPosition = Math.abs(ReactDOM.findDOMNode(this).getBoundingClientRect().top);

		if(topPosition < windowHeight && this.props.items !== 'home'){
			shade = (topPosition/windowHeight);
		} 
		var backgroundColor = `rgba(0, 0, 0, ${shade})`;
    	this.setState({background: backgroundColor});

    	this.vars.ticking = false;
	}
}


export default Gradient;