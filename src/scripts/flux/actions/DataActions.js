import axios from 'axios';
import alt   from 'flux/alt/alt.js';

class DataActions {

    constructor() {
        const appUrl = 'http://wordpress-foul.dev'; // Work Wordpress installation url
        //const appUrl = 'http://fwf.dev/index.php/'; //home laptop install

        this.pagesEndPoint = `${appUrl}/wp-json/wp/v2/pages`; // Endpoint for getting Wordpress Pages
        this.postsEndPoint = `${appUrl}/wp-json/wp/v2/posts`; // Endpoint for getting Wordpress Posts
        this.menusEndPoint = `${appUrl}/json-menus/`; // Endpoint for getting Wordpress Menus
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
            this.getPosts(pages, response.menus, cb)
        });
        return true;
    }

    // Method for getting Posts data
    getPosts(pages, menus, cb){
        this.api(this.postsEndPoint).then((response)=>{
            const posts     = response
            const payload   = { pages, menus, posts };

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