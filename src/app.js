import React from 'react';
import PropTypes from 'prop-types';
import './app.css';
import Wizard from './core/components/wizard/wizard';
import 'bootstrap/dist/css/bootstrap.css';


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
    end: 3,
    setToName: 4,
    setToStreet: 5,
    setToCity: 6,
    setToState: 7,
    setToZip: 8,
    setFromName: 10,
    setFromStreet: 11,
    setFromCity: 12,
    setFromState: 13,
    setFromZip: 14,
    setWeight: 20,
    setGround:21,
    setPriority:22,
};
export default class ShippingLabelMaker extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isComplete: false,
            curStep: 0,
            from: {
                name: "John Smith",
                street: "131 Dartmouth St",
                city: "Boston",
                state: "MA",
                zip: "02116"
            }, to: {
                name: "Linda Jackson",
                street: "40 Fulton St",
                city: "New York",
                state: "NY",
                zip: "10038"
            },
            weight: 2,
            shippingOption: {
                ground: 1,
                priority: 2
            }
        }
        this.handleAction = this.handleAction.bind(this);
    }

    header() {
        return (
            <div>my header</div>
        )
    }

    onComplete() {
        this.setState({
            isComplete: true
        })
    }

    handleAction({type, value}) {
        switch (type) {
            case WizardAction.prev:
                this.setState({
                    curStep: Math.max(0, this.state.curStep - 1)
                })
                break;
            case WizardAction.next:
                this.setState({
                    curStep: Math.min(4, this.state.curStep + 1)
                })
                break;
            case WizardAction.setFromName:
                this.setState({
                    from: {
                        name: value
                    }
                })
                break;
            case WizardAction.setFromStreet:
                this.setState({
                    from: {
                        street: value
                    }
                })
                break;
            case WizardAction.setFromCity:
                this.setState({
                    from: {
                        city: value
                    }
                })
                break;
            case WizardAction.setFromState:
                this.setState({
                    from: {
                        state: value
                    }
                })
                break;
            case WizardAction.setFromZip:
                this.setState({
                    from: {
                        zip: value
                    }
                })
                break;
            case WizardAction.setToName:
                this.setState({
                    to: {
                        name: value
                    }
                })
                break;
            case WizardAction.setToStreet:
                this.setState({
                    to: {
                        street: value
                    }
                })
                break;
            case WizardAction.setToCity:
                this.setState({
                    to: {
                        city: value
                    }
                })
                break;
            case WizardAction.setToState:
                this.setState({
                    from: {
                        state: value
                    }
                })
                break;
            case WizardAction.setToZip:
                this.setState({
                    from: {
                        zip: value
                    }
                })
                break;
            case WizardAction.setWeight:
                this.setState({
                    weight: value
                })
                break;
            case WizardAction.setGround:
                this.setState({
                    shippingOption: {
                        ground: value
                    }
                })
                break;
            case WizardAction.setPriority:
                this.setState({
                    shippingOption: {
                        priority: value
                    }
                })
                break;
            case WizardAction.end:
                this.onComplete();
                break;
            default:
                break;
        }
    }

    render() {
        const appStyle = {
            width: '50%',
            border: 'solid 1px #ccc',
            padding: '1em',
            margin: '1em auto',
            boxShadow: '4px 5px 4px rgb(0,0,0,0.3)',
        };
        const progressPct = 100 * (this.state.curStep + 1) / 5;
        let content;
        if (this.state.isComplete) {
            content = (
                <ShippingLabel>
                </ShippingLabel>
            );
        } else {
            content = (
                <div>
                    <h1>Shipping Label Maker</h1>
                    <div className="progress">
                        <div className="progress-bar"
                             style={{width: `${progressPct}%`}}
                             role="progressbar"
                             aria-valuenow={progressPct}
                             aria-valuemin="0"
                             aria-valuemax="100">
                        </div>
                    </div>
                    <Wizard
                        header={this.header}
                        steps={[Step1, Step2, Step3, Step4, Step5]}
                        curStep={this.state.curStep}
                        onAction={this.handleAction}
                        state={this.state}
                    >
                    </Wizard>
                </div>
            );
        }
        return <div className="App" style={appStyle}>
            {content}
        </div>

    }
}

function ShippingLabel(props){
    return (
        <div>shipping label</div>
    )
}

function Step1(props) {
    const state = props.state;
    return (
        <div className={"container"}>
            <h2>Enter the sender's address:</h2>
            <div className="input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text">Name:</span>
                </div>
                <input
                    className="form-control"
                    type="text"
                    value={state.from.name}
                    onChange={(ev) => {
                        ev.preventDefault()
                        props.onAction({
                            type: WizardAction.setFromName,
                            value: ev.target.value
                        })
                    }}
                />
            </div>

            <label>Street:
                <input
                    value={state.from.street}
                    onChange={(ev) => props.onAction({
                        type: WizardAction.setFromStreet,
                        value: ev.target.value
                    })}
                />
            </label>
            <label>City:
                <input
                    value={state.from.city}
                    onChange={(ev) => props.onAction({
                        type: WizardAction.setFromCity,
                        value: ev.target.value
                    })}
                />
            </label>
            <label>State:
                <input
                    value={state.from.state}
                    onChange={(ev) => props.onAction({
                        type: WizardAction.setFromState,
                        value: ev.target.value
                    })}
                />
            </label>
            <label>Zip:
                <input
                    value={state.from.zip}
                    onChange={(ev) => props.onAction({
                        type: WizardAction.setFromZip,
                        value: ev.target.value
                    })}
                />
            </label>
            <div>
                <button
                    onClick={() => props.onAction({
                        type: WizardAction.next
                    })}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

Step1.propTypes = {
    state: PropTypes.object.isRequired,
    onAction: PropTypes.func.isRequired
};

function Step2(props) {
    return (
        <div>
            <h2>Enter the receiver's address:</h2>
            <label>
                Name: <input
                value={props.state.to.name}
                onChange={(ev) => props.onAction({
                    type: WizardAction.setToName,
                    value: ev.target.value
                })}
            />
            </label>
            <label>Street:
                <input
                    value={props.state.to.street}
                    onChange={(ev) => props.onAction({
                        type: WizardAction.setToStreet,
                        value: ev.target.value
                    })}
                />
            </label>
            <label>City:
                <input
                    value={props.state.to.city}
                    onChange={(ev) => props.onAction({
                        type: WizardAction.setToCity,
                        value: ev.target.value
                    })}
                />
            </label>
            <label>State:
                <input
                    value={props.state.to.state}
                    onChange={(ev) => props.onAction({
                        type: WizardAction.setToState,
                        value: ev.target.value
                    })}
                />
            </label>
            <label>Zip:
                <input
                    value={props.state.to.zip}
                    onChange={(ev) => props.onAction({
                        type: WizardAction.setToZip,
                        value: ev.target.value
                    })}
                />
            </label>
            <div>
                <button
                    onClick={() => props.onAction({
                        type: WizardAction.prev
                    })}
                >
                    Previous
                </button>
                <button
                    onClick={() => props.onAction({
                        type: WizardAction.next
                    })}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

Step2.propTypes = {
    state: PropTypes.object.isRequired,
    onAction: PropTypes.func.isRequired
};

function Step3(props) {
    return (
        <div>
            <h2>Enter weight:</h2>
            <label>
                Weight: <input
                value={props.state.weight}
                onChange={(ev) => props.onAction({
                    type: WizardAction.setWeight,
                    value: ev.target.value
                })}/>
            </label>
            <div>
                <button
                    onClick={() => props.onAction({
                        type: WizardAction.prev
                    })}
                >
                    Previous
                </button>
                <button
                    onClick={() => props.onAction({
                        type: WizardAction.next
                    })}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

function Step4(props) {
    return (
        <div>
            <h2>Get Shipping Option:</h2>
            <label>
                Ground: <input
                value={props.state.shippingOption.ground}
                onChange={(ev) => props.onAction({
                    type: WizardAction.setGround,
                    value: ev.target.value
                })}/>
            </label>
            <label>
                Priority: <input
                value={props.state.shippingOption.priority}
                onChange={(ev) => props.onAction({
                    type: WizardAction.setPriority,
                    value: ev.target.value
                })}/>
            </label>
            <div>
                <button
                    onClick={() => props.onAction({
                        type: WizardAction.prev
                    })}
                >
                    Previous
                </button>
                <button
                    onClick={() => props.onAction({
                        type: WizardAction.next
                    })}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

function Step5(props) {
    console.log(props.state);
    return (
        <div>
            <h2>Complete:</h2>
            {props.state.from.name}
            <label>
                Ground:
            </label>
            <label>
                Priority:
            </label>
            <div>
                <button
                    onClick={() => props.onAction({
                        type: WizardAction.prev
                    })}
                >
                    Previous
                </button>
                <button
                    onClick={() => props.onAction({
                        type: WizardAction.end
                    })}
                >
                    Complete
                </button>
            </div>
        </div>
    );
}