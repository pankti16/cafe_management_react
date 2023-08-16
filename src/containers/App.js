import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { Router } from "react-router-dom";
import history from "../routes/History";
import Routes from "../routes/Routes";
import { MaterialSnackbar } from "../components/Snackbar/Snackbar";
import Loader from "../components/Loader/Loader";
import "./App.scss";
import { connect } from "react-redux";
import CafeFSLoader from "../components/FSLoader/FSLoader";
import EmpFSLoader from "../components/FSLoader/FSLoader";

class App extends React.Component {
  render() {
    const { loading, showCafeLoader, showEmpLoader } = this.props;
    return (
      <div>
        {loading ? <Loader /> : null}
        <Router history={history}>
          <CafeFSLoader show={showCafeLoader} />
          <EmpFSLoader show={showEmpLoader} />
          <MaterialSnackbar />
          <Navbar />
          {<Routes />}
        </Router>
      </div>
    );
  }
}

const mapStateToProps = ({ loading, cafe, employee }) => ({
  loading,
  showCafeLoader: cafe.showCafeLoader,
  showEmpLoader: employee.showEmpLoader,
});

export default connect(mapStateToProps, {})(App);
