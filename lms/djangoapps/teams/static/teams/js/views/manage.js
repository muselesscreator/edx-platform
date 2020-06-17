import Backbone from 'backbone';
import _ from 'underscore';
import gettext from 'gettext';

import HtmlUtils from 'edx-ui-toolkit/js/utils/html-utils';
import ViewUtils from 'common/js/components/utils/view_utils';

import TeamModel from 'teams/js/models/team';

import dateTemplate from 'teams/templates/date.underscore';
import manageTemplate from 'teams/templates/manage.underscore';
import editTeamMemberTemplate from 'teams/templates/edit-team-member.underscore';

const ManageView = Backbone.View.extend({
    srInfo: {
        id: 'heading-manage',
        text: gettext('Manage')
    },

    events: {
        'click #download-team-csv': 'downloadCsv',
        'change #upload-team-csv-input': 'setTeamMembershipCsv',
        'click #upload-team-csv': ViewUtils.withDisabledElement('uploadCsv')
    },

    initialize: function(options) {
        this.teamEvents = options.teamEvents;
        this.csvUploadUrl = options.teamMembershipManagementUrl;
        this.csvDownloadUrl = options.teamMembershipManagementUrl;
    },

    render: function() {
        HtmlUtils.setHtml(
            this.$el,
            HtmlUtils.template(manageTemplate)({})
        );
        return this;
    },

    downloadCsv: function() {
        window.location.href = this.csvDownloadUrl;
    },

    setTeamMembershipCsv: function(event) {
        this.membershipFile = event.target.files[0];

        // enable the upload button when a file is selected
        if (this.membershipFile) {
            $('#upload-team-csv').removeClass('is-disabled').attr('aria-disabled', false);
        } else {
            $('#upload-team-csv').addClass('is-disabled').attr('aria-disabled', true);
        }
    },

    uploadCsv: function() {
        var formData = new FormData();
        formData.append('csv', this.membershipFile);  // xss-lint: disable=javascript-jquery-append

        return $.ajax({
            type: 'POST',
            url: this.csvUploadUrl,
            data: formData,
            processData: false,  // tell jQuery not to process the data
            contentType: false   // tell jQuery not to set contentType
        }).done(
            this.handleCsvUploadSuccess
        ).fail(
            this.handleCsvUploadFailure
        );
    },

    handleCsvUploadSuccess: function(data) {
        TeamUtils.showInfoBanner(data.message, false);

        // Implement a teams:update event (TODO MST-44)
    },

    handleCsvUploadFailure: function(jqXHR) {
        TeamUtils.showInfoBanner(jqXHR.responseJSON.errors, true);
    }
});

export default ManageView;
