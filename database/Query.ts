import {
  AggregateOptions,
  AggregatePipeline,
  CountOptions,
  Database,
  DeleteOptions,
  Document,
  Filter,
  FindOptions,
  InsertOptions,
  UpdateFilter,
  UpdateOptions,
} from "mongo";
import { conn } from "./connection.ts";
import { Schema, SchemaValidator } from "./SchemaValidator.ts";

interface SchemaOptions {
  createIndex?: boolean;
  indexFields?: string[];
}

export class Query<T> {
  private conn: Database;
  private schemaName: string;
  private schema: Schema;
  private options: SchemaOptions;
  private schemaValidator: SchemaValidator;

  protected constructor(
    schemaName: string,
    schema: Record<string, Schema>,
    options: SchemaOptions = {},
  ) {
    this.schemaName = schemaName;
    this.schema = schema;
    this.options = options;
    this.conn = conn;
    this.schemaValidator = new SchemaValidator(this.schema);
  }

  async create(doc: Partial<T>, options: InsertOptions = {}) {
    // TODO this.validate(doc);
    return await this.getCollection().insertOne(doc, options);
  }

  async findOne(filter: Filter<Document>, options?: FindOptions) {
    return await this.getCollection().findOne(filter, options);
  }

  async findMany(filter: Filter<Document>, options?: FindOptions) {
    return await this.getCollection().find(filter, options)
      .toArray();
  }

  async deleteOne(filter: Filter<Document>, options?: DeleteOptions) {
    return await this.getCollection().deleteOne(
      filter,
      options,
    );
  }

  async updateOne(
    filter: Filter<Document>,
    update: UpdateFilter<Document>,
    options?: UpdateOptions,
  ) {
    return await this.getCollection().updateOne(
      filter,
      update,
      options,
    );
  }

  async countDocuments(filter: Filter<Document>, options?: CountOptions) {
    return await this.getCollection().countDocuments(filter, options);
  }

  aggregate(pipeline: AggregatePipeline<T>[], options?: AggregateOptions) {
    return this.getCollection().aggregate(pipeline, options);
  }

  private getCollection() {
    return this.conn.collection(this.schemaName);
  }

  validate(obj: Record<string, unknown>) {
    this.schemaValidator.validate(obj);
  }

  static createModel<V>(
    schemaName: string,
    schema: Document,
  ): Query<V> {
    return new Query<V>(schemaName, schema);
  }
}
