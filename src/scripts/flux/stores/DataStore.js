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
            getAll:             this.getAll,
            getAllPages:        this.getAllPages,
            getAllPosts:        this.getAllPosts,
            getAllMenus:        this.getAllMenus,
            getAllVideos:       this.getAllVideos,
            getPageBySlug:      this.getPageBySlug,
            getMenuBySlug:      this.getMenuBySlug,
            getVideoBySlug:     this.getVideoBySlug,
            getVideosByCategory:this.getVideosByCategory
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

    // Returns all Videos
    getAllVideos() { 
        return this.getState().data.videos; 
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

    // Returns a Video by provided slug
    getVideoBySlug(slug){
        const videos = this.getState().data.videos;
        return videos[Object.keys(videos).find((video, i) => {
            return videos[video].slug === slug;
        })] || {};
    }

    // Returns all videos of a category by provided id
    getVideosByCategory(id){
        const videos = this.getState().data.videos;
        let returnVideos = new Array();
        for(var i = 0, len = videos.length; i < len; i++){
            if(videos[i].categories.includes(parseInt(id)))
                returnVideos.push(videos[i]);
        }
        return returnVideos;
    }

}

export default alt.createStore(DataStore, 'DataStore');