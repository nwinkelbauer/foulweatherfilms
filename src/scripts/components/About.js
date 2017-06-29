import DataStore from 'flux/stores/DataStore.js'

class About extends React.Component {
    render() {
    	let page = DataStore.getPageBySlug('about');

        return (
            <div>
                <h2>About</h2>
            </div>
        );
    }
}

export default About;