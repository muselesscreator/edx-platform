import logger from 'logger';

/**
 * Utility methods for emitting teams events. See the event spec:
 * https://openedx.atlassian.net/wiki/display/AN/Teams+Feature+Event+Design
 */
const TeamAnalytics = {
    emitPageViewed: function(pageName, topicId, teamId) {
        Logger.log('edx.team.page_viewed', {
            page_name: pageName,
            topic_id: topicId,
            team_id: teamId
        });
    }
};

export default TeamAnalytics;
