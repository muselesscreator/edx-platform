import _ from 'underscore';
import gettext from 'gettext';
import TopicCardView from 'teams/js/views/topic_card';
import TeamUtils from 'teams/js/views/team_utils';
import PagingHeader from 'components/views/paging_header';
import PaginatedView from 'components/views/paginated_view';

export const TopicsView = PaginatedView.extend({
    type: 'topics',

    srInfo: {
        id: 'heading-browse-topics',
        text: gettext('All topics')
    },

    initialize: function(options) {
        this.options = _.extend({}, options);
        this.itemViewClass = TopicCardView.extend({
            router: options.router,
            srInfo: this.srInfo
        });
        PaginatedView.prototype.initialize.call(this);
    },

    createHeaderView: function() {
        return new PagingHeader({
            collection: this.options.collection,
            srInfo: this.srInfo,
            showSortControls: true
        });
    },

    render: function() {
        var self = this;
        this.collection.refresh()
            .done(function() {
                PaginatedView.prototype.render.call(self);
                TeamUtils.hideMessage();
            });
        return this;
    }
});

export default TopicsView;
