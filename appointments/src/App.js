import React, { useCallback } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import { AppointmentFormLoader } from './AppointmentFormLoader';
import { AppointmentsDayViewLoader } from './AppointmentsDayViewLoader';
import { CustomerForm } from './CustomerForm';
import { CustomerSearchRoute } from './CustomerSearchRoute';
import { connect } from 'react-redux';

export const MainScreen = () => (
  <React.Fragment>
    <div className="button-bar">
      <Link to="/addCustomer" className="button">
        Add customer and appointment
      </Link>
      <Link to="/searchCustomers" className="button">
        Search customers
      </Link>
    </div>
    <AppointmentsDayViewLoader />
  </React.Fragment>
);

export const App = ({ history, setCustomerForAppointment }) => {
  const searchActions = customer => (
    <React.Fragment>
      <button
        role="button"
        onClick={() => setCustomerForAppointment(customer)}>
        Create appointment
      </button>
    </React.Fragment>
  );

  return (
    <Switch>
      <Route path="/addCustomer" component={CustomerForm} />
      <Route
        path="/addAppointment"
        render={() => <AppointmentFormLoader />}
      />
      <Route
        path="/searchCustomers"
        render={props => (
          <CustomerSearchRoute
            {...props}
            renderCustomerActions={searchActions}
          />
        )}
      />
      <Route component={MainScreen} />
    </Switch>
  );
};

const mapDispatchToProps = {
  setCustomerForAppointment: customer => ({
    type: 'CUSTOMER_SELECTED',
    customer
  })
};

export const ConnectedApp = connect(
  null,
  mapDispatchToProps
)(App);
