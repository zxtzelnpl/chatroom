import React from 'react';

//let renderI=0;

let images = [
  {
    src: '/images/video/carousel1.jpg'
    , alt: 'carousel1'
  }
  , {
    src: '/images/video/carousel2.jpg'
    , alt: 'carousel2'
  }
  , {
    src: '/images/video/carousel3.jpg'
    , alt: 'carousel3'
  }
];

class Banner extends React.Component {
  constructor(props) {
    super(props);
    this._imgs = [];
    this.moveX=0;
    this.animate=0;
    this.state = {
      carouselWrap: {
        width: '100%'
        , transform: 'translateX('+this.moveX+'px)'
      }
    };
  }

  move() {
    let num = this._imgs.length;
    //console.log(num);
    let width = this._imgs[0].clientWidth;
    //console.log(width);
    this.moveX++;
    if(this.moveX>=num){
      this.moveX=0;
    }
    this.setState({
      carouselWrap:{
        width: num + '00%'
        ,transform:'translateX(-'+this.moveX*width+'px)'
      }
    });
    setTimeout(()=>{this.move.call(this)},2000)
  }

  componentDidMount() {
    let num = this._imgs.length;

    this.setState({
      carouselWrap: {
        width: num + '00%'
      }
    });

    setTimeout(()=>{this.move.call(this)},2000)
  }

  componentDidUpdate(){
    //console.log(this._imgs)
  }

  render() {
    //console.log(++renderI);

    let Pics = [];
    images.forEach((value, index) => {
      //console.log('index...'+index);
      Pics.push(
        <div
          className="carouselBox"
          key={index}
        >
          <img
            src={value.src}
            alt={value.alt}
            ref={(img) => {
              //console.warn(renderI+":"+value.alt);//打印出来
              this._imgs[index]=img;
            }}
          />
        </div>
      )
    });
    //console.log(this._imgs);
    return (
      <div className="Banner">
        <div
          className="carouselWrap"
          style={this.state.carouselWrap}
        >
          {Pics}
        </div>
      </div>
    )
  }
}


export default Banner
