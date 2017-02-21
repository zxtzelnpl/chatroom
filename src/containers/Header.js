import {connect} from 'react-redux';
import Header from '../components/Header';


const mapStateToProps = (state) => ({
  number:state.onlines
});

const mapDispatchToProps = (dispatch, ownProps) => ({

});

let _Header = connect(mapStateToProps, mapDispatchToProps)(Header);

export default _Header;
