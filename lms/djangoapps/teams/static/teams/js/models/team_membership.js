import Backbone from 'backbone';
import TeamModel from 'teams/js/models/team';

/**
 * Model for a team membership.
 */
const TeamMembership = Backbone.Model.extend({
    defaults: {
        date_joined: '',
        last_activity_at: '',
        team: null,
        user: null
    },

    parse: function(response) {
        response.team = new TeamModel(response.team); // eslint-disable-line no-param-reassign
        return response;
    }
});

export default TeamMembership;
