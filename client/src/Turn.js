import $ from "jquery";
import q from "turn.js";
import React from 'react';


import * as actions from './actions';
import { connect } from 'react-redux';



class Turn extends React.Component {
    static defaultProps = {
        style: {},
        className: "book",
        options: {},
        pages: [
            "https://raw.github.com/blasten/turn.js/master/demos/magazine/pages/01.jpg",
            "https://raw.github.com/blasten/turn.js/master/demos/magazine/pages/02.jpg",
            "https://raw.github.com/blasten/turn.js/master/demos/magazine/pages/03.jpg",
            "https://raw.github.com/blasten/turn.js/master/demos/magazine/pages/04.jpg",
            "https://raw.github.com/blasten/turn.js/master/demos/magazine/pages/05.jpg",
            "https://raw.github.com/blasten/turn.js/master/demos/magazine/pages/06.jpg"
        ],
        options: {
            width: 800,
            height: 600,
            autoCenter: true,
            display: "double",
            acceleration: true,
            elevation: 50,
            gradients: !$.isTouch,
            when: {
                turned: function(e, page) {
                    //console.log("Current view: ", $(this).turn("view"));
                }
            }
        }

    };





    componentDidMount() {

        

        if (this.el) {
            $(this.el).turn(Object.assign({}, this.props.options));
        }
        document.addEventListener("keydown", this.handleKeyDown, false);
    }

    componentWillUnmount() {
        if (this.el) {
            $(this.el)
                .turn("destroy")
                .remove();
        }
        document.removeEventListener("keydown", this.handleKeyDown, false);
    }

    handleKeyDown = event => {
        if (event.keyCode === 37) {
            $(this.el).turn("previous");
        }
        if (event.keyCode === 39) {
            $(this.el).turn("next");
        }
    };

    render() {

       
        let hardstyle = {width:"400px",height:"800px"};
        let chapnum = this.props.coverinfo.chapnum;
        let title = this.props.coverinfo.title;
        let name = this.props.profile[0].name[0];
 

        return (
            <div className={this.props.className} ref={el => (this.el = el)}>

                 <div className="hard">
                    <div className="noteCover">
                        <div className="cardTitle">{"Your notes for Chapter " + this.props.coverinfo.chapnum}</div>
                        <hr></hr>
                        <div className="cardTitle2">{this.props.coverinfo.title}</div>
                    </div>
                 </div>
                 <div className="hard"></div>
                    {this.props.turnjstext.map((page, index) => (
                        <div key={index} className="page">
                            <div className="turnjsPageNum">{index+1}</div>
                            <hr></hr>
                            <div className="pageText">
                                {page}
                            </div>
                        </div>
                    ))}
                <div className="hard">           
                        <div className="cardTitle">{"Credits to YOU =) " + name}</div>
                </div>
                <div className="hard">
                    <div className="cardTitle">End Cover</div>
                </div>
             


            </div>
        );
    }
}

function mapStateToProps(props) {

    return { thisuser: props.auth }
}


export default connect(mapStateToProps, actions)(Turn);