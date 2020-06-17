import  Backbone from 'backbone';
import _ from 'underscore';
import gettext from 'gettext';
import CardView from 'js/components/card/views/card';
import HtmlUtils from 'edx-ui-toolkit/js/utils/html-utils';
import StringUtils from 'edx-ui-toolkit/js/utils/string-utils';
/**
 * View for a topic card. Displays a Topic.
 */
export const TeamCountDetailView = Backbone.View.extend({
    tagName: 'p',
    className: 'team-count',

    initialize: function() {
        this.render();
    },

    render: function() {
        var team_count = this.model.get('team_count'); // eslint-disable-line camelcase
        HtmlUtils.setHtml(
            this.$el,
            HtmlUtils.HTML(_.escape(StringUtils.interpolate(
                ngettext('{team_count} Team', '{team_count} Teams', team_count),
                {team_count: team_count},
                true
            )))
        );

        return this;
    }
});

export const TopicCardView = CardView.extend({
    initialize: function() {
        this.detailViews = [new TeamCountDetailView({model: this.model})];
        CardView.prototype.initialize.apply(this, arguments);
    },

    actionUrl: function() {
        return '#topics/' + this.model.get('id');
    },

    configuration: 'square_card',
    cardClass: 'topic-card',
    pennant: gettext('Topic'),
    title: function() { return this.model.get('name'); },
    description: function() { return this.model.get('description'); },
    details: function() { return this.detailViews; },
    actionClass: 'action-view',
    actionContent: function() {
        var screenReaderText = _.escape(StringUtils.interpolate(
            gettext('View Teams in the {topic_name} Topic'),
            {topic_name: this.model.get('name')}, true
        ));
        // eslint-disable-next-line max-len
        return '<span class="sr">' + screenReaderText + '</span><span class="icon fa fa-arrow-right" aria-hidden="true"></span>'; // xss-lint: disable=javascript-concat-html
    }
});

export default TopicCardView;
