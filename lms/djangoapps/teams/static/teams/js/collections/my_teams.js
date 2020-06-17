import TeamCollection from 'teams/js/collections/team';

const MyTeamsCollection = TeamCollection.extend({
    queryParams: {
        username: function() {
            return this.options.username;
        },
        text_search: function() {
            return this.searchString || '';
        }
    },

    constructor: function(teams, options) {
        TeamCollection.prototype.constructor.call(this, teams, options);
        delete this.queryParams.topic_id;
    }
});

export default MyTeamsCollection;
