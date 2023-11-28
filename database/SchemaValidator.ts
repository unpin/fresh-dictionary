type DataType =
  | typeof String
  | typeof Number
  | typeof Boolean
  | typeof Date;

interface FieldSchema {
  required?: boolean;
  type?: DataType | DataType[] | Schema;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  nestedSchema?: Schema;
  arraySchema?: Schema;
  isArray?: boolean;
}

export interface Schema {
  [k: string]: FieldSchema;
}

export class ValidationException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationException";
  }
}

export class SchemaValidator {
  schema: Schema;

  constructor(schema: Schema) {
    this.schema = schema;
  }

  validate(obj: Record<string, unknown>): void {
    for (const fieldName in this.schema) {
      const fieldValidator = this.schema[fieldName];
      const fieldValue = obj[fieldName];

      if (fieldValidator.required && fieldValue === undefined) {
        throw new ValidationException(`Field "${fieldName}" is required.`);
      }

      if (fieldValue === undefined) continue;

      if (Array.isArray(fieldValidator.type)) {
        if (
          !Array.isArray(fieldValue) ||
          !this.validateArrayType(fieldValue, fieldValidator.type)
        ) {
          throw new ValidationException(
            `Field "${fieldName}" must be an array of "${
              this.arrayTypeToString(
                fieldValidator.type,
              )
            }".`,
          );
        }
      } else if (
        fieldValidator.type &&
        !this.validateType(fieldValue, fieldValidator.type)
      ) {
        throw new ValidationException(
          `Field "${fieldName}" must be of type "${
            this.dataTypeToString(fieldValidator.type)
          }".`,
        );
      }

      if (
        typeof fieldValue === "string" && (fieldValidator.minLength &&
          fieldValue.length < fieldValidator.minLength)
      ) {
        throw new ValidationException(
          `Field "${fieldName}" must be at least ${fieldValidator.minLength} characters long.`,
        );
      }

      if (
        typeof fieldValue === "string" &&
        (fieldValidator.maxLength &&
          fieldValue.length > fieldValidator.maxLength)
      ) {
        throw new ValidationException(
          `Field "${fieldName}" must be less than ${fieldValidator.maxLength} characters long.`,
        );
      }

      if (
        typeof fieldValue === "number" &&
        ((fieldValidator.min !== undefined &&
          fieldValue < fieldValidator.min) ||
          (fieldValidator.max !== undefined &&
            fieldValue > fieldValidator.max))
      ) {
        throw new ValidationException(
          `Field "${fieldName}" must be between ${fieldValidator.min} and ${fieldValidator.max}.`,
        );
      }

      if (fieldValidator.nestedSchema) {
        if (
          (fieldValidator.nestedSchema as Schema).required &&
          (typeof fieldValue !== "object" || Array.isArray(fieldValue))
        ) {
          throw new ValidationException(
            `Field "${fieldName}" must be an embedded document.`,
          );
        }

        const nestedValidator = new SchemaValidator(
          fieldValidator.nestedSchema,
        );
        nestedValidator.validate(fieldValue as Record<string, unknown>);
      }
    }
  }

  private validateType(
    value: unknown,
    requiredType: DataType | DataType[],
  ): boolean {
    if (Array.isArray(requiredType)) {
      return Array.isArray(value) &&
        value.every((element) => this.validateType(element, requiredType));
    } else {
      return requiredType === Date
        ? value instanceof Date
        // deno-lint-ignore valid-typeof
        : typeof value === requiredType.name.toLowerCase();
    }
  }

  private validateArrayType(
    value: unknown[],
    requiredType: DataType[],
  ): boolean {
    return requiredType.length === 0 ||
      value.every((element) => this.validateType(element, requiredType[0]));
  }

  private dataTypeToString(dataType: DataType): string {
    return Array.isArray(dataType)
      ? `${this.arrayTypeToString(dataType)}[]`
      : dataType.name;
  }

  private arrayTypeToString(dataType: DataType[]): string {
    return dataType.length > 0 ? this.dataTypeToString(dataType[0]) : "unknown";
  }
}
