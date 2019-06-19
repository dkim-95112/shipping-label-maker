import React from 'react';
import PropTypes from 'prop-types';
import './app.css';
import Wizard from './core/components/wizard/wizard';
// ShippingInfo: {
//   from: {
//     name: "John Smith", street: "131 Dartmouth St", city: "Boston",
//     state: "MA",
//     zip: "02116"
//   }, to: {
//     name: "Linda Jackson", street: "40 Fulton St", city: "New York", state: "NY",
//     zip: "10038"
//   },
//   weight: 2,
//   shippingOption: 1
// }
const ShippingInfo = {};
const ShippingOption = {
  ground: 1,
  priority: 2
};
const shippingRate = 0.40;

function shippingCost(weight, shippingRate, shippingOption) {
  return weight * shippingRate *
      (shippingOption === ShippingOption.ground ? 1 : 1.5);
}

const WizardAction = {
    prev: 1,
    next: 2,
    end: 3
};
export default class ShippingLabelMaker extends React.Component {
  constructor(props){
    super(props)
    this.state = {
        curStep: 0
    }
    this.handleAction = this.handleAction.bind(this);
  }

    header() {
        return (
            <div>my header</div>
        )
    }

    handleComplete() {
        debugger
    }
    handleAction(){
      debugger
    }
  render() {
    return (
        <div className="App">
          <h1>Shipping Label Maker</h1>
          <div>progress bar - curStep: {this.state.curStep}</div>
            <Wizard
                wizardContext={ShippingInfo}
                header={this.header}
                steps={[Step1, Step2]}
                curStep={this.state.curStep}
                onAction={this.handleAction}
                onComplete={this.handleComplete}>
            </Wizard>
        </div>
    );
  }
}


function Step1(props) {
    return (
        <div onClick={props.onAction}>
            step 1
            <div>
                <button
                    onClick={props.onAction}
                    action={WizardAction.prev}
                >
                    Previous
                </button>
                <button
                    onClick={props.onAction}
                    action={WizardAction.next}
                >
                    Next
            </button>
            </div>
        </div>
    );
}
Step1.propTypes = {
    wizardContext: PropTypes.object.isRequired,
    onAction: PropTypes.func.isRequired
}
function Step2(props){
    return <div>step 2</div>
}
Step2.propTypes = {
    wizardContext: PropTypes.object.isRequired,
    onAction: PropTypes.func.isRequired
}