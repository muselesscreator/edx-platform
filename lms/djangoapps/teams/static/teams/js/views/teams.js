import Backbone from 'backbone';
import gettext from 'gettext';
import TeamCardView from 'teams/js/views/team_card';
import PaginatedView from 'components/views/paginated_view';
import TeamUtils from 'teams/js/views/team_utils';

export const TeamsView = PaginatedView.extend({
    type: 'teams',

    srInfo: {
        id: 'heading-browse-teams',
        text: gettext('All teams')
    },

    paginationLabel: gettext('Teams Pagination'),

    initialize: function(options) {
        var view = this;
        this.context = options.context;
        this.itemViewClass = TeamCardView.extend({
            router: options.router,
            courseMaxTeamSize: this.context.courseMaxTeamSize,
            srInfo: this.srInfo,
            countries: TeamUtils.selectorOptionsArrayToHashWithBlank(this.context.countries),
            languages: TeamUtils.selectorOptionsArrayToHashWithBlank(this.context.languages),
            getTopic: function(topicId) { return view.getTopic(topicId); }
        });
        PaginatedView.prototype.initialize.call(this);
    },

    // eslint-disable-next-line no-unused-vars
    getTopic: function(topicId) {
        // This must be overwritten in extending classes.
        return null;
    }
});

export default TeamsView;
