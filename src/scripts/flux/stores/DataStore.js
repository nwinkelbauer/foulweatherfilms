import alt          from 'flux/alt/alt.js';
import DataActions  from 'flux/actions/DataActions.js';

class DataStore {
    constructor() {
        this.data = {};

        this.bindListeners({
            // Listen to the getSuccess() in DataActions.js
            handleSuccess: DataActions.GET_SUCCESS
        });

        this.exportPublicMethods({
            getAll:         this.getAll,
            getAllPages:    this.getAllPages,
            getAllPosts:    this.getAllPosts,
            getAllMenus:    this.getAllMenus,
            getPageBySlug:  this.getPageBySlug,
            getMenuBySlug:  this.getMenuBySlug
        });
    }

    // Store data returned by getSuccess() in DataActions.js
    handleSuccess(data) {
        this.setState({ data });
    }

    // Returns all pages and posts
    getAll() { 
        return this.getState().data; 
    }

    // Returns all Pages
    getAllPages() { 
        return this.getState().data.pages; 
    }

    // Returns all Posts
    getAllPosts() { 
        return this.getState().data.posts; 
    }

    // Returns all Menus
    getAllMenus() { 
        return this.getState().data.menus; 
    }

    // Returns a Page by provided slug
    getPageBySlug(slug){
        const pages = this.getState().data.pages;
        return pages[Object.keys(pages).find((page, i) => {
            return pages[page].slug === slug;
        })] || {};
    }

    // Returns a Menu by provided slug
    getMenuBySlug(slug){
        const menus = this.getState().data.menus;
        return menus[Object.keys(menus).find((menu, i) => {
            return menus[menu].slug === slug;
        })] || {};
    }

}

export default alt.createStore(DataStore, 'DataStore');