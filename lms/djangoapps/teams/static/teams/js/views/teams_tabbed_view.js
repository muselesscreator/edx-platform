import TabbedView from 'components/views/tabbed_view';
import TeamAnalytics from 'teams/js/utils/team_analytics';

/**
 * A custom TabbedView for Teams.
 */
const TeamsTabbedView = TabbedView.extend({
    /**
     * Overrides TabbedView.prototype.setActiveTab in order to
     * log page viewed events.
     */
    setActiveTab: function(index) {
        TabbedView.prototype.setActiveTab.call(this, index);
        TeamAnalytics.emitPageViewed(this.getTabMeta(index).tab.url, null, null);
    }
});

export default TeamsTabbedView;
