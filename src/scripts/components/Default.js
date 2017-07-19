import DataStore from 'flux/stores/DataStore.js';
// import $ from 'jquery';
import {Link} from 'react-router-dom';


class Default extends React.Component {
    render() {
    	 let page = DataStore.getPageBySlug(this.props.location.pathname.replace('/',''));
         let content = {__html: page.content.rendered};
        return (
          <div id="default">
            <Link to={`/`} className="back-button"><p>Back to home</p></Link>
            <h2>{page.title.rendered}</h2>
            <div className="container" dangerouslySetInnerHTML={content}></div>
          </div>
        );
    }
}

export default Default;