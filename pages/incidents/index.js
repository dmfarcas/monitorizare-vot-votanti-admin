import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import history from '../../core/history';
import store from '../../redux/reducers';

import Layout from '../../components/Layout';
import Panel from '../../components/Panel';
import Button from '../../components/Button';
import IncidentsTable from '../../components/incidents/IncidentsTable';
import IncidentDetails  from '../../components/incidents/IncidentDetails';
import CountiesFilter from '../../components/CountiesFilter'
import s from './styles.css';

import { fetchCounties } from '../../redux/actions/countiesActions';
import { fetchIncidents } from '../../redux/actions/incidentsActions';
import { getCounties } from '../../redux/reducers/counties';
import { getIncidents } from '../../redux/reducers/incidents';

class IncidentsPage extends React.Component {

  static propTypes = {
    counties: PropTypes.array,
    selectedIncident: PropTypes.object,
    incidents: PropTypes.array,
    selectedCounties: PropTypes.array,
  };

  componentWillMount() {
    if (!this.props.authenticated) {
      history.push({ pathname: '/login' });
      return;
    }

    if (this.props.counties.length === 0) {
      store.dispatch(fetchCounties());
    }

    store.dispatch(fetchIncidents());
  }

  refresh() {
     store.dispatch(fetchIncidents());
  }


  render() {
    const incidents     = this.props.incidents;

    return (
      <Layout className={s.content + " " + "incidents-layout"}>
        <Panel>
          <h3 className={s.title}>Lista Sesizari</h3> 
          <div className = "row">
              <div className = "col two-thirds">
                <Button id = "refresh-button" 
                onClick={() => this.refresh()}
                type="raised" colored = {true}>Refresh</Button>   
              </div>
              <div className = "col one-third"></div>
          </div>
          <div className = "row">
              <div className = "col two-thirds mobile-full-width">
                <IncidentsTable /> 
              </div>
              <div className = "col one-third mobile-full-width">
                <IncidentDetails />
              </div>
          </div>
                 
        </Panel>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  counties: getCounties(state.counties),
  authenticated: state.auth.authenticated,
  incidents: getIncidents(state.incidents),
  countiesError: state.counties.error,
  incidentsError: state.incidents.error,
});

export default connect(
  mapStateToProps
)(IncidentsPage);
