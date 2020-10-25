import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Publicacion from "../components/Publicacion";
import { withStyles } from "@material-ui/core";
import StaticProfile from '../components/StaticProfile';
import CircularProgress from "@material-ui/core/CircularProgress";


import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataActions';

const styles = {
    root: {
        padding: '80px 300px 0px',
    },
    progressSpinner: {
        position: "absolute",
      },
}

class user extends Component {
    state = {
        profile: null
    }
    componentDidMount(){
        const username = this.props.match.params.username;
        const postId = this.props.match.params.postId;
        
        this.props.getUserData(username);
        axios.get(`/usuario/${username}`)
            .then(res => {
                this.setState({
                    profile: res.data.user 
                })
            })
            .catch(err => console.log(err));
    }
    render() {
        const { publicaciones, loading } = this.props.data;
        const publicacionesMarkup = loading ? (
            <p> </p>
        ) : publicaciones === null ? (
            <p>Sin publicaciones</p>
        ) : (
            publicaciones.map((publicacion) => <Publicacion key={publicacion.postId} publicacion={publicacion}/>)
        )
        const { classes } = this.props;
        return (
                <div container className={classes.root}>
                    {this.state.profile === null ?  (
                        <CircularProgress
                        size={60}
                        className={classes.progressSpinner}
                      />
                    ) : (
                        <StaticProfile profile={this.state.profile}/>
                        
                    )}
                    
                    <div>
                        {publicacionesMarkup}
                    </div>
                </div>
        )
    }
}

user.propTypes = {
    classes: PropTypes.object.isRequired,
    getUserData: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = state=> ({
    data: state.data
});


export default connect(mapStateToProps, {getUserData})(withStyles(styles)(user));