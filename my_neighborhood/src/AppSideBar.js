import React, { Component } from 'react'

class AppSideBar extends Component {
    render() {
        return (
            <div className="component-side-bar">
                <header><i className="fas fa-city"></i>My Nighborhood</header>
                {this.props.markersCategory.map((category) => (
                        <div key={category} className={`${category} category-container`}>

                            <div className="body">
                                <div className="header-text">{category} <button><i className="far fa-eye-slash" data-action="hide" onClick={(e)=>(this.props.markersHider(category, e.target))}></i></button></div>
                                <ul className="markers-list">
                                {
                                    this.props.markers.filter((marker) => (
                                        marker.markerType === category
                                    )).map((marker) => (
                                        <li key={`${category}_${marker.marker.title}`}>{marker.marker.title}</li>
                                    ))
                                }
                                </ul>
                            </div>
                        </div>
                    ))
                }

            </div>
        );
    }
}

export default AppSideBar;
