import {render}             from 'react-dom';
import DataActions          from 'flux/actions/DataActions.js';
import $ from 'jquery';

import Home                 from 'components/Home.js';
import About                from 'components/About.js';
import Header               from 'components/Header.js';
import Portfolio            from 'components/Portfolio.js';
import Video                from 'components/Video.js';
//import SubLink              from 'components/SubLink.js';

import Style                from '../less/style.less';

import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch
} from 'react-router-dom';


class AppInitializer {

    templates = {
        'templates/page_about.php': About,
        'templates/page_portfolio.php': Portfolio,
        'templates/page_home.php': Home,
        'page_video': Video
    }

    ObjToArray(obj){
        var array = $.map(obj, function(value, index) {
            return [value];
        });
        return array;
    }

    buildRoutes(data){
        return data.pages.map((page, i) => {
            return(
                <Route
                    key={i}
                    component={this.templates[page.template]}
                    path={`/${page.slug}`}
                    exact
                /> 
            )
        })     
    }

    buildVideoRoutes(data){
        return data.videos.map((page, i) => {
            let categories = this.ObjToArray(page.category_slugs);
            return categories.map((category, i) => {
                return(
                    <Route
                        key={i}
                        component={ Video }
                        path={`/${category}/${page.slug}`}
                        test={`${page.slug}`}
                        exact
                    /> 
                )
            })
        })     
    }

    run() {
        DataActions.getPages((response)=>{
            render(
                <Router>
                    <div>
                        <Header />
                        <Switch>
                            <Route key="home" path="/" component={ Home } exact />
                            {this.buildRoutes(response)}
                            {this.buildVideoRoutes(response)}
                            <Route key="render" render={() => { return <Redirect to="/" /> }} />
                        </Switch> 
                    </div>
                </Router>

                , document.getElementById('app')
            );
        });
    }
}

new AppInitializer().run();