import DataStore from 'flux/stores/DataStore.js'

class Home extends React.Component {
    render() {
    	let allData = DataStore.getAll();
    	
        return (
            <div>
                <h2>Hello world!</h2>
            </div>
        );
    }
}

export default Home;