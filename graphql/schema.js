import {buildSchema} from 'graphql'

const schema = buildSchema(`
    type Query {
    test: String
  }
`)

export default schema;