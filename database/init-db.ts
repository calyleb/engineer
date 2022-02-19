import { Pool, QueryResult } from 'pg'
import * as queries from './queries'

const dbLogger = (err: Error, res: QueryResult) => {
  if (err) console.log(err.stack)
}

const initDb = (pool: Pool) => {
  pool.connect((err, client, done) => {
    if (err) throw err

    client.query(queries.CLEANUP)

    client.query(queries.CREATE_SCHEMA)

    client.query(queries.HANDLE_GRANTS)

    // client.query(queries.CREATE_SCHEMA, dbLogger)

    client.query(queries.CREATE_USERS_TABLE, dbLogger)

    client.query(queries.CREATE_ORDERS_TABLE, dbLogger)

    client.query(queries.CREATE_PRODUCTS_TABLE, dbLogger)

    client.query(queries.CREATE_PRODUCT_REVIEW_TABLE, dbLogger)

    client.query(queries.CREATE_CATEGORIES_TABLE, dbLogger)

    client.query(queries.CREATE_CATEGORY_PRODUCT_TABLE, dbLogger)

    client.query(queries.CREATE_SHOPPING_CART_TABLE, dbLogger)

    client.query(queries.CREATE_SHOPPING_CART_ITEM_TABLE, dbLogger)

    client.query(queries.CREATE_RETURNS_TABLE, dbLogger)

    client.query(queries.CREATE_COMPLAINTS_TABLE, dbLogger)

    client.query(queries.CREATE_SUPPLIERS_TABLE, dbLogger)

    client.query(queries.CREATE_SUPPLIES_DATA_TABLE, dbLogger)

    //client.query(queries.INIT_ADMINS, dbLogger)

  


    done()
  })
}

export default initDb
