import _ from 'underscore';

import gettext from 'gettext';

import BaseCollection from  'teams/js/collections/base'
import TeamModel from 'teams/js/models/team'

const TeamCollection = BaseCollection.extend({
    model: TeamModel,

    state: {
        sortKey: 'last_activity_at',
        order: null
    },

    queryParams: {
        topic_id: function() {
            return this.options.topic_id;
        },
        expand: 'user',
        course_id: function() {
            return this.options.course_id;
        },
        order_by: function() {
            return this.getSearchString() ? '' : this.state.sortKey;
        },
        text_search: function() {
            return this.getSearchString() || '';
        }
    },

    constructor: function(teams, options) {
        this.state = _.extend({}, TeamCollection.prototype.state, this.state);
        this.queryParams = _.extend({}, TeamCollection.prototype.queryParams, this.queryParams);
        this.topic_id = options.topic_id;
        BaseCollection.prototype.constructor.call(this, teams, options);

        this.registerSortableField('last_activity_at', gettext('last activity'));
        this.registerSortableField('open_slots', gettext('open slots'));
    },

    setFilterField: function(fieldName, value) {
        BaseCollection.prototype.setFilterField.call(this, fieldName, value);

        this.queryParams[fieldName] = function() {
            return value;
        };
    }
});
export default TeamCollection;
