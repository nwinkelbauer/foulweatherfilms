import SubLink from './SubLink.js';

class SubLinks extends React.Component {   
   
    render() {
        var children = this.props.children;
        var returnProp = [];
        for(var child in children){
            var prop = children[child];
            return(<SubLink child={prop} />)
        }
        return()
    }
}

export default SubLinks;