import DataStore from 'flux/stores/DataStore.js'

class Home extends React.Component {
    render() {
    	let allData = DataStore.getAll();
    	let homeMenu = DataStore.getMenuBySlug('homepage');
        homeMenu = _.sortBy(homeMenu, [function(page) { return page.menu_order; }]);

        return (
            <div>
                <h2>Hello world!</h2>
            </div>
        );
    }
}

export default Home;