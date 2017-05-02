/* Input Component File*/

import React from 'react';
import ReactDOM from 'react-dom';
import ApiServices from './services/ApiServices';

export default class InputForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    //Define Initial States
    state = {
        entities : [],
        errormessage: '',
        entityValues: []
    };

    //Get Entities On Component Mount
    componentDidMount () {
        ApiServices.getEntities().then(function(response) {
            this.setState({
                entities: response
            });
        }.bind(this))
        .catch(function(err) {
        this.setState({errormessage:err});
        }.bind(this));
    }

    //Handle the submit action
    handleSubmit() {
        var setValues = this.state.entityValues.slice();
        console.log("The Captured Values: ", setValues);
        alert("Entries Submitted!");
        ApiServices.submitEntityValues(setValues).then(function(response) {
        }.bind(this))
        .catch(function(err) {
        this.setState({errormessage:err});
        }.bind(this));
    }

    //Handle change of Input Textbox
    handleInputChange(e) {
        var entityName = e.target.id;
        var entityValuesArray = this.state.entityValues.slice();
        var entityPresent = false;
        entityValuesArray.forEach(function(entity) {
            if(entity['entity-name'] == entityName) {
                entityPresent = true;
                entity['text-box-value'] = e.target.value
            }
        });

        if(!entityPresent) {
            var entity = [];
            entity['entity-name'] = entityName;
            entity['text-box-value'] = e.target.value;
            entityValuesArray.push(entity);
        }

        this.setState({
            entityValues: entityValuesArray
        });
    }

    //Handle change of Options
    handleSelectChange(e) {
        var entityName = e.target.id;
        var entityValuesArray = this.state.entityValues.slice();
        var entityPresent = false;
        entityValuesArray.forEach(function(entity) {
            if(entity['entity-name'] == entityName) {
                entityPresent = true;
                entity['drop-down-value'] = e.target.value
            }
        });

        if(!entityPresent) {
            var entity = [];
            entity['entity-name'] = entityName;
            entity['drop-box-value'] = e.target.value;
            entityValuesArray.push(entity);
        }

        this.setState({
            entityValues: entityValuesArray
        });
    }

    render() {

        //Generate components for all entities
        var entities = this.state.entities ? this.state.entities.map(function(entity) {

            var entityName = entity['entity-name'];
            var entityComponents = entity['ui-components'];

            //Generate all ui-components for each entity
            var eachComponent = entityComponents ? entityComponents.map(function(uiComponent) {
                if(uiComponent.type == 'text-box') {
                    var textBoxName = uiComponent.name;
                    return (
                        <div key={textBoxName+'text-box'}>
                            <h5 key={textBoxName+'text-box-header'} style={{display: 'inline-block', paddingRight: '10px'}}>{textBoxName.toUpperCase()}</h5>
                            <input id={entityName} type='text' placeholder={textBoxName+'...'} name={textBoxName+'text-box-input'} onChange = {this.handleInputChange}/>
                        </div>
                    )
                }
                else if(uiComponent.type == 'drop-down') {
                    var dropDownName = uiComponent.name;

                    //Generate all options for each select
                    var selectOptions = uiComponent.options ? uiComponent.options.map(function(option) {
                        var optionToChoose = option;
                        return(
                            <option value={optionToChoose} key={entityName+'-'+optionToChoose}>{optionToChoose}</option>
                        )
                    }.bind(this)): '';


                    return (
                        <div key={dropDownName+'drop-down'}>
                            <h5 key={dropDownName+'drop-down-header'} style={{display: 'inline-block', paddingRight: '10px'}}>{dropDownName.toUpperCase()}</h5>
                            <select id={entityName} key={dropDownName+'drop-down-select'} onChange = {this.handleSelectChange}>{selectOptions}</select>
                        </div>
                    )
                }
            }.bind(this)): '';

            return (
                <div key={entityName+'entity'}>
                    <h4 key={entityName+'entityTitle'}>{entityName.toUpperCase()}</h4>
                    {eachComponent}
                </div>
            )
        }.bind(this)): '';

        return (
            <div style={{paddingLeft: '20px'}}>
                {entities}
                <button onClick={this.handleSubmit}>Submit</button>
            </div>
        )
    }

}