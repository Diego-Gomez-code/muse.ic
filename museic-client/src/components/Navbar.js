import React, { Component , Fragment} from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import MyButton from "../util/MyButton";
import Notifications from './Notifications';
//MUI stuff
import { fade } from '@material-ui/core/styles';
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import AlbumIcon from '@material-ui/icons/Album';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

import { logoutUser } from "../redux/actions/userActions";
import { getUsuarios } from "../redux/actions/dataActions";

const styles = ({
    search: {
        position: 'relative',
        borderRadius: 3,
        backgroundColor: fade("#FFFFFF", 0.15),
        "&:hover": {
            borderRadius: 3,
            backgroundColor: fade("#FFFFFF", 0.25)
        },
        width: '100%'
    },
    searchIcon: {
        padding: '0px 16px',
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: "#FFFFFF",
        backgroundColor: 'inherit',
        borderRadius: 3,
        padding: '4px 4px 4px 0',
        paddingLeft: '46px',
        width: '100%',
    },
    inputInput: {
        
        // vertical padding + font size from searchIcon
        
        //transition: theme.transitions.create('width'),
        
        //[theme.breakpoints.up('md')]: {
        //  width: '20ch',
        //},
    },
});

class Navbar extends Component {
    state = {
        buscar: '',
    }
    componentDidMount() {
        this.props.getUsuarios();
    };
    handleLogout = () => {
        this.props.logoutUser();
    };
    handleChange = (event) => {
        this.setState({
            buscar: event.target.value,
        });
        console.log(this.state.buscar);
    };
    handleCloseMenu = () => {
        this.setState({ anchorEl: null });
    };
    handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            window.location.href = `/buscar/${this.state.buscar}`;
            this.setState({ anchorEl: event.target });
        }
    };
    render() {
        const { authenticated, classes } = this.props;
        
        return (
          
            <AppBar>
              { authenticated && (
                <Toolbar className="nav-container">
                    { authenticated ? (
                        <Fragment>
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon />
                                </div>
                                <InputBase
                                    value={this.state.buscar}
                                    onChange={this.handleChange}
                                    placeholder="Buscar..."
                                    className={classes.inputRoot}
                                    onKeyPress={this.handleKeyPress}
                                    inputProps={{ 'aria-label': 'search' }}
                                />   
                                

                            </div>
                            
                            <Link to="/home">
                                <MyButton tip="Home">
                                    <AlbumIcon style={{fill: "white"}}/>
                                </MyButton>
                            </Link>
                            <Notifications />
                            <Link to={`/usuarios/${this.props.user.credentials.username}`}>
                                <MyButton tip="Perfil">
                                    <PersonIcon style={{fill: "white"}}/>
                                </MyButton>
                            </Link>
                            <Link to ="/">
                            <MyButton tip="Logout" onClick={this.handleLogout}>
                                <ExitToAppIcon style={{fill: "white"}} />
                            </MyButton>
                            </Link>
                            
                            
                            
                        </Fragment>
                    ):(
                        <Fragment>
                            <Button color="inherit" component={Link} to="/intro">Intro</Button>
                            <Button color="inherit" component={Link} to="/login">Login</Button>
                            <Button color="inherit" component={Link} to="/signup">Singup</Button>
                            <Button color="inherit" component={Link} to="/artistlogin">Artist login</Button>
                        </Fragment>
                    )}
                    </Toolbar>
                    )}
            </AppBar>
          
            
        );
    }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    authenticated: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    getUsuarios: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    authenticated: state.user.authenticated,
    user: state.user,
    data: state.data,
})
const mapActionsToProps = { logoutUser, getUsuarios };


export default connect(mapStateToProps,mapActionsToProps )(withStyles(styles)(Navbar));
