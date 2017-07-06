import DataStore from 'flux/stores/DataStore.js';

class Portfolio extends React.Component {
    render() {
    	 let page = DataStore.getPageBySlug(this.props.location.pathname.replace('/',''));
         let posts = DataStore.getAllPosts();

         console.log(posts)
        // return (
        //   <div>
        // 	<div id="homepage">
        //     {homeMenu.map((page, i) => {
        //     	if(page.slug){
	       //      	var section = DataStore.getPageBySlug(page.slug);
	       //      	//console.log(section);

	       //         return(
	       //              <Slide items={section} />
	       //          )  
	       //      }                   
        //     })}
        //     </div>
        //   </div>
        // );
        return (
            <div>
                <h2>portfolio</h2>
            </div>
        );

    }
}

export default Portfolio;