import {buildSchema} from 'graphql'

const schema = buildSchema(`
  type Accounts{
    accounts: [Account!]!
  }
  type Account{
    accessLevel: Int,
    id: String,
    name: String,
    openedDate: String,
    status: Int,
    type: Int,
  }

type Nominal { currency: String units: Int nano: Int }

type ShareCandleOpts { units: Int nano: Int }
  
type Share{
  figi: String
  ticker: String
  classCode: String
  isin: String
  lot: Int
  currency: String
  shortEnabledFlag: Boolean
  name: String
  exchange: String
  ipoDate: String
  issueSize: Int
  countryOfRisk: String
  countryOfRiskName: String
  sector: String
  issueSizePlan: Int
  tradingStatus: Int
  otcFlag: Boolean
  buyAvailableFlag: Boolean
  sellAvailableFlag: Boolean
  divYieldFlag: Boolean
  shareType: Int
  apiTradeAvailableFlag: Boolean
  uid: String
  realExchange: Int
  positionUid: String
  forIisFlag: Boolean
  first1minCandleDate: String
  first1dayCandleDate: String
  minPriceIncrement: ShareCandleOpts
  nominal: Nominal
  dshortMin: ShareCandleOpts
  dlongMin: ShareCandleOpts
  dshort: ShareCandleOpts
  dlong: ShareCandleOpts
  kshort: ShareCandleOpts
  klong: ShareCandleOpts 
}
  
  type Query {
    test: String,
    getSandboxAccounts: Accounts!,
    getRealAccounts: Accounts!,
    getShares: [Share!]!
    
  }
  
  type Mutation {
    openNewSandboxAccount: String!
  }
  
`)

export default schema;