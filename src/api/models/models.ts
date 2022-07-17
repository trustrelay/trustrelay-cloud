import internal from "stream";

export interface Membership {
  agent: string;
  dataspace: string;
  dataspaceName: string;
  timestamp: string;
}

export interface Dataspace {
  id: string;
  name: string;
  members: number;
  maxMembers:number;
  timestamp: string;
  subscription: string;
  jdbc:string;
  jsonRpcUrl:string;
  accessKey:string;
  invitationCode:string;
  isInvitationEnabled:boolean;
}

export interface DataspaceSummary {
  id: string;
  name: string;
  members: number;
  commons: number; 
  admin: string;
  timestamp: string;    
}

export interface InvitationStatus {
  invitationType:string;
  alreadyMember:boolean; 
  isValidCode:boolean;
}

export interface QueryHistoryEntry {
  id: string;
  timestamp: string;
  query: string;
}


export interface AuditLogEntry { 
  timestamp: string;
  dataspace: string;
  category:string;
  activityType:string;
  target:string;
  status:string;
  statusReason:string;
  userAgent:string;
}

export interface TrustRelayAccount {
  id: string;
  email: string;
  defaultDataspace: string;
  theme:string;
  organization:string;
  organizationName:string;
  timestamp: string; 
}

export interface EventAggregation {
  id: string;
  name: string;
  description: string;
}

export interface UserSubscription {
  id: string;
  wallets: number;
  type: string;
  timestamp: string;
}

export interface Agent {
  id: string;
  dataspace: string;
  dataspaceName: string;
  subscription: string;
  name: string;
  user: string;
  location: string;
  organization:string;
  organizationName: string;
  organizationDomain:string;
  timestamp: string;
}

export interface DataspaceInfo {
  id: string;
  name: string; 
  timestamp: string;
  admin1: string;
  subscription: string;
}

export interface Organization {
  id:string;
  name:string;
  registry:string;
  admin:string;
  addressLine1:string;
  postalCode:string;
  city:string;
  country:string;
  website:string;
  isVerified:boolean;
  maturityUrl:string;
  scoreOverall:number;
  scorePurpose:number;
  scorePractice:number;
  scorePeople:number;
  isAssessed:boolean;
}

export interface Subscription {
  id: string;
  name:string;
  admin1: string;
  admin1Email: string;
  admin2: string;
  admin2Email: string;
  procurement: string;
  procurementEmail: string;
  maxDataspaces: number;
  maxCommons: number;
  maxMembers: number;
  currentDataspaces: number;
  currentMembers: number;
  currentCommons: number;
  subscriptionType:string;
  expires:string;
  isEnabled:boolean;
  timestamp: string;
}

export interface SignedAgreement {
  id: string;
  dataspace: string;
  dataspaceName:string;
  agreement: string;
  agreementType: string;
  title: string;
  url: string;
  common: string;
  commonName: string;
  user: string;
  accepted: boolean;
  timestamp: string;
  tags: Array<string>;
}

export interface Usage{
  data: Array<Array<number>>;
  keys:Array<string>;
}

export interface TemplateAgreement {
  id: string;
  title: string;
  url: string;
  purpose: string; 
  dataAssets: string; 
  rightsAndResponsibilities: string; 
  permissions: string; 
  durationType: string;
  durationPeriod: string;
  durationFrom: Date;
  durationUntil: Date;  
  frequencyOfUpdates: string; 
  dataRetentionPeriod: string; 
  terminationNoticePeriod: string; 
  jurisdiction: string; 
  timestamp: string;
  agent:string;
  organization:string;
  organizationName:string;
  organizationDomain:string;
  isLocked:boolean;
}


export interface TemplateAgreementSummary {
  id: string;
  title: string;
  url: string;
  dataspace: string;
  durationType: string;
  durationPeriod: string;
  durationFrom: Date;
  durationUntil: Date;
  jurisdiction: string;
  permissions: Array<string>;
  timestamp: string;
}

export interface SignedAgreementSummary {
  id: string;
  title: string;
  common: string;
  commonName: string;
  url: string;
  dataspace: string;
  durationFrom: Date;
  durationUntil: Date;
  jurisdiction: string;
  permissions: Array<string>;
  tags: Array<string>;
  timestamp: string;
}

export interface CommonAgreementSummary {
  agreement:string;
  email: string; 
  isTerminated:boolean;
  terminatedBy:string;
  timestamp: string;
}


export interface Common {
  id: string;
  name: string;
  userAgent: string;
  adminAgent: string;
  dataOwner: string;
  dataExpert: string;
  accessValidFrom: string;
  accessValidUntil: string;
  allowRead: boolean;
  allowWrite: boolean;
  allowCopy: boolean;
  allowScript: boolean;
  allowExport: boolean;
  sourceType:string;
  serviceConnectionId: string;
  serviceConnectionName:string;
  sourceQuery:string;
  storageLocation: string; 
  hasAccepted: boolean;
  agreementTemplate: string;
  signedAgreement:string;
  dataspace: string;
  createdBy: string;
  timestamp: string; 
  tags: Array<string>;
  organization:string;
  organizationDomain:string;
  agreementIsTerminated:boolean;
  agreementTimestamp:string;
}

 
export interface ServiceConnection {
  id: string;
  name: string;
  user: string;
  storageProvider: string;
  storageLocation: string;
 
  hostOrService:string;
  hostPort:string;
  databaseOrContainer:string;
  accountOrUserOrId:string;
  secretPreview:string;

  dataspace: string;
  timestamp: string;
  up:boolean;
  lastChecked:string;
  isLocked:boolean;
}

export interface Dispute {
  id: string;
  subject: string;
  description: string;
  dataspace: string;
  by: string;
  to: string;
  timestamp: string;
}

export interface Task {
  id: string;
  inputSource: string;
  targetCommon: string;
  created: string;
  started: string;
  completed: string;
  type: string;
  status: string;
  timestamp: string;
}

export interface Ping {
  id: string; 
  status: string;
  timestamp: string;
}

export interface UserTask {
  id: string;
  name: string; 
  status: string;
  assignee: string;
  assignedBy: string;
  timestamp: string;
}


export interface Issue {
  id: string;
  title: string; 
  status: string;
  assignee: string;
  reportedBy: string;
  timestamp: string;
}


export interface Scan {
  id: string;
  scanType: string;
  targetSource: string;
  created: string;
  started: string;
  completed: string;
  status: string;
  timestamp: string;
}

export interface DailyCount {
  day: string;
  value: number;
}

export interface DataProvenanceNode {
  id: string;
}
export interface DataProvenanceLink {
  source: string;
  target: string;
  value: string;
}

export interface DataProvenanceSet {
  nodes: Array<DataProvenanceNode>;
  links: Array<DataProvenanceLink>;
}

 

export interface Column {
  name: string;
  type: string;
  tags: string[];
}


export interface Acl {
  id: string;
  common: string;
  commonName: string;
  agent: string;
  agentName: string;
  allowRead: boolean;
  allowWrite: boolean;
  allowCopy: boolean;
  allowScript: boolean;
  allowExport: boolean;
  validFrom: string;
  validUntil: string;
  timestamp: string;
}

export interface DisputeMessage {
  id: string;
  dispute: string;
  text: string;
  by: string;
  timestamp: string;
}


export interface ApiLog {
  id: string;
  statusCode: number;
  requestUrl: string;
  wallet: string;
  timestamp: string;
}

export interface PieChartEntry {
  id: string;
  label: string;
  value: number;
}

export interface DataPoint {
  x: string;
  y: number;
}

export interface LineChartEntry {
  id: string
  data: Array<DataPoint>
}

export interface AppNotification {
  id: string;
  title: string;
  body: string;
  type: string;
  ack: boolean;
  timestamp: string;
}

export interface GetCheckoutSessionResponse {
  value: string
}

export interface GetSasInfoResponse {
  value: SasInfo;
}

export interface GetAccountResponse {
  value: TrustRelayAccount;
}


export interface SasInfo {
  account: string;
  sas: string;
  blobEndpoint: string;
  queueEndpoint: string;
  tableEndpoint: string;
  fileEndpoint: string;
  id: string;
  container: string;
  path: string;
}

export interface DataQuery {
  until: string;
  continuationNextPartitionKey: string;
  continuationNextRowKey: string;
}

export interface QueryHistoryRequest {
  continuationNextPartitionKey: string;
  continuationNextRowKey: string;
}

export interface AuditLogsRequest {
  continuationNextPartitionKey: string;
  continuationNextRowKey: string;
}

export interface DataRow {
  id: string;
  modified: string;
  payload: string;
}
export interface QueryResponse {
  value: Array<DataRow>;
  continuationNextPartitionKey: string;
  continuationNextRowKey: string;
}

export interface QueryHistoryResponse {
  value: Array<QueryHistoryEntry>;
  continuationNextPartitionKey: string;
  continuationNextRowKey: string;
}

export interface AuditLogsResponse {
  value: Array<AuditLogEntry>;
  continuationNextPartitionKey: string;
  continuationNextRowKey: string;
}


export interface DrillQueryResponse {
  id: string;
  columns: Array<string>;
  metadata: Array<string>;
  attemptedAutoLimit: number;
  rows: Array<any>;
  queryState: string;
}

export interface CreateTemplateAgreementPayload {
  //step 1
  title: string,
  purpose: string; 
  //step 2
  dataAssets: string;  
  rightsAndResponsibilities: string;  
  //step 4 
  permissions: Array<string>;  
  //step 5
  durationType: string;
  durationPeriod: string;
  durationFrom: Date;
  durationUntil: Date;
  frequencyOfUpdates: string;
  dataRetentionPeriod: string;
  terminationNoticePeriod: string; 
  //step 6
  jurisdiction:  string;  
}

export interface DashboardStats {
  tasks: number;
  issues: number;
  commons: number;
  members:number;
  failingConnections: number;
}

export interface GeoScores{
  maxValue:number;
  scores: Array<GeoScore>
}

export interface GeoScore{
  id:string;
  value?:number;
}

export interface Invoice{
  id:string;
  amount:string;
  currency:string;
  timestamp:string;
}