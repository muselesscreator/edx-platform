import Backbone from 'backbone';
import _ from 'underscore';
import gettext from 'gettext';

import * as viewContents from 'discussion/views/discussion_inline_view';
import DiscussionInlineView from 'discussion/views/discussion_inline_view';

console.log({ viewContents });

/**
 * View that shows the discussion for a team.
 */
const TeamDiscussionView = Backbone.View.extend({
    initialize: function(options) {
        window.$$course_id = this.$el.data('course-id');
        this.readOnly = options.readOnly;
    },

    render: function() {
        var discussionInlineView = new DiscussionInlineView({
            el: this.$el,
            readOnly: this.readOnly,
            startHeader: 3
        });
        discussionInlineView.render();
        return this;
    }
});

export default TeamDiscussionView;
