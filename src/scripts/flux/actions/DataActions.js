import axios from 'axios';
import alt   from 'flux/alt/alt.js';

class DataActions {

    constructor() {
        //const appUrl = 'http://fwf.dev/index.php'; // Work Wordpress installation url
        const appUrl = 'http://foulweatherfilms.com/cms'; //live

        this.pagesEndPoint = `${appUrl}/wp-json/wp/v2/pages?per_page=99`; // Endpoint for getting Wordpress Pages
        this.postsEndPoint = `${appUrl}/wp-json/wp/v2/posts?per_page=15`; // Endpoint for getting Wordpress Posts
        this.menusEndPoint = `${appUrl}/json-menus/`; // Endpoint for getting Wordpress Menus
        this.videosEndPoint = `${appUrl}/wp-json/wp/v2/videos?per_page=99`; // Endpoint for getting Wordpress Videos
    }

    // Method for getting data from the provided end point url
    api(endPoint) {
        return new Promise((resolve, reject) => {
            axios.get(endPoint).then((response) => {
                resolve(response.data);
            }).catch((error) => {
                reject(error);
            }); 
        });     
    }

    // Method for getting Pages data
    getPages(cb){
        this.api(this.pagesEndPoint).then((response)=>{
            this.getMenus(response, cb)
        });
        return true;
    }

    // Method for getting Menus data
    getMenus(pages, cb){
        this.api(this.menusEndPoint).then((response)=>{
            // const menus     = response.menus
            // const payload   = { pages, menus };

            // this.getSuccess(payload); // Pass returned data to the store
            // cb(payload); // This callback will be used for dynamic rout building

            this.getVideos(pages, response.menus, cb)
        });
        return true;
    }

    // Method for getting Videos data
    getVideos(pages, menus, cb){
        this.api(this.videosEndPoint).then((response)=>{
            this.getPosts(pages, menus, response, cb)
        });
        return true;
    }

    // Method for getting Posts data
    getPosts(pages, menus, videos, cb){
        this.api(this.postsEndPoint).then((response)=>{
            const posts     = response
            const payload   = { pages, menus, videos, posts };

            this.getSuccess(payload); // Pass returned data to the store
            cb(payload); // This callback will be used for dynamic rout building
        });
        return true;
    }



    // This returnes an object with Pages and Posts data together
    // The Alt Store will listen for this method to fire and will store the returned data
    getSuccess(payload){
        return payload;
    }
}

export default alt.createActions(DataActions);