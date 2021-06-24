import React from 'react';
import { Link } from 'react-router-dom';
import { User } from '../types';

import { useConfig } from './ConfigProvider';
import { useGlobalState } from './GlobalStateProvider';

const LoggedOutView = () => {
    return (
      <ul className="nav navbar-nav pull-xs-right">

        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Sign in
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/register" className="nav-link">
            Sign up
          </Link>
        </li>

      </ul>
    );
  };

interface LoggedInViewProps {
  currentUser:  User | null
}

const LoggedInView = React.memo((props: LoggedInViewProps) => {
  if (props.currentUser) {
    return (
      <ul className="nav navbar-nav pull-xs-right">

        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/editor" className="nav-link">
            <i className="ion-compose"></i>&nbsp;New Post
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/settings" className="nav-link">
            <i className="ion-gear-a"></i>&nbsp;Settings
          </Link>
        </li>

        <li className="nav-item">
          <Link
            to={`/@${props.currentUser.username}`}
            className="nav-link">
            <img src={props.currentUser.image || 'https://static.productionready.io/images/smiley-cyrus.jpg'} className="user-pic" alt={props.currentUser.username} />
            {props.currentUser.username}
          </Link>
        </li>

      </ul>
    );
  }

  return null;
});

export type PureHeaderProps = LoggedInViewProps & { appName: string }

export const PureHeader = (props: PureHeaderProps) => {
  return (
    <nav className="navbar navbar-light">
      <div className="container">

        <Link to="/" className="navbar-brand">
          {props.appName.toLowerCase()}
        </Link>

        {
          props.currentUser ? (
            <LoggedInView currentUser={props.currentUser} />
          ) : (
            <LoggedOutView />
          )
        }
      </div>
    </nav>)
}

export const  Header = () => {
  const { currentUser } = useGlobalState();
  const { appName } = useConfig();

  return <PureHeader currentUser={currentUser} appName={appName} />
}