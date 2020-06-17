import Backbone from 'backbone';
/**
 * Model for a team.
 */
const Team = Backbone.Model.extend({
    defaults: {
        id: null,
        name: '',
        course_id: '',
        topic_id: '',
        date_created: '',
        description: '',
        country: '',
        language: '',
        membership: [],
        last_activity_at: ''
    },

    initialize: function(options) {
        this.url = options.url;
    }
});
export default Team;
