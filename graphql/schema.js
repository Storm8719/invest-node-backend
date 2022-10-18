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
  type Query {
    test: String,
    getSandboxAccounts: Accounts!,
    getRealAccounts: Accounts!,
  }
  
`)

export default schema;