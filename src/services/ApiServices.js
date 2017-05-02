/* API Services File*/

import Promise from 'bluebird';
import _ from 'lodash';
import $ from 'jquery';
import ApiConstants from '../constants/ApiConstants';

var ApiServices = {
    getEntities: function() {
        var options = {
            type: "GET",
            url: ApiConstants.GET_ENTITIES_URL,
            contentType: "application/json",
            dataType: "json"
        };
        return Promise.resolve(
            $.ajax(options)
        );
    },
    submitEntityValues: function(setValues) {
        var options = {
            type: "POST",
            url: ApiConstants.SET_ENTITIES_URL,
            contentType: "application/json",
            data: JSON.stringify({
                setValues: setValues
            }),
            dataType: "json"
        };
        return Promise.resolve(
            $.ajax(options)
        );
    },
}

module.exports = ApiServices;