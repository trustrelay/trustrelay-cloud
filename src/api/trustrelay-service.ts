import BaseService from './base-service';
import {
 
  GetCheckoutSessionResponse,
 
  AppNotification, 
   GetSasInfoResponse,
  TrustRelayAccount, GetAccountResponse,
  Membership, Agent,
  Common,
  Dispute, DisputeMessage,
  Task, Acl,
 
  DataspaceInfo,
  SignedAgreement,
  TemplateAgreement,
  ServiceConnection,

  QueryResponse,
 
  CreateTemplateAgreementPayload,
  TemplateAgreementSummary,
  SignedAgreementSummary,

  DailyCount,
  DataProvenanceSet,
  Subscription,
  Dataspace,
  DrillQueryResponse,
  DashboardStats,
  QueryHistoryResponse,
  QueryHistoryRequest,
  UserTask,
  Issue,
  Usage,
  AuditLogsRequest,
  AuditLogsResponse,
  
  GeoScores,
  DataspaceSummary,
  InvitationStatus,
  Organization,
  CommonAgreementSummary
} from './models/models';


class TrustRelayService extends BaseService {



  getAccount = async (jwt: string): Promise<TrustRelayAccount> =>
    await this.simpleGet<GetAccountResponse>(`/me`, jwt).then((res: any) => {
      if (res && res.value) {
        return res.value as TrustRelayAccount;
      } else {
        throw new Error('API returned succesful but payload is unexpected.');
      }
    }).catch((reason: any) => {
      throw new Error(`Failed request to get account. ${reason}`)
    })



  getMemberships = async (jwt: string): Promise<Array<Membership>> =>
    await this.simpleGet(`/memberships`, jwt).then((res: any) => {
      if (res && res.value) {
        return res.value as Array<Membership>;
      } else {
        throw new Error('Failed request to get memberships');
      }
    });


  getNotifications = async (jwt: string): Promise<Array<AppNotification>> =>
    await this.simpleGet(`/notifications`, jwt).then((res: any) => {
      if (res && res.value) {
        return res.value as Array<AppNotification>;
      } else {
        throw new Error('Failed request to get notifications');
      }
    });



  getAgents = async (jwt: string, dataspace: string): Promise<Array<Agent>> =>
    await this.simpleGet(`/dataspaces/${dataspace}/agents`, jwt).then((res: any) => {
      if (res && res.value) {
        return res.value as Array<Agent>;
      } else {
        throw new Error('Failed request to get memberships');
      }
    });

  getAgent = async (jwt: string, dataspace: string): Promise<Agent> =>
    await this.simpleGet(`/dataspaces/${dataspace}/agent`, jwt).then((res: any) => {
      if (res && res.value) {
        return res.value as Agent;
      } else {
        throw new Error('Failed request to get agent');
      }
    });

  getDataspace = async (jwt: string, dataspace: string): Promise<Dataspace> =>
    await this.simpleGet(`/dataspaces/${dataspace}`, jwt).then((res: any) => {
      if (res && res.value) {
        return res.value as Dataspace;
      } else {
        throw new Error('Failed request to get dataspace');
      }
    });

  getCommons = async (jwt: string, dataspace: string): Promise<Array<Common>> =>
    await this.simpleGet(`/dataspaces/${dataspace}/commons`, jwt).then((res: any) => {
      if (res && res.value) {
        return res.value as Array<Common>;
      } else {
        throw new Error('Failed request to get commons');
      }
    });

  getAllServiceConnections = async (jwt: string, dataspace: string): Promise<Array<ServiceConnection>> =>
    await this.simpleGet(`/dataspaces/${dataspace}/settings/service-connections`, jwt).then((res: any) => {
      if (res && res.value) {
        return res.value as Array<ServiceConnection>;
      } else {
        throw new Error('Failed request to get service connections');
      }
    });

  getAvailableServiceConnections = async (jwt: string, dataspace: string): Promise<Array<ServiceConnection>> =>
    await this.simpleGet(`/dataspaces/${dataspace}/settings/available-service-connections`, jwt).then((res: any) => {
      if (res && res.value) {
        return res.value as Array<ServiceConnection>;
      } else {
        throw new Error('Failed request to get service connections');
      }
    });



  getSignedAgreements = async (jwt: string, dataspace: string): Promise<Array<SignedAgreementSummary>> =>
    await this.simpleGet(`/dataspaces/${dataspace}/signed-agreement-summaries`, jwt).then((res: any) => {
      if (res && res.value) {
        return res.value as Array<SignedAgreementSummary>;
      } else {
        throw new Error('Failed request to get signed agreements');
      }
    });


  getTemplateAgreementSummaries = async (jwt: string, dataspace: string): Promise<Array<TemplateAgreementSummary>> =>
    await this.simpleGet(`/dataspaces/${dataspace}/template-agreement-summaries`, jwt).then((res: any) => {
      if (res && res.value) {
        return res.value as Array<TemplateAgreementSummary>;
      } else {
        throw new Error('Failed request to get template agreements');
      }
    });

  acceptAgreement = async (jwt: string, dataspace: string, agreement: string): Promise<void> =>
    await this.postWithResponse<string>(`/dataspaces/${dataspace}/signed-agreements/${agreement}/accept`, jwt).then((res: any) => {
      if (res && res.value) {
        return
      } else {
        throw new Error('Failed request to get memberships');
      }
    });

  getDisputes = async (jwt: string, dataspace: string): Promise<Array<Dispute>> =>
    await this.simpleGet(`/dataspaces/${dataspace}/disputes`, jwt).then((res: any) => {
      if (res && res.value) {
        return res.value as Array<Dispute>;
      } else {
        throw new Error('Failed request to get disputes');
      }
    });

  getStats = async (jwt: string, dataspace: string): Promise<DashboardStats> =>
    await this.simpleGet(`/dataspaces/${dataspace}/stats`, jwt).then((res: any) => {
      if (res && res.value) {
        return res.value as DashboardStats;
      } else {
        throw new Error('Failed request to get dashboard stats');
      }
    });


  query = async (jwt: string, dataspace: string, query: string): Promise<DrillQueryResponse> => {

    let data = {
      queryType: "SQL",
      query
    }

    return await this.postWithResponse<string>(`/dataspaces/${dataspace}/query`, jwt, data).then((res: any) => {
      if (res && res.value) {
        return res.value as DrillQueryResponse
      } else {
        throw new Error('Failed request to send query');
      }
    });
  }

  inviteMember = async (jwt: string, dataspace: string, email: string): Promise<void> => {
    let data = {
      email: email
    }

    await this.postWithResponse<string>(`/dataspaces/${dataspace}/invite`, jwt, data).then((res: any) => {
      if (res && res.value) {
        return
      } else {
        throw new Error('Failed request to send invitation');
      }
    });

  }

  disableMembership = async (jwt: string, dataspace: string, agent: string): Promise<void> => {

    const data = {
      email: agent
    }

    await this.postWithResponse<string>(`/dataspaces/${dataspace}/disable-membership`, jwt, data).then((res: any) => {
      if (res && res.value) {
        return
      } else {
        throw new Error('Failed request to disable membership');
      }
    });

  }

  getDataProvenance = async (jwt: string, dataspace: string): Promise<DataProvenanceSet> =>
    await this.simpleGet(`/dataspaces/${dataspace}/provenance`, jwt).then((res: any) => {
      if (res && res.value) {
        return res.value as DataProvenanceSet;
      } else {
        throw new Error('Failed request to get dataspace provenance');
      }
    });

  getUserTasks = async (jwt: string, dataspace: string): Promise<Array<UserTask>> =>
    await this.simpleGet(`/dataspaces/${dataspace}/tasks`, jwt).then((res: any) => {
      if (res && res.value) {
        return res.value as Array<UserTask>;
      } else {
        throw new Error('Failed request to get user tasks');
      }
    });

  getIssues = async (jwt: string, dataspace: string): Promise<Array<Issue>> =>
    await this.simpleGet(`/dataspaces/${dataspace}/issues`, jwt).then((res: any) => {
      if (res && res.value) {
        return res.value as Array<Issue>;
      } else {
        throw new Error('Failed request to get issues');
      }
    });

  getTasks = async (jwt: string, dataspace: string, commonId: string): Promise<Array<Task>> =>
    await this.simpleGet(`/dataspaces/${dataspace}/commons/${commonId}/tasks`, jwt).then((res: any) => {
      if (res && res.value) {
        return res.value as Array<Task>;
      } else {
        throw new Error('Failed request to get tasks');
      }
    });



  getQueriesPerDay = async (jwt: string, dataspace: string, commonId: string): Promise<Array<DailyCount>> =>
    await this.simpleGet(`/dataspaces/${dataspace}/commons/${commonId}/queries-daily`, jwt).then((res: any) => {
      if (res && res.value) {
        return res.value as Array<DailyCount>;
      } else {
        throw new Error('Failed request to get queries per day');
      }
    });

  getUsage = async (jwt: string, dataspace: string): Promise<Usage> =>
    await this.simpleGet(`/dataspaces/${dataspace}/usage`, jwt).then((res: any) => {
      if (res && res.value) {
        return res.value as Usage;
      } else {
        throw new Error('Failed request to get data usage');
      }
    });

  getGeoscores = async (jwt: string, dataspace: string): Promise<GeoScores> =>
    await this.simpleGet(`/dataspaces/${dataspace}/geoscores`, jwt).then((res: any) => {
      if (res && res.value) {
        return res.value as GeoScores;
      } else {
        throw new Error('Failed request to get geo scores');
      }
    });


  


  getAclsByAgent = async (jwt: string, dataspace: string): Promise<Array<Acl>> =>
    await this.simpleGet(`/dataspaces/${dataspace}/agent/acl`, jwt).then((res: any) => {
      if (res && res.value) {
        return res.value as Array<Acl>;
      } else {
        throw new Error('Failed request to get Acls by agent');
      }
    });


  getAclsByCommon = async (jwt: string, dataspace: string, common: string): Promise<Array<Acl>> =>
    await this.simpleGet(`/dataspaces/${dataspace}/commons/${common}/acl`, jwt).then((res: any) => {
      if (res && res.value) {
        return res.value as Array<Acl>;
      } else {
        throw new Error('Failed request to get Acls by common');
      }
    });

    getSubscription = async (jwt: string, subscription: string): Promise<Subscription> =>
    await this.simpleGet(`/settings/subscriptions/${subscription}`, jwt).then((res: any) => {
      if (res && res.value) {
        return res.value as Subscription;
      } else {
        throw new Error('Failed request to get subscription');
      }
    });

    setNewSchemaFromUrl = async (jwt: string, commonId: string, url: string, dataspaceId: string): Promise<void> => {
      let data = {
        schemaUrl: url
      }
  
      await this.postWithResponse<string>(`/dataspaces/${dataspaceId}/commons/${commonId}/schemas`, jwt, data).then((res: any) => {
        if (res && res.value) {
          return
        } else {
          throw new Error('Failed request to send invitation');
        }
      });
  
    }

  getCommon = async (jwt: string, dataspace: string, common: string): Promise<Common> =>
    await this.simpleGet(`/dataspaces/${dataspace}/commons/${common}`, jwt).then((res: any) => {
      if (res && res.value) {
        return res.value as Common;
      } else {
        throw new Error('Failed request to get common');
      }
    });



  getCommonAcl = async (jwt: string, dataspace: string, common: string, agent: string): Promise<Acl> =>
    await this.simpleGet(`/dataspaces/${dataspace}/commons/${common}/acls?agent=${agent}`, jwt).then((res: any) => {
      if (res && res.value) {
        return res.value as Acl;
      } else {
        throw new Error('Failed request to get common Acl');
      }
    });



  getTemplateAgreement = async (jwt: string, dataspace: string, agreement: string): Promise<TemplateAgreement> =>
    await this.simpleGet(`/dataspaces/${dataspace}/template-agreements/${agreement}`, jwt).then((res: any) => {
      if (res && res.value) {
        return res.value as TemplateAgreement;
      } else {
        throw new Error('Failed request to get template agreement');
      }
    });

  getSignedAgreement = async (jwt: string, dataspace: string, agreement: string): Promise<SignedAgreement> =>
    await this.simpleGet(`/dataspaces/${dataspace}/signed-agreements/${agreement}`, jwt).then((res: any) => {
      if (res && res.value) {
        return res.value as SignedAgreement;
      } else {
        throw new Error('Failed request to get signed agreement');
      }
    });

    getSignedAgreementsByCommon = async (jwt: string, dataspace: string, common: string): Promise<Array<CommonAgreementSummary>> =>
    await this.simpleGet(`/dataspaces/${dataspace}/commons/${common}/signed-agreements`, jwt).then((res: any) => {
      if (res && res.value) {
        return res.value as Array<CommonAgreementSummary>;
      } else {
        throw new Error('Failed request to get signed agreements by common');
      }
    });

    getSignedAgreementsByDataspace = async (jwt: string, dataspace: string): Promise<Array<CommonAgreementSummary>> =>
    await this.simpleGet(`/dataspaces/${dataspace}/signed-agreements`, jwt).then((res: any) => {
      if (res && res.value) {
        return res.value as Array<CommonAgreementSummary>;
      } else {
        throw new Error('Failed request to get signed agreements by dataspace');
      }
    });


  getServiceConnection = async (jwt: string, dataspace: string, serviceConnection: string): Promise<ServiceConnection> =>
    await this.simpleGet(`/dataspaces/${dataspace}/settings/service-connections/${serviceConnection}`, jwt).then((res: any) => {
      if (res && res.value) {
        return res.value as ServiceConnection;
      } else {
        throw new Error('Failed request to get service connection');
      }
    });



  getAllDataspaces = async (jwt: string): Promise<Array<DataspaceInfo>> =>
    await this.simpleGet(`/dataspaces`, jwt).then((res: any) => {
      if (res && res.value) {
        return res.value as Array<DataspaceInfo>;
      } else {
        throw new Error('Failed request to get dataspaces');
      }
    });

  getAllSubscriptions = async (jwt: string): Promise<Array<Subscription>> =>
    await this.simpleGet(`/settings/subscriptions`, jwt).then((res: any) => {
      if (res && res.value) {
        return res.value as Array<Subscription>;
      } else {
        throw new Error('Failed request to get subscriptions');
      }
    });





  getDisputeMessages = async (jwt: string, dispute: string): Promise<Array<DisputeMessage>> =>
    await this.simpleGet(`/disputes/${dispute}/messages`, jwt).then((res: any) => {
      if (res && res.value) {
        return res.value as Array<DisputeMessage>;
      } else {
        throw new Error('Failed request to get dispute messages');
      }
    });




  getQueryHistory = async (jwt: string, dataspace: string, query: QueryHistoryRequest): Promise<QueryHistoryResponse> =>
    await this.postWithResponse<QueryResponse>(`/dataspaces/${dataspace}/queries`, jwt, query).then((res: any) => {
      if (res) {
        return res as QueryHistoryResponse;
      } else {
        throw new Error('Failed request to get query history');
      }
    });



  getAuditLogs = async (jwt: string, dataspace: string, query: AuditLogsRequest): Promise<AuditLogsResponse> =>
    await this.postWithResponse<AuditLogsResponse>(`/dataspaces/${dataspace}/audit-logs`, jwt, query).then((res: any) => {
      if (res) {
        return res as AuditLogsResponse;
      } else {
        throw new Error('Failed request to get audit logs');
      }
    });

  getDataspaceSummary = async (jwt: string, dataspace: string): Promise<DataspaceSummary> =>
    await this.simpleGet<DataspaceSummary>(`/dataspaces/${dataspace}/summary`, jwt).then((res: any) => {
      if (res && res.value) {
        return res.value as DataspaceSummary;
      } else {
        throw new Error('Failed request to get dataspace summary');
      }
    });



  signupToJoinDataspace = async (email: string, dataspace: string, code: string): Promise<void> => {
    let data = {
      code,
      email,
      dataspace
    }
    await this.postWithResponse<string>(`/signup-to-join`, '', data).then((res: any) => {
      if (res && res.value) {
        return
      } else {
        throw new Error('Failed request to send request to signup');
      }
    });
  }




  ackSession = async (jwt: string, session: string): Promise<void> =>
    await this.postWithResponse<string>(`/cli-sessions/ack?id=${session}`, jwt).then((res: any) => {
      if (res && res.value) {
        return
      } else {
        throw new Error('Failed request to acknowledge session');
      }
    });
  

  ackNotification = async (jwt: string, notification: string): Promise<void> =>
    await this.postWithResponse<string>(`/notifications/ack?id=${notification}`, jwt).then((res: any) => {
      if (res && res.value) {
        return
      } else {
        throw new Error('Failed request to acknowledge notification');
      }
    });

  setInvitationSettings = async (jwt: string, dataspace: string, enabled: boolean): Promise<void> => {
    let data = {
      enabled
    }
    await this.postWithResponse<string>(`/dataspaces/${dataspace}/invitation-settings`, jwt, data).then((res: any) => {
      if (res && res.value) {
        return
      } else {
        throw new Error('Failed request to update invitation settings');
      }
    });
  }


  sendFeedback = async (jwt: string, satisfactionLevel: string, feedbackText:string, canEmailYou: boolean): Promise<void> => {
    let data = {
      satisfactionLevel,
      feedbackText,
      canEmailYou
    }
    await this.postWithResponse<string>(`/feedback`, jwt, data).then((res: any) => {
      if (res && res.value) {
        return
      } else {
        throw new Error('Failed request to send feedback');
      }
    });
  }



  submitLearnMoreIdea = async (input: string): Promise<void> => {
    let data = {
      input 
    }
    await this.postWithResponse<string>(`/learn-more/submit`, '', data).then((res: any) => {
      if (res && res.value) {
        return
      } else {
        throw new Error('Failed request to submit learn-more idea');
      }
    });

  }

  createNewTask = async (jwt: string, dataspace: string, commonId: string, inputSource: string, taskType: string): Promise<void> => {
    let data = {
      inputSource: inputSource,
      taskType: taskType
    }

    await this.postWithResponse<string>(`/dataspaces/${dataspace}/commons/${commonId}/tasks`, jwt, data).then((res: any) => {
      if (res && res.value) {
        return
      } else {
        throw new Error('Failed request to create new task');
      }
    });
  }


  createNewOrganizationalUnit = async (jwt: string, organizationName: string): Promise<void> => {
    let data = {
      organizationName
    }

    await this.postWithResponse<string>(`/organizations`, jwt, data).then((res: any) => {
      if (res && res.value) {
        return
      } else {
        throw new Error('Failed request to create new organizational unit');
      }
    });
  }

  editCommon = async (jwt: string, dataspace: string, commonId: string, commonName: string, dataOwner: string, dataExpert: string): Promise<void> => {
    let data = {
      commonName,
      dataOwner,
      dataExpert
    }

    await this.patchWithResponse<string>(`/dataspaces/${dataspace}/commons/${commonId}`, jwt, data).then((res: any) => {
      if (res && res.value) {
        return
      } else {
        throw new Error('Failed request to edit common');
      }
    });
  }


  editSubscription = async (jwt: string, subscriptionId: string, subscriptionName: string, procurementEmail: string): Promise<void> => {
    let data = {
      subscriptionName, 
      procurementEmail
    }

    await this.patchWithResponse<string>(`/settings/subscriptions/${subscriptionId}`, jwt, data).then((res: any) => {
      if (res && res.value) {
        return
      } else {
        throw new Error('Failed request to edit subscription');
      }
    });
  }


  cancelSubscription = async (jwt: string, subscriptionId: string): Promise<void> => {
    
    await this.postWithResponse<string>(`/settings/subscriptions/${subscriptionId}/cancel`, jwt).then((res: any) => {
      if (res && res.value) {
        return
      } else {
        throw new Error('Failed request to cancel subscription');
      }
    });
  }


  extendTrialSubscription = async (jwt: string, subscriptionId: string): Promise<void> => {
    
    await this.postWithResponse<string>(`/settings/subscriptions/${subscriptionId}/extend-trial`, jwt).then((res: any) => {
      if (res && res.value) {
        return
      } else {
        throw new Error('Failed request to extend trial subscription');
      }
    });
  }




  editTemplateAgreement = async (jwt: string, dataspace: string, templateAgreementId: string, title: string): Promise<void> => {
    let data = {
      title,
    }

    await this.patchWithResponse<string>(`/dataspaces/${dataspace}/template-agreements/${templateAgreementId}`, jwt, data).then((res: any) => {
      if (res && res.value) {
        return
      } else {
        throw new Error('Failed request to edit template agreement');
      }
    });
  }


  editDataspace = async (jwt: string, dataspace: string, dataspaceName: string): Promise<void> => {
    let data = {
      dataspaceName
    }

    await this.patchWithResponse<string>(`/dataspaces/${dataspace}`, jwt, data).then((res: any) => {
      if (res && res.value) {
        return
      } else {
        throw new Error('Failed request to edit dataspace');
      }
    });
  }

  


  createNewServiceConnection = async (
    jwt: string,
    dataspace: string,
    serviceConnectionName: string,
    storageProvider: string,
    storageLocation: string,
    hostOrService: string,
    databaseOrContainer: string,
    accountOrUserOrId: string,
    secret: string,
    hostPort: string
  ): Promise<void> => {
    let data = {
      serviceConnectionName,
      storageProvider,
      storageLocation,
      hostOrService,
      databaseOrContainer,
      accountOrUserOrId,
      secret,
      hostPort,
    }

    await this.postWithResponse<string>(`/dataspaces/${dataspace}/settings/service-connections`, jwt, data).then((res: any) => {
      if (res && res.value) {
        return
      } else {
        throw new Error('Failed request to create new service connection');
      }
    });
  }

  editServiceConnection = async (jwt: string,
    dataspace: string,
    serviceConnectionId: string,
    serviceConnectionName: string,
    storageLocation: string,
    hostOrService: string,
    hostPort: string,
    databaseOrContainer: string,
    accountOrUserOrId: string,
    secret: string
  ): Promise<void> => {
    let data = {
      serviceConnectionId,
      serviceConnectionName,
      storageLocation,
      hostOrService,
      hostPort,
      databaseOrContainer,
      accountOrUserOrId,
      secret
    }

    await this.patchWithResponse<string>(`/dataspaces/${dataspace}/settings/service-connections/${serviceConnectionId}`, jwt, data).then((res: any) => {
      if (res && res.value) {
        return
      } else {
        throw new Error('Failed request to edit service connection');
      }
    });
  }

  deleteServiceConnection = async (jwt: string, dataspace: string, serviceConnectionId: string): Promise<void> => {

    await this.deleteWithResponse<string>(`/dataspaces/${dataspace}/settings/service-connections/${serviceConnectionId}`, jwt).then((res: any) => {
      if (res && res.value) {
        return
      } else {
        throw new Error('Failed request to delete service connection');
      }
    });
  }

  deleteOrganizationalUnit = async (jwt: string, organization: string): Promise<void> => { 

    await this.deleteWithResponse<string>(`/organizations/${organization}`, jwt).then((res: any) => {
      if (res && res.value) {
        return
      } else {
        throw new Error('Failed request to delete organiztional unit');
      }
    });
  }


  deleteCommon = async (jwt: string, dataspace: string, commonId: string, deleteServiceConnection: boolean): Promise<void> => {
    let data = {
      deleteServiceConnection
    }
    await this.deleteWithResponse<string>(`/dataspaces/${dataspace}/commons/${commonId}`, jwt, data).then((res: any) => {
      if (res && res.value) {
        return
      } else {
        throw new Error('Failed request to delete common');
      }
    });
  }

  

  upgradeSubscription = async (jwt: string, subscriptionId:string, subscriptionType:string): Promise<void> => {
     
    let data = {
      subscriptionType
    }
    await this.postWithResponse<string>(`/settings/subscriptions/${subscriptionId}/upgrade`, jwt, data).then((res: any) => {
      if (res && res.value) {
        return
      } else {
        throw new Error('Failed request to upgrade subscription');
      }
    });
  }


  deleteTemplateAgreement = async (jwt: string, dataspace: string, templateAgreementId: string): Promise<void> => {

    await this.deleteWithResponse<string>(`/dataspaces/${dataspace}/template-agreements/${templateAgreementId}`, jwt).then((res: any) => {
      if (res && res.value) {
        return
      } else {
        throw new Error('Failed request to delete template agreement');
      }
    });
  }

  deleteDataspace = async (jwt: string, dataspace: string): Promise<void> => {

    await this.deleteWithResponse<string>(`/dataspaces/${dataspace}`, jwt).then((res: any) => {
      if (res && res.value) {
        return
      } else {
        throw new Error('Failed request to delete dataspace');
      }
    });
  }

  completeSignup = async (jwt: string): Promise<void> => {
   
    return this.postWithResponse<string>(`/complete-signup`, jwt, '').then((res: any) => {
      if (res && res.value) {
        return
      }
      throw new Error('Failed request to complete signup');

    });
  }


  createNewTemplateAgreement = async (jwt: string, dataspaceId: string, payload: CreateTemplateAgreementPayload): Promise<void> => {
   
    await this.postWithResponse<string>(`/dataspaces/${dataspaceId}/template-agreements`, jwt, payload).then((res: any) => {
      if (res && res.value) {
        return
      } else {
        throw new Error('Failed request to create new template agreement');
      }
    });
  }

  renewAccessKey = async (jwt: string, dataspaceId: string): Promise<string> =>
  await this.postWithResponse<string>(`/dataspaces/${dataspaceId}/renew-access-key`, jwt).then((res: any) => {
    if (res && res.value) {
      return res.value as string;
    } else {
      throw new Error('Failed request to renew access key');
    }
  });

  getDataspaceSubscription = async (jwt: string, dataspaceId: string): Promise<Subscription> =>
    await this.simpleGet(`/dataspaces/${dataspaceId}/subscription`, jwt).then((res: any) => {
      if (res && res.value) {
        return res.value as Subscription;
      } else {
        throw new Error('Failed request to get subscription');
      }
    });


  getOrganizations = async (jwt: string): Promise<Array<Organization>> =>
  await this.simpleGet(`/my-org`, jwt).then((res: any) => {
    if (res && res.value) {
      return res.value as Array<Organization>;
    } else {
      throw new Error('Failed request to get organizations');
    }
  });


  createNewDataspace = async (jwt: string, subscription: string, dataspaceName: string): Promise<void> => {
     
    let data = {
      dataspaceName: dataspaceName,
      subscription: subscription
    }

    await this.postWithResponse<string>(`/dataspaces`, jwt, data).then((res: any) => {
      if (res && res.value) {
        return
      } else {
        throw new Error('Failed request to create new dataspace');
      }
    });
  }


  updateSettings = async (jwt: string, defaultDataspace: string): Promise<void> => {
     
    let data = {
      defaultDataspace: defaultDataspace,
    }

    await this.patchWithResponse<string>(`/me`, jwt, data).then((res: any) => {
      if (res && res.value) {
        return
      } else {
        throw new Error('Failed request to update settings');
      }
    });
  }

  changeOrganizationalUnit = async (jwt: string, organization: string): Promise<void> => {
    
    let data = {
      organization
    }

    await this.patchWithResponse<string>(`/my-org`, jwt, data).then((res: any) => {
      if (res && res.value) {
        return
      } else {
        throw new Error('Failed request to change organizational unit');
      }
    });
  }


  createNewCommon = async (jwt: string, dataspaceId: string, commonName: string, serviceConnection: string, templateAgreement: string): Promise<void> => {
 
    let data = {
      commonName,
      serviceConnection,
      templateAgreement
    }

    await this.postWithResponse<string>(`/dataspaces/${dataspaceId}/commons`, jwt, data).then((res: any) => {
      if (res && res.value) {
        return
      } else {
        throw new Error('Failed request to create new common');
      }
    });
  }

  createNewSubscription = async (jwt: string, subscriptionName: string, subscriptionType: string): Promise<void> => {
    
    let data = {
      subscriptionName,
      subscriptionType
    }

    await this.postWithResponse<string>(`/settings/subscriptions`, jwt, data).then((res: any) => {
      if (res && res.value) {
        return
      } else {
        throw new Error('Failed request to create new subscription');
      }
    });
  }

  exportToCommon = async (jwt: string, dataspaceId: string, commonName: string, query: string, templateAgreement: string): Promise<void> => {
 
    let data = {
      commonName,
      query,
      templateAgreement
    }

    await this.postWithResponse<string>(`/dataspaces/${dataspaceId}/commons`, jwt, data).then((res: any) => {
      if (res && res.value) {
        return
      } else {
        throw new Error('Failed request to create new common');
      }
    });
  }



  terminateAgreement = async (jwt: string, dataspaceId:string, agreementId: string): Promise<void> => {
   
   
    await this.postWithResponse<string>(`/dataspaces/${dataspaceId}/signed-agreements/${agreementId}/terminate`, jwt).then((res: any) => {
      if (res && res.value) {
        return
      } else {
        throw new Error('Failed request to agreement termination');
      }
    });
  }



  updateCommon = async (jwt: string, dataspace: string, commonId: string, tags: Array<string>): Promise<void> => {
  
    let data = {
      tags: tags
    }

    await this.patchWithResponse<string>(`/dataspaces/${dataspace}/commons/${commonId}`, jwt, data).then((res: any) => {
      if (res && res.value) {
        return
      } else {
        throw new Error('Failed request to update common');
      }
    });
  }

  updateCommonAcl = async (jwt: string, dataspace: string, commonId: string, agentId: string, allowRead: boolean, allowWrite: boolean, allowCopy: boolean, allowScript: boolean, allowExport: boolean): Promise<void> => {
  
    let data = {
      agent: agentId,
      allowRead: allowRead,
      allowWrite: allowWrite,
      allowCopy: allowCopy,
      allowScript: allowScript,
      allowExport: allowExport
    }

    await this.patchWithResponse<string>(`/dataspaces/${dataspace}/commons/${commonId}/acls`, jwt, data).then((res: any) => {
      if (res && res.value) {
        return
      } else {
        throw new Error('Failed request to update common Acl');
      }
    });
  }


  joinDataspace = async (jwt: string, dataspaceId: string, code: string): Promise<void> => {
    
    let data = {
      code
    }

    await this.postWithResponse<string>(`/dataspaces/${dataspaceId}/join`, jwt, data).then((res: any) => {
      if (res && res.value) {
        return
      } else {
        throw new Error('Failed request to send request to join dataspace');
      }
    });
  }


  verifyOrganization = async (jwt: string,
    organization:string,
    registryIdentifier: string,
    name: string,
    addressLine1: string,
    postalCode: string,
    city: string,
    country: string,
    website: string): Promise<void> => {
    
    let data = {
      organization,
      registryIdentifier,
      name,
      addressLine1,
      postalCode,
      city,
      country,
      website
    }

    await this.postWithResponse<string>(`/verify-organization`, jwt, data).then((res: any) => {
      if (res && res.value) {
        return
      } else {
        throw new Error('Failed request to send request to verify organization');
      }
    });
  }


  assessOrganization = async (jwt: string, organization:string, maturityUrl: string): Promise<void> => {
   
    let data = {
      organization,
      maturityUrl
    }

    await this.postWithResponse<string>(`/assess-organization`, jwt, data).then((res: any) => {
      if (res && res.value) {
        return
      } else {
        throw new Error('Failed request to send request to assess organization');
      }
    });
  }

  getInvitationStatus = async (jwt: string, dataspaceId: string, code: string): Promise<InvitationStatus> => {

    let data = {
      code
    }

    return await this.postWithResponse<InvitationStatus>(`/dataspaces/${dataspaceId}/invitation-status`, jwt, data).then((res: any) => {
      if (res && res.value) {
        return res.value as InvitationStatus
      } else {
        throw new Error('Failed request to get invitation status');
      }
    });

  }



  joinCommon = async (jwt: string, dataspaceId: string, commonId: string): Promise<void> => {
    
    let data = {
      accepted: true
    }

    await this.postWithResponse<string>(`/dataspaces/${dataspaceId}/commons/${commonId}/join`, jwt, data).then((res: any) => {
      if (res && res.value) {
        return
      } else {
        throw new Error('Failed request to join common');
      }
    });
  }



  registerPayment = async (jwt: string, sessionId: string): Promise<void> =>
    await this.postWithResponse<string>(`/register-payment?session=${sessionId}`, jwt).then((res: any) => {
      if (res && res.value) {
        return
      } else {
        throw new Error('Failed request to register payment');
      }
    });

  getCheckoutSession = async (jwt: string, items: any): Promise<GetCheckoutSessionResponse> => {
    return this.postWithResponse<GetCheckoutSessionResponse>(`/create-checkout-session`, jwt, items);
  }

  registerNewUser = async (jwt: string, email: string, fullName: string): Promise<void> => {

    let data = {
      fullName: fullName,
      email: email
    }

    await this.postWithResponse<string>(`/register-user`, jwt, data).then((res: any) => {
      if (res && res.value) {
        return
      } else {
        throw new Error('Failed request to register new user');
      }
    });
  }




  getUploadSasInfo = async (jwt: string): Promise<GetSasInfoResponse> => {
    return this.simpleGet<GetSasInfoResponse>(`/storage/upload-sas`, jwt);
  }


}

export default new TrustRelayService();
