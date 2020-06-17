import _ from 'underscore';
import Backbone from 'backbone';
import gettext from 'gettext';

import TeamsView from 'teams/js/views/teams';
import HtmlUtils from 'edx-ui-toolkit/js/utils/html-utils';

const MyTeamsView = TeamsView.extend({

    initialize: function(options) {
        this.getTopic = options.getTopic;
        TeamsView.prototype.initialize.call(this, options);
    },

    render: function() {
        var view = this;
        if (this.collection.isStale) {
            this.$el.html('');
        }
        this.collection.refresh()
            .done(function() {
                TeamsView.prototype.render.call(view);
                if (view.collection.length === 0) {
                    HtmlUtils.append(view.$el, gettext('You are not currently a member of any team.'));
                }
            });
        return this;
    },

    getTopic: function(topicId) {
        return this.getTopic(topicId);
    },

    createHeaderView: function() {
        // hide pagination when learner isn't a member of any teams
        if (!this.collection.length) {
            return null;
        } else {
            return TeamsView.prototype.createHeaderView.call(this);
        }
    },

    createFooterView: function() {
        // hide pagination when learner isn't a member of any teams
        if (!this.collection.length) {
            return null;
        } else {
            return TeamsView.prototype.createFooterView.call(this);
        }
    }
});

export default MyTeamsView;
