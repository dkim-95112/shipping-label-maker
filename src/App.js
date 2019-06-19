import React from 'react';
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

const wizardContext = React.createContext({});
export default class ShippingLabelMaker extends React.Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }

  header(){
    return (
        <div>my header</div>
    )
  }

  render() {
    return (
        <div className="App">
          <h1>Shipping Label Maker</h1>
          <div>progress bar</div>
          <wizardContext.Provider value={ShippingInfo}>
            <Wizard header={this.header()} steps={""} >

            </Wizard>
          </wizardContext.Provider>
          <button>Previous</button>
          <button>Next</button>
        </div>
    );
  }
}


