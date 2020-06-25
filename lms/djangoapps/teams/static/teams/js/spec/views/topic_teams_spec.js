define([
    'backbone',
    'underscore',
    'edx-ui-toolkit/js/utils/spec-helpers/ajax-helpers',
    'common/js/spec_helpers/page_helpers',
    'teams/js/views/topic_teams',
    'teams/js/spec_helpers/team_spec_helpers',
], function(Backbone, _, AjaxHelpers, PageHelpers, TopicTeamsView, TeamSpecHelpers) {
    'use strict';
    describe('Topic Teams View', function() {
        var requests, view;

        var verifyTeamsetTeamsRequest = function(hasTeams) {
            AjaxHelpers.expectRequestURL(
                requests,
                TeamSpecHelpers.testContext.teamMembershipsUrl,
                {
                    username: TeamSpecHelpers.testUser,
                    course_id: TeamSpecHelpers.testCourseID,
                    teamset_id: TeamSpecHelpers.testTopicID,
                }
            );
            AjaxHelpers.respondWithJson(
                requests,
                JSON.stringify({ count: hasTeams ? 1 : 0 })
            );
            AjaxHelpers.expectNoRequests(requests);
        };

        var createTopicTeamsView = function(options) {
            var _options = options || {};
            var context = _.extend(
                    {},
                    TeamSpecHelpers.testContext,
                    _options.context || {},
                ),
                onTeamInTeamset = options.onTeamInTeamset || false,
                isInstructorManagedTopic = options.isInstructorManagedTopic || false,
                model = isInstructorManagedTopic
                    ? TeamSpecHelpers.createMockInstructorManagedTopic()
                    : TeamSpecHelpers.createMockTopic(),
                collection = context.teams || TeamSpecHelpers.createMockTeams({results: []});
            expect({ context }).toEqual({});

            view = new TopicTeamsView({
                el: '.teams-container',
                model: model,
                collection: collection,
                context: context,
            });

            requests = AjaxHelpers.requests();
            view.render();
            verifyTeamsetTeamsRequest(onTeamInTeamset);
        };

        var verifyActions = function(view, showActions) {
            var expectedTitle = 'Are you having trouble finding a team to join?',
                expectedMessage = 'Browse teams in other topics or search teams in this topic. ' +
                    'If you still can\'t find a team to join, create a new team in this topic.',
                title = view.$('.title').text().trim(),
                message = view.$('.copy').text().trim();
            var _showActions = showActions || true;
            if (_showActions) {
                expect(title).toBe(expectedTitle);
                expect(message).toBe(expectedMessage);
            } else {
                expect(title).not.toBe(expectedTitle);
                expect(message).not.toBe(expectedMessage);
            }
        };

        beforeEach(function() {
            setFixtures('<div class="teams-container"></div>');
            PageHelpers.preventBackboneChangingUrl();
        });

        it('can render itself', function() {
            var testTeamData = TeamSpecHelpers.createMockTeamData(1, 5);
            var options = {
                context: {
                    teams: TeamSpecHelpers.createMockTeams({
                        results: testTeamData
                    })
                }
            };
            view = createTopicTeamsView(options);
            var footerEl = view.$('.teams-paging-footer');
            expect(view.$('.teams-paging-header').text()).toMatch('Showing 1-5 out of 6 total');
            expect(footerEl.text()).toMatch('1\\s+out of\\s+\/\\s+2'); // eslint-disable-line no-useless-escape
            expect(footerEl).not.toHaveClass('hidden');

            TeamSpecHelpers.verifyCards(view, testTeamData);
            verifyActions(view);
        });

        it('can browse all teams', function() {
            view = createTopicTeamsView();
            spyOn(Backbone.history, 'navigate');
            view.$('.browse-teams').click();
            expect(Backbone.history.navigate.calls.mostRecent().args[0]).toBe('browse');
        });

        it('gives the search field focus when clicking on the search teams link', function() {
            view = createTopicTeamsView();
            spyOn($.fn, 'focus').and.callThrough();
            view.$('.search-teams').click();
            expect(view.$('.search-field').first().focus).toHaveBeenCalled();
        });

        it('can show the create team modal', function() {
            view = createTopicTeamsView();
            spyOn(Backbone.history, 'navigate');
            view.$('a.create-team').click();
            expect(Backbone.history.navigate.calls.mostRecent().args[0]).toBe(
                'topics/' + TeamSpecHelpers.testTopicID + '/create-team'
            );
        });

        it('does not show actions for a user already in a team in the teamset', function() {
            view = createTopicTeamsView({ onTeamInTeamset: true });
            verifyActions(view, false);
        });

        it('does not show actions for a student in an instructor managed topic', function() {
            view = createTopicTeamsView({ isInstructorManagedTopic: true });
            verifyActions(view, false);
        });

        it('shows actions for a privileged user already in a team', function() {
            var options = {
                context: {
                    userInfo: {
                        privileged: true,
                        staff: false
                    },
                },
                onTeamInTeamset: true
            };
            view = createTopicTeamsView(options);
            verifyActions(view);
        });

        it('shows actions for a staff user already in a team', function() {
            var options = {
                context: {
                    userInfo: {
                        privileged: false,
                        staff: true
                    },
                },
                onTeamInTeamset: true
            };
            view = createTopicTeamsView(options);
            verifyActions(view);
        });

        /*
        // TODO: make this ready for prime time
        it('refreshes when the team membership changes', function() {
            var requests = AjaxHelpers.requests(this),
                teamMemberships = TeamSpecHelpers.createMockTeamMemberships([]),
                view = createTopicTeamsView({ teamMemberships: teamMemberships });
            verifyActions(view);
            teamMemberships.teamEvents.trigger('teams:update', { action: 'create' });
            view.render();
            AjaxHelpers.expectRequestURL(
                requests,
                'foo',
                {
                    expand : 'team',
                    username : 'testUser',
                    course_id : TeamSpecHelpers.testCourseID,
                    page : '1',
                    page_size : '10'
                }
            );
            AjaxHelpers.respondWithJson(requests, {});
            verifyActions(view, false);
        });
        */
    });
});
