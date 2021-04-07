import React from 'react';
import { Link } from 'react-router-dom'
class SettingsButton extends React.Component {
  render() {
    return (
      <div>
        <Link to="./settings">
          <button data-testid="btn-settings" type="button">Settings</button>
        </Link>
      </div>
    );
  }
}

export default SettingsButton;
