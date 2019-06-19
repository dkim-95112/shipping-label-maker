import React from 'react';
import PropTypes from 'prop-types';

export default function Wizard(props){
    return (
      <div className={"Wizard"}>
          <h2>{props.header()}</h2>
          This is the wizard
          {props.steps[props.curStep]()}
      </div>
    );
}

Wizard.propTypes = {
    header: PropTypes.func.isRequired,
    steps: PropTypes.array.isRequired,
    wizardContext: PropTypes.object.isRequired,
    onComplete: PropTypes.func.isRequired
};