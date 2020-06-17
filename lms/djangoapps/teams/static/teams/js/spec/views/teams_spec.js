import $ from 'jquery';
import Backbone from 'backbone';

import TeamCollection from 'teams/js/collections/team';
import TeamsView form 'teams/js/views/teams';
impoert TeamSpecHelpers from 'teams/js/spec_helpers/team_spec_helpers';

let createTeamsView;
describe('Teams View', function() {
    beforeEach(function() {
        setFixtures('<div class="teams-container"></div>');
    });

    createTeamsView = function(options) {
        var MockTeamsView = TeamsView.extend({
            // eslint-disable-next-line no-unused-vars
            getTopic: function(topicId) {
                return $.Deferred().resolve(TeamSpecHelpers.createMockTopic({}));
            }
        });
        return new MockTeamsView({
            el: '.teams-container',
            collection: options.teams || TeamSpecHelpers.createMockTeams(),
            showActions: true,
            context: TeamSpecHelpers.testContext
        }).render();
    };

    it('can render itself', function() {
        var testTeamData = TeamSpecHelpers.createMockTeamData(1, 5),
            teamsView = createTeamsView({
                teams: TeamSpecHelpers.createMockTeams({
                    results: testTeamData
                })
            });
        var footerEl = teamsView.$('.teams-paging-footer');

        expect(teamsView.$('.teams-paging-header').text()).toMatch('Showing 1-5 out of 6 total');
        expect(footerEl.text()).toMatch('1\\s+out of\\s+\/\\s+2'); // eslint-disable-line no-useless-escape
        expect(footerEl).not.toHaveClass('hidden');

        TeamSpecHelpers.verifyCards(teamsView, testTeamData);
    });
});
