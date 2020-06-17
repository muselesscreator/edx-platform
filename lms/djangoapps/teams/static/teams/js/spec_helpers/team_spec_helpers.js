import Backbone from 'backbone';
import _ from 'underscore';

import TeamCollection from 'teams/js/collections/team';
import TopicCollection from 'teams/js/collecitons/topic';
import TopicModel from 'teams/js/models/topic';

const testInstructorManagedTopicID = 'test-instructor-managed-topic-1',

export const testCourseID = 'course/1';
export const testUser = 'testUser';
export const testTopicID = 'test-topic-1';
export const testTeamDiscussionID = '12345';
export const teamEvents = _.clone(Backbone.Events);
export const testCountries = [
  ['', ''],
  ['US', 'United States'],
  ['CA', 'Canada'],
  ['MX', 'Mexico']
];
export const testLanguages = [
  ['', ''],
  ['en', 'English'],
  ['es', 'Spanish'],
  ['fr', 'French']
];


export const createMockTeamData = function(startIndex, stopIndex) {
    return _.map(_.range(startIndex, stopIndex + 1), function(i) {
        var id = 'id' + i;
        return {
            name: 'team ' + i,
            id: id,
            language: testLanguages[i % 4][0],
            country: testCountries[i % 4][0],
            membership: [],
            last_activity_at: '',
            topic_id: 'topic_id' + i,
            url: 'api/team/v0/teams/' + id
        };
    });
};

export const createMockTeamsResponse = function(options) {
    return _.extend(
        {
            count: 6,
            num_pages: 2,
            current_page: 1,
            start: 0,
            results: createMockTeamData(1, 5)
        },
        options
    );
};

export const createMockTeams = function(responseOptions, options, collectionType) {
    if (_.isUndefined(collectionType)) {
        collectionType = TeamCollection; // eslint-disable-line no-param-reassign
    }
    return new collectionType(
        createMockTeamsResponse(responseOptions),
        _.extend({
            perPage: 5,
            teamEvents: teamEvents,
            course_id: testCourseID,
            parse: true
        }, options)
    );
};

export const createMockTeamAssignments = function(assignments, options) {
    if (_.isUndefined(assignments)) {
        assignments = [ // eslint-disable-line no-param-reassign
            {
                display_name: 'Send me',
                location: 'your location'
            }
        ];
    }
    return _.extend(assignments, options);
};

export const createMockTeamMembershipsData = function(startIndex, stopIndex) {
    var teams = createMockTeamData(startIndex, stopIndex);
    return _.map(_.range(startIndex, stopIndex + 1), function(i) {
        return {
            user: {
                username: testUser,
                url: 'https://openedx.example.com/api/user/v1/accounts/' + testUser,
                profile_image: {
                    image_url_small: 'test_profile_image'
                }
            },
            team: teams[i - 1]
        };
    });
};

export const createMockUserInfo = function(options) {
    return _.extend(
        {
            username: testUser,
            privileged: false,
            staff: false,
            team_memberships_data: createMockTeamMembershipsData(1, 5)
        },
        options
    );
};

export const verifyCards = function(view, teams) {
    var teamCards = view.$('.team-card');
    _.each(teams, function(team, index) {
        var currentCard = teamCards.eq(index);
        expect(currentCard.text()).toMatch(team.name);
        expect(currentCard.text()).toMatch(_.object(testLanguages)[team.language]);
        expect(currentCard.text()).toMatch(_.object(testCountries)[team.country]);
    });
};

export const triggerTeamEvent = function(action) {
    teamEvents.trigger('teams:update', {action: action});
};

export const createMockPostResponse = function(options) {
    return _.extend(
        {
            username: testUser,
            course_id: testCourseID,
            commentable_id: testTeamDiscussionID,
            type: 'thread',
            body: '',
            anonymous_to_peers: false,
            unread_comments_count: 0,
            updated_at: '2015-07-29T18:44:56Z',
            group_name: 'Default Group',
            pinned: false,
            votes: {count: 0, down_count: 0, point: 0, up_count: 0},
            user_id: '9',
            abuse_flaggers: [],
            closed: false,
            at_position_list: [],
            read: false,
            anonymous: false,
            created_at: '2015-07-29T18:44:56Z',
            thread_type: 'discussion',
            comments_count: 0,
            group_id: 1,
            endorsed: false
        },
        options
    );
};

export const createMockDiscussionResponse = function(threads) {
    var responseThreads = threads;
    if (_.isUndefined(threads)) {
        responseThreads = [
            createMockPostResponse({id: '1', title: 'First Post'}),
            createMockPostResponse({id: '2', title: 'Second Post'}),
            createMockPostResponse({id: '3', title: 'Third Post'})
        ];
    }
    return {
        num_pages: 1,
        page: 1,
        discussion_data: responseThreads,
        user_info: {
            username: testUser,
            follower_ids: [],
            default_sort_key: 'date',
            downvoted_ids: [],
            subscribed_thread_ids: [],
            upvoted_ids: [],
            external_id: '9',
            id: '9',
            subscribed_user_ids: [],
            subscribed_commentable_ids: []
        },
        annotated_content_info: {
        },
        roles: {Moderator: [], Administrator: [], 'Community TA': []},
        course_settings: {
            is_cohorted: false,
            allow_anonymous_to_peers: false,
            allow_anonymous: true,
            category_map: {subcategories: {}, children: [], entries: {}},
            cohorts: []
        }
    };
};

export const createAnnotatedContentInfo = function() {
    return {
        voted: '',
        subscribed: true,
        ability: {
            can_reply: true,
            editable: true,
            can_openclose: true,
            can_delete: true,
            can_vote: true
        }
    };
};

export const createMockThreadResponse = function(options) {
    return _.extend(
        {
            username: testUser,
            course_id: testCourseID,
            commentable_id: testTeamDiscussionID,
            children: [],
            comments_count: 0,
            anonymous_to_peers: false,
            unread_comments_count: 0,
            updated_at: '2015-08-04T21:44:28Z',
            resp_skip: 0,
            id: '55c1323c56c02ce921000001',
            pinned: false,
            votes: {count: 0, down_count: 0, point: 0, up_count: 0},
            resp_limit: 25,
            abuse_flaggers: [],
            closed: false,
            resp_total: 1,
            at_position_list: [],
            type: 'thread',
            read: true,
            anonymous: false,
            user_id: '5',
            created_at: '2015-08-04T21:44:28Z',
            thread_type: 'discussion',
            context: 'standalone',
            endorsed: false
        },
        options
    );
};

export const createMockTopicData = function(startIndex, stopIndex) {
    return _.map(_.range(startIndex, stopIndex + 1), function(i) {
        return {
            description: 'Test description ' + i,
            name: 'Test Topic ' + i,
            id: 'test-topic-' + i,
            team_count: 0
        };
    });
};

export const createMockTopic = function(options) {
    return new TopicModel(_.extend(
        {
            id: testTopicID,
            name: 'Test Topic 1',
            description: 'Test description 1',
            type: 'open'
        },
        options
    ));
};

export const createMockInstructorManagedTopic = function(options) {
    return new TopicModel(_.extend(
        {
            id: testInstructorManagedTopicID,
            name: 'Test Instructor Managed Topic 1',
            description: 'Test instructor managed topic description 1',
            type: 'public_managed'
        },
        options
    ));
};

export const testContext = {
    courseID: testCourseID,
    topics: {
        count: 5,
        num_pages: 1,
        current_page: 1,
        start: 0,
        results: createMockTopicData(1, 5)
    },
    hasOpenTopic: true,
    hasPublicManagedTopic: false,
    hasManagedTopic: false,
    courseMaxTeamSize: 6,
    languages: testLanguages,
    countries: testCountries,
    topicUrl: '/api/team/v0/topics/topic_id,' + testCourseID,
    teamsUrl: '/api/team/v0/teams/',
    teamsAssignmentsUrl: '/api/team/v0/teams/team_id/assignments',
    teamsDetailUrl: '/api/team/v0/teams/team_id',
    teamMembershipsUrl: '/api/team/v0/team_memberships/',
    teamMembershipDetailUrl: '/api/team/v0/team_membership/team_id,' + testUser,
    myTeamsUrl: '/api/team/v0/teams/',
    userInfo: createMockUserInfo()
};

export const createMockContext = (options) => _.extend({}, testContext, options);

export const createMockTopicCollection = function(topicData) {
    // eslint-disable-next-line no-param-reassign
    topicData = topicData !== undefined ? topicData : createMockTopicData(1, 5);

    return new TopicCollection(
        {
            count: topicData.length + 1,
            current_page: 1,
            num_pages: 2,
            start: 0,
            results: topicData,
            sort_order: 'name'
        },
        {
            teamEvents: teamEvents,
            course_id: testCourseID,
            parse: true,
            url: testContext.topicUrl
        }
    );
};
