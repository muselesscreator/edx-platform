/**
 * A generic header model.
 */
(function(define) {
    'use strict';
    define(['backbone'], function(Backbone) {
        var HeaderModel = Backbone.Model.extend({
            defaults: {
                title: '',
                description: '',
                breadcrumbs: null,
                nav_aria_label: ''
            }
        });

        return HeaderModel;
    });
}).call(
    this,
    // Use the default 'define' function if available, else use 'RequireJS.define'
    typeof define === 'function' && define.amd ? define : RequireJS.define
);
