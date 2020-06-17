import _ from 'underscore';

import gettext from 'gettext';

import BaseCollection from  'teams/js/collections/base'
import TopicModel from 'teams/js/models/topic'

const TopicCollection = BaseCollection.extend({
    model: TopicModel,

    state: {
        sortKey: 'name'
    },

    queryParams: {
        course_id: function() { return this.course_id; },
        text_search: function() { return this.searchString || ''; }
    },

    constructor: function(topics, options) {
        if (topics.sort_order) {
            this.state.sortKey = topics.sort_order;
        }

        options.perPage = topics.results.length; // eslint-disable-line no-param-reassign
        BaseCollection.prototype.constructor.call(this, topics, options);

        this.registerSortableField('name', gettext('name'));
        // Translators: This refers to the number of teams (a count of how many teams there are)
        this.registerSortableField('team_count', gettext('team count'));
    },

    onUpdate: function(event) {
        if (_.contains(['create', 'delete'], event.action)) {
            this.isStale = true;
        }
    }
});

export default TopicCollection;
