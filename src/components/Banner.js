import React from 'react';

let images = [
  {
    src:'/images/video/carousel1.jpg'
    , alt:'carousel1'
  }
  , {
    src:'/images/video/carousel2.jpg'
    , alt:'carousel2'
  }
  , {
    src:'/images/video/carousel3.jpg'
    , alt:'carousel3'
  }
];

class Banner extends React.Component {
  render() {

    let Pics=[];
    images.forEach(function(value,index){
      Pics.push(<div className="carouselBox" key={index}><img src={value.src} alt={value.alt}/></div>)
    });

    return (
      <div className="Banner">
        <div className="carouselWrap">
          {Pics}
        </div>
      </div>
    )
  }
}

export default Banner
