import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Recomendacion from "../components/Recomendacion";
import RecomendacionE from "../components/RecomendacionE";
import Evento from "../components/Evento";
import PostPublicacion from '../components/PostPublicacion';
import Profile from '../components/Profile';
import Menu from '../components/menu';
import { connect } from "react-redux";
import { getRecomendaciones, getRecomendacionesE } from "../redux/actions/dataActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import PostEvento from '../components/PostEvento';
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
//import Button from "@material-ui/core/Button";
 // <Menu />
const styles = {
  root: {
    marginTop: "60px",
    marginRight: "10px"
  },
  posts: {
      overflow: 'scroll'
  },
  spinnerDiv: {
    textAlign: 'center',
    marginTop: 200,
    marginBottom: 50
  },
  eventos: {
    //padding: 10
  },
  sineventos: {
    display: "flex",
    flexDirection: "column",
    text: "center"
  }
};
function a11yProps(index) {
  return {
    id: `wrapped-tab-${index}`,
    "aria-controls": `wrapped-tabpanel-${index}`,
  };
}
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

class recomendacionesPage extends Component {
  state = {
    value: 0,
    buscar: ''
  };
  componentDidMount() {
    this.props.getRecomendaciones(this.props.user.credentials.username);
    this.props.getRecomendacionesE(this.props.user.credentials.username);
  }
  handleChange = (value) => {
    this.setState({
      value,
    });
    console.log(this.state.value);
  };
  render() {
    const { 
      user: {
        credentials: {
          username,
          artista,
        },
          loading,
          authenticated,
          seguidos
      }
     // 
       
    } = this.props;
    const {recomendaciones, recomendacionese}= this.props.data;
    const { classes } = this.props;

    let recentRecomendaciones = !loading ? (
      recomendaciones.length > 0 ? (
        recomendaciones.map((recomendacion) => (
          <Recomendacion key={recomendacion.postId} recomendacion={recomendacion} />
        ))
      ) : (
        <Typography variant="h6" color="textPrimary">
          {"Hoy no tienes recomendaciones"}
        </Typography>
      )
    ) : (
      null
    );
    let recentRecomendacionesE = !loading ? (
      recomendacionese.length > 0 ? (
        recomendacionese.map((recomendacion) => (
          <RecomendacionE key={recomendacion.postId} recomendacion={recomendacion} />
        ))
      ) : (
        <Typography variant="h6" color="textPrimary">
          {"Hoy no tienes recomendaciones"}
        </Typography>
      )
    ) : (
      null
    );

    let homes = ! loading ?(
      authenticated ?(
        
          <Grid container className={classes.root} spacing={3}>
          <Grid item sm={3}>
          <div >
            <Profile />
            <Menu/>
            <PostPublicacion />
            {artista ? (
              <PostEvento />
            ) : null}
          </div>      
          </Grid>
          <Grid item sm={9} >
          <AppBar position="static" color="white">
                <Tabs
                  value={this.state.value}
                  onChange={(e, v) => {
                    this.handleChange(v);
                  }}
                  aria-label="wrapped label tabs example"
                  indicatorColor="primary"
                  textColor="primary"
                  centered
                >
                  <Tab label="Publicaciones" {...a11yProps(0)} />
                  <Tab label="Eventos" {...a11yProps(1)} />
                  <Tab label="Usuarios" {...a11yProps(2)} />
                  <Tab label="Artistas" {...a11yProps(3)} />
                </Tabs>
              </AppBar>
              <div id="paneles" >
              <TabPanel value={this.state.value} index={0}>
              {recentRecomendaciones}
              </TabPanel>
              <TabPanel value={this.state.value} index={1}>
              {recentRecomendacionesE}
              </TabPanel>
              </div>
          </Grid>
          
          
          
        </Grid>
      ):(
        <p>Loading...</p>
      )
    ):(
      <div className={classes.spinnerDiv}>
                <CircularProgress size={150} thickness={2} />
            </div>
    );

    return homes;
  }
}

const mapStateToProps = (state) => ({
  data: state.data,
  user: state.user,
});

recomendacionesPage.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  getRecomendaciones: PropTypes.func.isRequired,
  getRecomendacionesE: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, { getRecomendaciones,getRecomendacionesE})(
  withStyles(styles)(recomendacionesPage)
);
