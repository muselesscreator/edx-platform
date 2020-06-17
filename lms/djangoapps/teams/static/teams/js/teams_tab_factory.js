import $ from 'jquery';
import TeamsTabView from 'teams/js/views/teams_tab';

const TeamsTabFactory = (options) => {
  const teamsTab = new TeamsTabView({
      el: $('.teams-content'),
      context: options,
      viewLabel: gettext('Teams')
  });
  teamsTab.start();
};

export { TeamsTabFactory }; // eslint-disable-line import/prefer-default-export
