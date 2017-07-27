import DataStore from 'flux/stores/DataStore.js';

class AboutSide extends React.Component {
    render() {
    	let page = DataStore.getPageBySlug('about');
    	//let posts = DataStore.getAllPosts();
        let address = {__html: (page.page_customs['contact-address1'] && page.page_customs['contact-address2']) ? `${page.page_customs['contact-address1'][0]}</br>${page.page_customs['contact-address2'][0]}` : page.page_customs['contact-address1'][0]};

        return (
            <div id="about">
            	<div className="about-section container">
                	<h2>{page.title.rendered}</h2>
                	<div dangerouslySetInnerHTML={{__html: page.content.rendered}}></div>
                	{page.page_customs['contact-email'] && <p className="contact email"><a href={`mailto:${page.page_customs['contact-email'][0]}`}>{page.page_customs['contact-email'][0]}</a></p>}
                	{page.page_customs['contact-phone'] && <p className="contact phone">{page.page_customs['contact-phone'][0]}</p>}
                    {page.page_customs['contact-vimeo'] && <p className="contact vimeo"><a href={page.page_customs['contact-vimeo'][0]}>foulweatherfilms</a></p>}
                    {page.page_customs['contact-address1'] && <p className="contact address" dangerouslySetInnerHTML={address}></p>}
                </div>
            </div>
        );
    }
}

export default AboutSide;