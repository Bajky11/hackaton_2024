export const header_height = 40;
export const drawer_width = 142;

export const automationStates = [
  {
    type: 'GITHUB_REMOVE_COLLABORATORS',
    states: ['INITIAL', 'COMMAND_SENT', 'RETRY_CHOICE', 'FINISHED'],
    initial_state: 'INITIAL',
    end_state: 'FINISHED',
    transitions: [
      {
        from_state: 'INITIAL',
        to_state: 'COMMAND_SENT',
        event: 'AUTOMATION_TRIGGERED',
        action: 'IssueReconsileCollaboratorsCommandAction',
      },
      {
        from_state: 'COMMAND_SENT',
        to_state: 'FINISHED',
        event: 'SUCCESS_RECEIVED',
        action: null,
      },
      {
        from_state: 'COMMAND_SENT',
        to_state: 'RETRY_CHOICE',
        event: 'FAILURE_RECEIVED',
        action: null,
      },
      {
        from_state: 'RETRY_CHOICE',
        to_state: 'COMMAND_SENT',
        event: null,
        action: 'IssueReconsileCollaboratorsCommandAction',
      },
      {
        from_state: 'RETRY_CHOICE',
        to_state: 'FINISHED',
        event: null,
        action: null,
      },
    ],
  },
  {
    type: 'GITHUB_COPILOT_REMOVE_INACTIVE_USERS',
    states: [
      'INITIAL',
      'FETCH_GITHUB_COPILOT_USERS_COMMAND_SENT',
      'GET_LDAP_USERS_COMMAND_SENT',
      'GET_SNOW_TRIBES_COMMAND_SENT',
      'GET_LDAP_MANAGERS_COMMAND_SENT',
      'SEND_FINANCIAL_REPORT_EMAIL_COMMAND_SENT',
      'SEND_ACTIVE_USERS_REPORT_EMAIL_COMMAND_SENT',
      'REMOVE_REDIM_USERS_FROM_GROUP_COMMAND_SENT',
      'FINISHED',
    ],
    initial_state: 'INITIAL',
    end_state: 'FINISHED',
    transitions: [
      {
        from_state: 'INITIAL',
        to_state: 'FETCH_GITHUB_COPILOT_USERS_COMMAND_SENT',
        event: 'AUTOMATION_TRIGGERED',
        action: 'IssueFetchGithubCopilotUsersCommandAction',
      },
      {
        from_state: 'FETCH_GITHUB_COPILOT_USERS_COMMAND_SENT',
        to_state: 'GET_LDAP_USERS_COMMAND_SENT',
        event: 'FETCH_GITHUB_COPILOT_USERS_COMMAND_SUCCESS_RECEIVED',
        action: 'IssueGetLdapUsersCommandAction',
      },
      {
        from_state: 'GET_LDAP_USERS_COMMAND_SENT',
        to_state: 'GET_SNOW_TRIBES_COMMAND_SENT',
        event: 'GET_LDAP_USERS_COMMAND_SUCCESS_RECEIVED',
        action: 'IssueGetSnowTribesCommandAction',
      },
      {
        from_state: 'GET_SNOW_TRIBES_COMMAND_SENT',
        to_state: 'GET_LDAP_MANAGERS_COMMAND_SENT',
        event: 'GET_SNOW_TRIBES_COMMAND_SUCCESS_RECEIVED',
        action: 'IssueGetLdapManagersCommandAction',
      },
      {
        from_state: 'GET_LDAP_MANAGERS_COMMAND_SENT',
        to_state: 'SEND_FINANCIAL_REPORT_EMAIL_COMMAND_SENT',
        event: 'GET_LDAP_MANAGERS_COMMAND_SUCCESS_RECEIVED',
        action: 'IssueSendFinancialReportEmailCommandAction',
      },
      {
        from_state: 'SEND_FINANCIAL_REPORT_EMAIL_COMMAND_SENT',
        to_state: 'SEND_ACTIVE_USERS_REPORT_EMAIL_COMMAND_SENT',
        event: 'SEND_FINANCIAL_REPORT_EMAIL_COMMAND_SUCCESS_RECEIVED',
        action: 'IssueSendActiveUsersReportEmailCommandAction',
      },
      {
        from_state: 'SEND_ACTIVE_USERS_REPORT_EMAIL_COMMAND_SENT',
        to_state: 'REMOVE_REDIM_USERS_FROM_GROUP_COMMAND_SENT',
        event: 'SEND_ACTIVE_USERS_REPORT_EMAIL_COMMAND_SUCCESS_RECEIVED',
        action: 'IssueRemoveRedimUsersFromGroupCommandAction',
      },
      {
        from_state: 'REMOVE_REDIM_USERS_FROM_GROUP_COMMAND_SENT',
        to_state: 'FINISHED',
        event: 'REMOVE_REDIM_USERS_FROM_GROUP_COMMAND_SUCCESS_RECEIVED',
        action: null,
      },
    ],
  },
];
