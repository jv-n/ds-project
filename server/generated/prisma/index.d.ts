
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Empresa
 * 
 */
export type Empresa = $Result.DefaultSelection<Prisma.$EmpresaPayload>
/**
 * Model ODS
 * 
 */
export type ODS = $Result.DefaultSelection<Prisma.$ODSPayload>
/**
 * Model EmpresaODS
 * 
 */
export type EmpresaODS = $Result.DefaultSelection<Prisma.$EmpresaODSPayload>
/**
 * Model Acao
 * 
 */
export type Acao = $Result.DefaultSelection<Prisma.$AcaoPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Empresas
 * const empresas = await prisma.empresa.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Empresas
   * const empresas = await prisma.empresa.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.empresa`: Exposes CRUD operations for the **Empresa** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Empresas
    * const empresas = await prisma.empresa.findMany()
    * ```
    */
  get empresa(): Prisma.EmpresaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.oDS`: Exposes CRUD operations for the **ODS** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ODS
    * const oDS = await prisma.oDS.findMany()
    * ```
    */
  get oDS(): Prisma.ODSDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.empresaODS`: Exposes CRUD operations for the **EmpresaODS** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EmpresaODS
    * const empresaODS = await prisma.empresaODS.findMany()
    * ```
    */
  get empresaODS(): Prisma.EmpresaODSDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.acao`: Exposes CRUD operations for the **Acao** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Acaos
    * const acaos = await prisma.acao.findMany()
    * ```
    */
  get acao(): Prisma.AcaoDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.11.1
   * Query Engine version: f40f79ec31188888a2e33acda0ecc8fd10a853a9
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Empresa: 'Empresa',
    ODS: 'ODS',
    EmpresaODS: 'EmpresaODS',
    Acao: 'Acao'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "empresa" | "oDS" | "empresaODS" | "acao"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Empresa: {
        payload: Prisma.$EmpresaPayload<ExtArgs>
        fields: Prisma.EmpresaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EmpresaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmpresaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EmpresaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmpresaPayload>
          }
          findFirst: {
            args: Prisma.EmpresaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmpresaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EmpresaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmpresaPayload>
          }
          findMany: {
            args: Prisma.EmpresaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmpresaPayload>[]
          }
          create: {
            args: Prisma.EmpresaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmpresaPayload>
          }
          createMany: {
            args: Prisma.EmpresaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EmpresaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmpresaPayload>[]
          }
          delete: {
            args: Prisma.EmpresaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmpresaPayload>
          }
          update: {
            args: Prisma.EmpresaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmpresaPayload>
          }
          deleteMany: {
            args: Prisma.EmpresaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EmpresaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EmpresaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmpresaPayload>[]
          }
          upsert: {
            args: Prisma.EmpresaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmpresaPayload>
          }
          aggregate: {
            args: Prisma.EmpresaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEmpresa>
          }
          groupBy: {
            args: Prisma.EmpresaGroupByArgs<ExtArgs>
            result: $Utils.Optional<EmpresaGroupByOutputType>[]
          }
          count: {
            args: Prisma.EmpresaCountArgs<ExtArgs>
            result: $Utils.Optional<EmpresaCountAggregateOutputType> | number
          }
        }
      }
      ODS: {
        payload: Prisma.$ODSPayload<ExtArgs>
        fields: Prisma.ODSFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ODSFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ODSPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ODSFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ODSPayload>
          }
          findFirst: {
            args: Prisma.ODSFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ODSPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ODSFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ODSPayload>
          }
          findMany: {
            args: Prisma.ODSFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ODSPayload>[]
          }
          create: {
            args: Prisma.ODSCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ODSPayload>
          }
          createMany: {
            args: Prisma.ODSCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ODSCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ODSPayload>[]
          }
          delete: {
            args: Prisma.ODSDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ODSPayload>
          }
          update: {
            args: Prisma.ODSUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ODSPayload>
          }
          deleteMany: {
            args: Prisma.ODSDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ODSUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ODSUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ODSPayload>[]
          }
          upsert: {
            args: Prisma.ODSUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ODSPayload>
          }
          aggregate: {
            args: Prisma.ODSAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateODS>
          }
          groupBy: {
            args: Prisma.ODSGroupByArgs<ExtArgs>
            result: $Utils.Optional<ODSGroupByOutputType>[]
          }
          count: {
            args: Prisma.ODSCountArgs<ExtArgs>
            result: $Utils.Optional<ODSCountAggregateOutputType> | number
          }
        }
      }
      EmpresaODS: {
        payload: Prisma.$EmpresaODSPayload<ExtArgs>
        fields: Prisma.EmpresaODSFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EmpresaODSFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmpresaODSPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EmpresaODSFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmpresaODSPayload>
          }
          findFirst: {
            args: Prisma.EmpresaODSFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmpresaODSPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EmpresaODSFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmpresaODSPayload>
          }
          findMany: {
            args: Prisma.EmpresaODSFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmpresaODSPayload>[]
          }
          create: {
            args: Prisma.EmpresaODSCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmpresaODSPayload>
          }
          createMany: {
            args: Prisma.EmpresaODSCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EmpresaODSCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmpresaODSPayload>[]
          }
          delete: {
            args: Prisma.EmpresaODSDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmpresaODSPayload>
          }
          update: {
            args: Prisma.EmpresaODSUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmpresaODSPayload>
          }
          deleteMany: {
            args: Prisma.EmpresaODSDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EmpresaODSUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EmpresaODSUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmpresaODSPayload>[]
          }
          upsert: {
            args: Prisma.EmpresaODSUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmpresaODSPayload>
          }
          aggregate: {
            args: Prisma.EmpresaODSAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEmpresaODS>
          }
          groupBy: {
            args: Prisma.EmpresaODSGroupByArgs<ExtArgs>
            result: $Utils.Optional<EmpresaODSGroupByOutputType>[]
          }
          count: {
            args: Prisma.EmpresaODSCountArgs<ExtArgs>
            result: $Utils.Optional<EmpresaODSCountAggregateOutputType> | number
          }
        }
      }
      Acao: {
        payload: Prisma.$AcaoPayload<ExtArgs>
        fields: Prisma.AcaoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AcaoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcaoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AcaoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcaoPayload>
          }
          findFirst: {
            args: Prisma.AcaoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcaoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AcaoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcaoPayload>
          }
          findMany: {
            args: Prisma.AcaoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcaoPayload>[]
          }
          create: {
            args: Prisma.AcaoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcaoPayload>
          }
          createMany: {
            args: Prisma.AcaoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AcaoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcaoPayload>[]
          }
          delete: {
            args: Prisma.AcaoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcaoPayload>
          }
          update: {
            args: Prisma.AcaoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcaoPayload>
          }
          deleteMany: {
            args: Prisma.AcaoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AcaoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AcaoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcaoPayload>[]
          }
          upsert: {
            args: Prisma.AcaoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcaoPayload>
          }
          aggregate: {
            args: Prisma.AcaoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAcao>
          }
          groupBy: {
            args: Prisma.AcaoGroupByArgs<ExtArgs>
            result: $Utils.Optional<AcaoGroupByOutputType>[]
          }
          count: {
            args: Prisma.AcaoCountArgs<ExtArgs>
            result: $Utils.Optional<AcaoCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    empresa?: EmpresaOmit
    oDS?: ODSOmit
    empresaODS?: EmpresaODSOmit
    acao?: AcaoOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type EmpresaCountOutputType
   */

  export type EmpresaCountOutputType = {
    acoes: number
    ods: number
  }

  export type EmpresaCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    acoes?: boolean | EmpresaCountOutputTypeCountAcoesArgs
    ods?: boolean | EmpresaCountOutputTypeCountOdsArgs
  }

  // Custom InputTypes
  /**
   * EmpresaCountOutputType without action
   */
  export type EmpresaCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmpresaCountOutputType
     */
    select?: EmpresaCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EmpresaCountOutputType without action
   */
  export type EmpresaCountOutputTypeCountAcoesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AcaoWhereInput
  }

  /**
   * EmpresaCountOutputType without action
   */
  export type EmpresaCountOutputTypeCountOdsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmpresaODSWhereInput
  }


  /**
   * Count Type ODSCountOutputType
   */

  export type ODSCountOutputType = {
    empresas: number
  }

  export type ODSCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    empresas?: boolean | ODSCountOutputTypeCountEmpresasArgs
  }

  // Custom InputTypes
  /**
   * ODSCountOutputType without action
   */
  export type ODSCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ODSCountOutputType
     */
    select?: ODSCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ODSCountOutputType without action
   */
  export type ODSCountOutputTypeCountEmpresasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmpresaODSWhereInput
  }


  /**
   * Count Type AcaoCountOutputType
   */

  export type AcaoCountOutputType = {
    empresas: number
  }

  export type AcaoCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    empresas?: boolean | AcaoCountOutputTypeCountEmpresasArgs
  }

  // Custom InputTypes
  /**
   * AcaoCountOutputType without action
   */
  export type AcaoCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcaoCountOutputType
     */
    select?: AcaoCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AcaoCountOutputType without action
   */
  export type AcaoCountOutputTypeCountEmpresasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmpresaWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Empresa
   */

  export type AggregateEmpresa = {
    _count: EmpresaCountAggregateOutputType | null
    _avg: EmpresaAvgAggregateOutputType | null
    _sum: EmpresaSumAggregateOutputType | null
    _min: EmpresaMinAggregateOutputType | null
    _max: EmpresaMaxAggregateOutputType | null
  }

  export type EmpresaAvgAggregateOutputType = {
    id: number | null
    colaboradores: number | null
    pontos: number | null
  }

  export type EmpresaSumAggregateOutputType = {
    id: number | null
    colaboradores: number | null
    pontos: number | null
  }

  export type EmpresaMinAggregateOutputType = {
    id: number | null
    nome: string | null
    cnpj: string | null
    email: string | null
    senha: string | null
    colaboradores: number | null
    pontos: number | null
    selo: string | null
  }

  export type EmpresaMaxAggregateOutputType = {
    id: number | null
    nome: string | null
    cnpj: string | null
    email: string | null
    senha: string | null
    colaboradores: number | null
    pontos: number | null
    selo: string | null
  }

  export type EmpresaCountAggregateOutputType = {
    id: number
    nome: number
    cnpj: number
    email: number
    senha: number
    colaboradores: number
    pontos: number
    selo: number
    _all: number
  }


  export type EmpresaAvgAggregateInputType = {
    id?: true
    colaboradores?: true
    pontos?: true
  }

  export type EmpresaSumAggregateInputType = {
    id?: true
    colaboradores?: true
    pontos?: true
  }

  export type EmpresaMinAggregateInputType = {
    id?: true
    nome?: true
    cnpj?: true
    email?: true
    senha?: true
    colaboradores?: true
    pontos?: true
    selo?: true
  }

  export type EmpresaMaxAggregateInputType = {
    id?: true
    nome?: true
    cnpj?: true
    email?: true
    senha?: true
    colaboradores?: true
    pontos?: true
    selo?: true
  }

  export type EmpresaCountAggregateInputType = {
    id?: true
    nome?: true
    cnpj?: true
    email?: true
    senha?: true
    colaboradores?: true
    pontos?: true
    selo?: true
    _all?: true
  }

  export type EmpresaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Empresa to aggregate.
     */
    where?: EmpresaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Empresas to fetch.
     */
    orderBy?: EmpresaOrderByWithRelationInput | EmpresaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EmpresaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Empresas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Empresas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Empresas
    **/
    _count?: true | EmpresaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EmpresaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EmpresaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmpresaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmpresaMaxAggregateInputType
  }

  export type GetEmpresaAggregateType<T extends EmpresaAggregateArgs> = {
        [P in keyof T & keyof AggregateEmpresa]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmpresa[P]>
      : GetScalarType<T[P], AggregateEmpresa[P]>
  }




  export type EmpresaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmpresaWhereInput
    orderBy?: EmpresaOrderByWithAggregationInput | EmpresaOrderByWithAggregationInput[]
    by: EmpresaScalarFieldEnum[] | EmpresaScalarFieldEnum
    having?: EmpresaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmpresaCountAggregateInputType | true
    _avg?: EmpresaAvgAggregateInputType
    _sum?: EmpresaSumAggregateInputType
    _min?: EmpresaMinAggregateInputType
    _max?: EmpresaMaxAggregateInputType
  }

  export type EmpresaGroupByOutputType = {
    id: number
    nome: string | null
    cnpj: string | null
    email: string | null
    senha: string | null
    colaboradores: number | null
    pontos: number | null
    selo: string | null
    _count: EmpresaCountAggregateOutputType | null
    _avg: EmpresaAvgAggregateOutputType | null
    _sum: EmpresaSumAggregateOutputType | null
    _min: EmpresaMinAggregateOutputType | null
    _max: EmpresaMaxAggregateOutputType | null
  }

  type GetEmpresaGroupByPayload<T extends EmpresaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmpresaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmpresaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmpresaGroupByOutputType[P]>
            : GetScalarType<T[P], EmpresaGroupByOutputType[P]>
        }
      >
    >


  export type EmpresaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    cnpj?: boolean
    email?: boolean
    senha?: boolean
    colaboradores?: boolean
    pontos?: boolean
    selo?: boolean
    acoes?: boolean | Empresa$acoesArgs<ExtArgs>
    ods?: boolean | Empresa$odsArgs<ExtArgs>
    _count?: boolean | EmpresaCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["empresa"]>

  export type EmpresaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    cnpj?: boolean
    email?: boolean
    senha?: boolean
    colaboradores?: boolean
    pontos?: boolean
    selo?: boolean
  }, ExtArgs["result"]["empresa"]>

  export type EmpresaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    cnpj?: boolean
    email?: boolean
    senha?: boolean
    colaboradores?: boolean
    pontos?: boolean
    selo?: boolean
  }, ExtArgs["result"]["empresa"]>

  export type EmpresaSelectScalar = {
    id?: boolean
    nome?: boolean
    cnpj?: boolean
    email?: boolean
    senha?: boolean
    colaboradores?: boolean
    pontos?: boolean
    selo?: boolean
  }

  export type EmpresaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nome" | "cnpj" | "email" | "senha" | "colaboradores" | "pontos" | "selo", ExtArgs["result"]["empresa"]>
  export type EmpresaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    acoes?: boolean | Empresa$acoesArgs<ExtArgs>
    ods?: boolean | Empresa$odsArgs<ExtArgs>
    _count?: boolean | EmpresaCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type EmpresaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type EmpresaIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $EmpresaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Empresa"
    objects: {
      acoes: Prisma.$AcaoPayload<ExtArgs>[]
      ods: Prisma.$EmpresaODSPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      nome: string | null
      cnpj: string | null
      email: string | null
      senha: string | null
      colaboradores: number | null
      pontos: number | null
      selo: string | null
    }, ExtArgs["result"]["empresa"]>
    composites: {}
  }

  type EmpresaGetPayload<S extends boolean | null | undefined | EmpresaDefaultArgs> = $Result.GetResult<Prisma.$EmpresaPayload, S>

  type EmpresaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EmpresaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EmpresaCountAggregateInputType | true
    }

  export interface EmpresaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Empresa'], meta: { name: 'Empresa' } }
    /**
     * Find zero or one Empresa that matches the filter.
     * @param {EmpresaFindUniqueArgs} args - Arguments to find a Empresa
     * @example
     * // Get one Empresa
     * const empresa = await prisma.empresa.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EmpresaFindUniqueArgs>(args: SelectSubset<T, EmpresaFindUniqueArgs<ExtArgs>>): Prisma__EmpresaClient<$Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Empresa that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EmpresaFindUniqueOrThrowArgs} args - Arguments to find a Empresa
     * @example
     * // Get one Empresa
     * const empresa = await prisma.empresa.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EmpresaFindUniqueOrThrowArgs>(args: SelectSubset<T, EmpresaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EmpresaClient<$Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Empresa that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmpresaFindFirstArgs} args - Arguments to find a Empresa
     * @example
     * // Get one Empresa
     * const empresa = await prisma.empresa.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EmpresaFindFirstArgs>(args?: SelectSubset<T, EmpresaFindFirstArgs<ExtArgs>>): Prisma__EmpresaClient<$Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Empresa that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmpresaFindFirstOrThrowArgs} args - Arguments to find a Empresa
     * @example
     * // Get one Empresa
     * const empresa = await prisma.empresa.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EmpresaFindFirstOrThrowArgs>(args?: SelectSubset<T, EmpresaFindFirstOrThrowArgs<ExtArgs>>): Prisma__EmpresaClient<$Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Empresas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmpresaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Empresas
     * const empresas = await prisma.empresa.findMany()
     * 
     * // Get first 10 Empresas
     * const empresas = await prisma.empresa.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const empresaWithIdOnly = await prisma.empresa.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EmpresaFindManyArgs>(args?: SelectSubset<T, EmpresaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Empresa.
     * @param {EmpresaCreateArgs} args - Arguments to create a Empresa.
     * @example
     * // Create one Empresa
     * const Empresa = await prisma.empresa.create({
     *   data: {
     *     // ... data to create a Empresa
     *   }
     * })
     * 
     */
    create<T extends EmpresaCreateArgs>(args: SelectSubset<T, EmpresaCreateArgs<ExtArgs>>): Prisma__EmpresaClient<$Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Empresas.
     * @param {EmpresaCreateManyArgs} args - Arguments to create many Empresas.
     * @example
     * // Create many Empresas
     * const empresa = await prisma.empresa.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EmpresaCreateManyArgs>(args?: SelectSubset<T, EmpresaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Empresas and returns the data saved in the database.
     * @param {EmpresaCreateManyAndReturnArgs} args - Arguments to create many Empresas.
     * @example
     * // Create many Empresas
     * const empresa = await prisma.empresa.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Empresas and only return the `id`
     * const empresaWithIdOnly = await prisma.empresa.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EmpresaCreateManyAndReturnArgs>(args?: SelectSubset<T, EmpresaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Empresa.
     * @param {EmpresaDeleteArgs} args - Arguments to delete one Empresa.
     * @example
     * // Delete one Empresa
     * const Empresa = await prisma.empresa.delete({
     *   where: {
     *     // ... filter to delete one Empresa
     *   }
     * })
     * 
     */
    delete<T extends EmpresaDeleteArgs>(args: SelectSubset<T, EmpresaDeleteArgs<ExtArgs>>): Prisma__EmpresaClient<$Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Empresa.
     * @param {EmpresaUpdateArgs} args - Arguments to update one Empresa.
     * @example
     * // Update one Empresa
     * const empresa = await prisma.empresa.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EmpresaUpdateArgs>(args: SelectSubset<T, EmpresaUpdateArgs<ExtArgs>>): Prisma__EmpresaClient<$Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Empresas.
     * @param {EmpresaDeleteManyArgs} args - Arguments to filter Empresas to delete.
     * @example
     * // Delete a few Empresas
     * const { count } = await prisma.empresa.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EmpresaDeleteManyArgs>(args?: SelectSubset<T, EmpresaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Empresas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmpresaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Empresas
     * const empresa = await prisma.empresa.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EmpresaUpdateManyArgs>(args: SelectSubset<T, EmpresaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Empresas and returns the data updated in the database.
     * @param {EmpresaUpdateManyAndReturnArgs} args - Arguments to update many Empresas.
     * @example
     * // Update many Empresas
     * const empresa = await prisma.empresa.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Empresas and only return the `id`
     * const empresaWithIdOnly = await prisma.empresa.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EmpresaUpdateManyAndReturnArgs>(args: SelectSubset<T, EmpresaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Empresa.
     * @param {EmpresaUpsertArgs} args - Arguments to update or create a Empresa.
     * @example
     * // Update or create a Empresa
     * const empresa = await prisma.empresa.upsert({
     *   create: {
     *     // ... data to create a Empresa
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Empresa we want to update
     *   }
     * })
     */
    upsert<T extends EmpresaUpsertArgs>(args: SelectSubset<T, EmpresaUpsertArgs<ExtArgs>>): Prisma__EmpresaClient<$Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Empresas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmpresaCountArgs} args - Arguments to filter Empresas to count.
     * @example
     * // Count the number of Empresas
     * const count = await prisma.empresa.count({
     *   where: {
     *     // ... the filter for the Empresas we want to count
     *   }
     * })
    **/
    count<T extends EmpresaCountArgs>(
      args?: Subset<T, EmpresaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmpresaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Empresa.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmpresaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EmpresaAggregateArgs>(args: Subset<T, EmpresaAggregateArgs>): Prisma.PrismaPromise<GetEmpresaAggregateType<T>>

    /**
     * Group by Empresa.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmpresaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EmpresaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmpresaGroupByArgs['orderBy'] }
        : { orderBy?: EmpresaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EmpresaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmpresaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Empresa model
   */
  readonly fields: EmpresaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Empresa.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EmpresaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    acoes<T extends Empresa$acoesArgs<ExtArgs> = {}>(args?: Subset<T, Empresa$acoesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AcaoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    ods<T extends Empresa$odsArgs<ExtArgs> = {}>(args?: Subset<T, Empresa$odsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmpresaODSPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Empresa model
   */
  interface EmpresaFieldRefs {
    readonly id: FieldRef<"Empresa", 'Int'>
    readonly nome: FieldRef<"Empresa", 'String'>
    readonly cnpj: FieldRef<"Empresa", 'String'>
    readonly email: FieldRef<"Empresa", 'String'>
    readonly senha: FieldRef<"Empresa", 'String'>
    readonly colaboradores: FieldRef<"Empresa", 'Int'>
    readonly pontos: FieldRef<"Empresa", 'Int'>
    readonly selo: FieldRef<"Empresa", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Empresa findUnique
   */
  export type EmpresaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Empresa
     */
    select?: EmpresaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Empresa
     */
    omit?: EmpresaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmpresaInclude<ExtArgs> | null
    /**
     * Filter, which Empresa to fetch.
     */
    where: EmpresaWhereUniqueInput
  }

  /**
   * Empresa findUniqueOrThrow
   */
  export type EmpresaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Empresa
     */
    select?: EmpresaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Empresa
     */
    omit?: EmpresaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmpresaInclude<ExtArgs> | null
    /**
     * Filter, which Empresa to fetch.
     */
    where: EmpresaWhereUniqueInput
  }

  /**
   * Empresa findFirst
   */
  export type EmpresaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Empresa
     */
    select?: EmpresaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Empresa
     */
    omit?: EmpresaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmpresaInclude<ExtArgs> | null
    /**
     * Filter, which Empresa to fetch.
     */
    where?: EmpresaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Empresas to fetch.
     */
    orderBy?: EmpresaOrderByWithRelationInput | EmpresaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Empresas.
     */
    cursor?: EmpresaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Empresas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Empresas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Empresas.
     */
    distinct?: EmpresaScalarFieldEnum | EmpresaScalarFieldEnum[]
  }

  /**
   * Empresa findFirstOrThrow
   */
  export type EmpresaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Empresa
     */
    select?: EmpresaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Empresa
     */
    omit?: EmpresaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmpresaInclude<ExtArgs> | null
    /**
     * Filter, which Empresa to fetch.
     */
    where?: EmpresaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Empresas to fetch.
     */
    orderBy?: EmpresaOrderByWithRelationInput | EmpresaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Empresas.
     */
    cursor?: EmpresaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Empresas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Empresas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Empresas.
     */
    distinct?: EmpresaScalarFieldEnum | EmpresaScalarFieldEnum[]
  }

  /**
   * Empresa findMany
   */
  export type EmpresaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Empresa
     */
    select?: EmpresaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Empresa
     */
    omit?: EmpresaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmpresaInclude<ExtArgs> | null
    /**
     * Filter, which Empresas to fetch.
     */
    where?: EmpresaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Empresas to fetch.
     */
    orderBy?: EmpresaOrderByWithRelationInput | EmpresaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Empresas.
     */
    cursor?: EmpresaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Empresas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Empresas.
     */
    skip?: number
    distinct?: EmpresaScalarFieldEnum | EmpresaScalarFieldEnum[]
  }

  /**
   * Empresa create
   */
  export type EmpresaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Empresa
     */
    select?: EmpresaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Empresa
     */
    omit?: EmpresaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmpresaInclude<ExtArgs> | null
    /**
     * The data needed to create a Empresa.
     */
    data?: XOR<EmpresaCreateInput, EmpresaUncheckedCreateInput>
  }

  /**
   * Empresa createMany
   */
  export type EmpresaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Empresas.
     */
    data: EmpresaCreateManyInput | EmpresaCreateManyInput[]
  }

  /**
   * Empresa createManyAndReturn
   */
  export type EmpresaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Empresa
     */
    select?: EmpresaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Empresa
     */
    omit?: EmpresaOmit<ExtArgs> | null
    /**
     * The data used to create many Empresas.
     */
    data: EmpresaCreateManyInput | EmpresaCreateManyInput[]
  }

  /**
   * Empresa update
   */
  export type EmpresaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Empresa
     */
    select?: EmpresaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Empresa
     */
    omit?: EmpresaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmpresaInclude<ExtArgs> | null
    /**
     * The data needed to update a Empresa.
     */
    data: XOR<EmpresaUpdateInput, EmpresaUncheckedUpdateInput>
    /**
     * Choose, which Empresa to update.
     */
    where: EmpresaWhereUniqueInput
  }

  /**
   * Empresa updateMany
   */
  export type EmpresaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Empresas.
     */
    data: XOR<EmpresaUpdateManyMutationInput, EmpresaUncheckedUpdateManyInput>
    /**
     * Filter which Empresas to update
     */
    where?: EmpresaWhereInput
    /**
     * Limit how many Empresas to update.
     */
    limit?: number
  }

  /**
   * Empresa updateManyAndReturn
   */
  export type EmpresaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Empresa
     */
    select?: EmpresaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Empresa
     */
    omit?: EmpresaOmit<ExtArgs> | null
    /**
     * The data used to update Empresas.
     */
    data: XOR<EmpresaUpdateManyMutationInput, EmpresaUncheckedUpdateManyInput>
    /**
     * Filter which Empresas to update
     */
    where?: EmpresaWhereInput
    /**
     * Limit how many Empresas to update.
     */
    limit?: number
  }

  /**
   * Empresa upsert
   */
  export type EmpresaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Empresa
     */
    select?: EmpresaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Empresa
     */
    omit?: EmpresaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmpresaInclude<ExtArgs> | null
    /**
     * The filter to search for the Empresa to update in case it exists.
     */
    where: EmpresaWhereUniqueInput
    /**
     * In case the Empresa found by the `where` argument doesn't exist, create a new Empresa with this data.
     */
    create: XOR<EmpresaCreateInput, EmpresaUncheckedCreateInput>
    /**
     * In case the Empresa was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EmpresaUpdateInput, EmpresaUncheckedUpdateInput>
  }

  /**
   * Empresa delete
   */
  export type EmpresaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Empresa
     */
    select?: EmpresaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Empresa
     */
    omit?: EmpresaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmpresaInclude<ExtArgs> | null
    /**
     * Filter which Empresa to delete.
     */
    where: EmpresaWhereUniqueInput
  }

  /**
   * Empresa deleteMany
   */
  export type EmpresaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Empresas to delete
     */
    where?: EmpresaWhereInput
    /**
     * Limit how many Empresas to delete.
     */
    limit?: number
  }

  /**
   * Empresa.acoes
   */
  export type Empresa$acoesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Acao
     */
    select?: AcaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Acao
     */
    omit?: AcaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcaoInclude<ExtArgs> | null
    where?: AcaoWhereInput
    orderBy?: AcaoOrderByWithRelationInput | AcaoOrderByWithRelationInput[]
    cursor?: AcaoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AcaoScalarFieldEnum | AcaoScalarFieldEnum[]
  }

  /**
   * Empresa.ods
   */
  export type Empresa$odsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmpresaODS
     */
    select?: EmpresaODSSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmpresaODS
     */
    omit?: EmpresaODSOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmpresaODSInclude<ExtArgs> | null
    where?: EmpresaODSWhereInput
    orderBy?: EmpresaODSOrderByWithRelationInput | EmpresaODSOrderByWithRelationInput[]
    cursor?: EmpresaODSWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EmpresaODSScalarFieldEnum | EmpresaODSScalarFieldEnum[]
  }

  /**
   * Empresa without action
   */
  export type EmpresaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Empresa
     */
    select?: EmpresaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Empresa
     */
    omit?: EmpresaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmpresaInclude<ExtArgs> | null
  }


  /**
   * Model ODS
   */

  export type AggregateODS = {
    _count: ODSCountAggregateOutputType | null
    _avg: ODSAvgAggregateOutputType | null
    _sum: ODSSumAggregateOutputType | null
    _min: ODSMinAggregateOutputType | null
    _max: ODSMaxAggregateOutputType | null
  }

  export type ODSAvgAggregateOutputType = {
    id: number | null
  }

  export type ODSSumAggregateOutputType = {
    id: number | null
  }

  export type ODSMinAggregateOutputType = {
    id: number | null
    titulo: string | null
  }

  export type ODSMaxAggregateOutputType = {
    id: number | null
    titulo: string | null
  }

  export type ODSCountAggregateOutputType = {
    id: number
    titulo: number
    _all: number
  }


  export type ODSAvgAggregateInputType = {
    id?: true
  }

  export type ODSSumAggregateInputType = {
    id?: true
  }

  export type ODSMinAggregateInputType = {
    id?: true
    titulo?: true
  }

  export type ODSMaxAggregateInputType = {
    id?: true
    titulo?: true
  }

  export type ODSCountAggregateInputType = {
    id?: true
    titulo?: true
    _all?: true
  }

  export type ODSAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ODS to aggregate.
     */
    where?: ODSWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ODS to fetch.
     */
    orderBy?: ODSOrderByWithRelationInput | ODSOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ODSWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ODS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ODS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ODS
    **/
    _count?: true | ODSCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ODSAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ODSSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ODSMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ODSMaxAggregateInputType
  }

  export type GetODSAggregateType<T extends ODSAggregateArgs> = {
        [P in keyof T & keyof AggregateODS]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateODS[P]>
      : GetScalarType<T[P], AggregateODS[P]>
  }




  export type ODSGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ODSWhereInput
    orderBy?: ODSOrderByWithAggregationInput | ODSOrderByWithAggregationInput[]
    by: ODSScalarFieldEnum[] | ODSScalarFieldEnum
    having?: ODSScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ODSCountAggregateInputType | true
    _avg?: ODSAvgAggregateInputType
    _sum?: ODSSumAggregateInputType
    _min?: ODSMinAggregateInputType
    _max?: ODSMaxAggregateInputType
  }

  export type ODSGroupByOutputType = {
    id: number
    titulo: string
    _count: ODSCountAggregateOutputType | null
    _avg: ODSAvgAggregateOutputType | null
    _sum: ODSSumAggregateOutputType | null
    _min: ODSMinAggregateOutputType | null
    _max: ODSMaxAggregateOutputType | null
  }

  type GetODSGroupByPayload<T extends ODSGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ODSGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ODSGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ODSGroupByOutputType[P]>
            : GetScalarType<T[P], ODSGroupByOutputType[P]>
        }
      >
    >


  export type ODSSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    titulo?: boolean
    empresas?: boolean | ODS$empresasArgs<ExtArgs>
    _count?: boolean | ODSCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["oDS"]>

  export type ODSSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    titulo?: boolean
  }, ExtArgs["result"]["oDS"]>

  export type ODSSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    titulo?: boolean
  }, ExtArgs["result"]["oDS"]>

  export type ODSSelectScalar = {
    id?: boolean
    titulo?: boolean
  }

  export type ODSOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "titulo", ExtArgs["result"]["oDS"]>
  export type ODSInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    empresas?: boolean | ODS$empresasArgs<ExtArgs>
    _count?: boolean | ODSCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ODSIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ODSIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ODSPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ODS"
    objects: {
      empresas: Prisma.$EmpresaODSPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      titulo: string
    }, ExtArgs["result"]["oDS"]>
    composites: {}
  }

  type ODSGetPayload<S extends boolean | null | undefined | ODSDefaultArgs> = $Result.GetResult<Prisma.$ODSPayload, S>

  type ODSCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ODSFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ODSCountAggregateInputType | true
    }

  export interface ODSDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ODS'], meta: { name: 'ODS' } }
    /**
     * Find zero or one ODS that matches the filter.
     * @param {ODSFindUniqueArgs} args - Arguments to find a ODS
     * @example
     * // Get one ODS
     * const oDS = await prisma.oDS.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ODSFindUniqueArgs>(args: SelectSubset<T, ODSFindUniqueArgs<ExtArgs>>): Prisma__ODSClient<$Result.GetResult<Prisma.$ODSPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ODS that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ODSFindUniqueOrThrowArgs} args - Arguments to find a ODS
     * @example
     * // Get one ODS
     * const oDS = await prisma.oDS.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ODSFindUniqueOrThrowArgs>(args: SelectSubset<T, ODSFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ODSClient<$Result.GetResult<Prisma.$ODSPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ODS that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ODSFindFirstArgs} args - Arguments to find a ODS
     * @example
     * // Get one ODS
     * const oDS = await prisma.oDS.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ODSFindFirstArgs>(args?: SelectSubset<T, ODSFindFirstArgs<ExtArgs>>): Prisma__ODSClient<$Result.GetResult<Prisma.$ODSPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ODS that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ODSFindFirstOrThrowArgs} args - Arguments to find a ODS
     * @example
     * // Get one ODS
     * const oDS = await prisma.oDS.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ODSFindFirstOrThrowArgs>(args?: SelectSubset<T, ODSFindFirstOrThrowArgs<ExtArgs>>): Prisma__ODSClient<$Result.GetResult<Prisma.$ODSPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ODS that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ODSFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ODS
     * const oDS = await prisma.oDS.findMany()
     * 
     * // Get first 10 ODS
     * const oDS = await prisma.oDS.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const oDSWithIdOnly = await prisma.oDS.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ODSFindManyArgs>(args?: SelectSubset<T, ODSFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ODSPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ODS.
     * @param {ODSCreateArgs} args - Arguments to create a ODS.
     * @example
     * // Create one ODS
     * const ODS = await prisma.oDS.create({
     *   data: {
     *     // ... data to create a ODS
     *   }
     * })
     * 
     */
    create<T extends ODSCreateArgs>(args: SelectSubset<T, ODSCreateArgs<ExtArgs>>): Prisma__ODSClient<$Result.GetResult<Prisma.$ODSPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ODS.
     * @param {ODSCreateManyArgs} args - Arguments to create many ODS.
     * @example
     * // Create many ODS
     * const oDS = await prisma.oDS.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ODSCreateManyArgs>(args?: SelectSubset<T, ODSCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ODS and returns the data saved in the database.
     * @param {ODSCreateManyAndReturnArgs} args - Arguments to create many ODS.
     * @example
     * // Create many ODS
     * const oDS = await prisma.oDS.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ODS and only return the `id`
     * const oDSWithIdOnly = await prisma.oDS.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ODSCreateManyAndReturnArgs>(args?: SelectSubset<T, ODSCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ODSPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ODS.
     * @param {ODSDeleteArgs} args - Arguments to delete one ODS.
     * @example
     * // Delete one ODS
     * const ODS = await prisma.oDS.delete({
     *   where: {
     *     // ... filter to delete one ODS
     *   }
     * })
     * 
     */
    delete<T extends ODSDeleteArgs>(args: SelectSubset<T, ODSDeleteArgs<ExtArgs>>): Prisma__ODSClient<$Result.GetResult<Prisma.$ODSPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ODS.
     * @param {ODSUpdateArgs} args - Arguments to update one ODS.
     * @example
     * // Update one ODS
     * const oDS = await prisma.oDS.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ODSUpdateArgs>(args: SelectSubset<T, ODSUpdateArgs<ExtArgs>>): Prisma__ODSClient<$Result.GetResult<Prisma.$ODSPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ODS.
     * @param {ODSDeleteManyArgs} args - Arguments to filter ODS to delete.
     * @example
     * // Delete a few ODS
     * const { count } = await prisma.oDS.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ODSDeleteManyArgs>(args?: SelectSubset<T, ODSDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ODS.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ODSUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ODS
     * const oDS = await prisma.oDS.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ODSUpdateManyArgs>(args: SelectSubset<T, ODSUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ODS and returns the data updated in the database.
     * @param {ODSUpdateManyAndReturnArgs} args - Arguments to update many ODS.
     * @example
     * // Update many ODS
     * const oDS = await prisma.oDS.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ODS and only return the `id`
     * const oDSWithIdOnly = await prisma.oDS.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ODSUpdateManyAndReturnArgs>(args: SelectSubset<T, ODSUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ODSPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ODS.
     * @param {ODSUpsertArgs} args - Arguments to update or create a ODS.
     * @example
     * // Update or create a ODS
     * const oDS = await prisma.oDS.upsert({
     *   create: {
     *     // ... data to create a ODS
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ODS we want to update
     *   }
     * })
     */
    upsert<T extends ODSUpsertArgs>(args: SelectSubset<T, ODSUpsertArgs<ExtArgs>>): Prisma__ODSClient<$Result.GetResult<Prisma.$ODSPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ODS.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ODSCountArgs} args - Arguments to filter ODS to count.
     * @example
     * // Count the number of ODS
     * const count = await prisma.oDS.count({
     *   where: {
     *     // ... the filter for the ODS we want to count
     *   }
     * })
    **/
    count<T extends ODSCountArgs>(
      args?: Subset<T, ODSCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ODSCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ODS.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ODSAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ODSAggregateArgs>(args: Subset<T, ODSAggregateArgs>): Prisma.PrismaPromise<GetODSAggregateType<T>>

    /**
     * Group by ODS.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ODSGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ODSGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ODSGroupByArgs['orderBy'] }
        : { orderBy?: ODSGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ODSGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetODSGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ODS model
   */
  readonly fields: ODSFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ODS.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ODSClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    empresas<T extends ODS$empresasArgs<ExtArgs> = {}>(args?: Subset<T, ODS$empresasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmpresaODSPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ODS model
   */
  interface ODSFieldRefs {
    readonly id: FieldRef<"ODS", 'Int'>
    readonly titulo: FieldRef<"ODS", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ODS findUnique
   */
  export type ODSFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ODS
     */
    select?: ODSSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ODS
     */
    omit?: ODSOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ODSInclude<ExtArgs> | null
    /**
     * Filter, which ODS to fetch.
     */
    where: ODSWhereUniqueInput
  }

  /**
   * ODS findUniqueOrThrow
   */
  export type ODSFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ODS
     */
    select?: ODSSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ODS
     */
    omit?: ODSOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ODSInclude<ExtArgs> | null
    /**
     * Filter, which ODS to fetch.
     */
    where: ODSWhereUniqueInput
  }

  /**
   * ODS findFirst
   */
  export type ODSFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ODS
     */
    select?: ODSSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ODS
     */
    omit?: ODSOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ODSInclude<ExtArgs> | null
    /**
     * Filter, which ODS to fetch.
     */
    where?: ODSWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ODS to fetch.
     */
    orderBy?: ODSOrderByWithRelationInput | ODSOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ODS.
     */
    cursor?: ODSWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ODS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ODS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ODS.
     */
    distinct?: ODSScalarFieldEnum | ODSScalarFieldEnum[]
  }

  /**
   * ODS findFirstOrThrow
   */
  export type ODSFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ODS
     */
    select?: ODSSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ODS
     */
    omit?: ODSOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ODSInclude<ExtArgs> | null
    /**
     * Filter, which ODS to fetch.
     */
    where?: ODSWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ODS to fetch.
     */
    orderBy?: ODSOrderByWithRelationInput | ODSOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ODS.
     */
    cursor?: ODSWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ODS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ODS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ODS.
     */
    distinct?: ODSScalarFieldEnum | ODSScalarFieldEnum[]
  }

  /**
   * ODS findMany
   */
  export type ODSFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ODS
     */
    select?: ODSSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ODS
     */
    omit?: ODSOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ODSInclude<ExtArgs> | null
    /**
     * Filter, which ODS to fetch.
     */
    where?: ODSWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ODS to fetch.
     */
    orderBy?: ODSOrderByWithRelationInput | ODSOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ODS.
     */
    cursor?: ODSWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ODS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ODS.
     */
    skip?: number
    distinct?: ODSScalarFieldEnum | ODSScalarFieldEnum[]
  }

  /**
   * ODS create
   */
  export type ODSCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ODS
     */
    select?: ODSSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ODS
     */
    omit?: ODSOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ODSInclude<ExtArgs> | null
    /**
     * The data needed to create a ODS.
     */
    data: XOR<ODSCreateInput, ODSUncheckedCreateInput>
  }

  /**
   * ODS createMany
   */
  export type ODSCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ODS.
     */
    data: ODSCreateManyInput | ODSCreateManyInput[]
  }

  /**
   * ODS createManyAndReturn
   */
  export type ODSCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ODS
     */
    select?: ODSSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ODS
     */
    omit?: ODSOmit<ExtArgs> | null
    /**
     * The data used to create many ODS.
     */
    data: ODSCreateManyInput | ODSCreateManyInput[]
  }

  /**
   * ODS update
   */
  export type ODSUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ODS
     */
    select?: ODSSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ODS
     */
    omit?: ODSOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ODSInclude<ExtArgs> | null
    /**
     * The data needed to update a ODS.
     */
    data: XOR<ODSUpdateInput, ODSUncheckedUpdateInput>
    /**
     * Choose, which ODS to update.
     */
    where: ODSWhereUniqueInput
  }

  /**
   * ODS updateMany
   */
  export type ODSUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ODS.
     */
    data: XOR<ODSUpdateManyMutationInput, ODSUncheckedUpdateManyInput>
    /**
     * Filter which ODS to update
     */
    where?: ODSWhereInput
    /**
     * Limit how many ODS to update.
     */
    limit?: number
  }

  /**
   * ODS updateManyAndReturn
   */
  export type ODSUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ODS
     */
    select?: ODSSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ODS
     */
    omit?: ODSOmit<ExtArgs> | null
    /**
     * The data used to update ODS.
     */
    data: XOR<ODSUpdateManyMutationInput, ODSUncheckedUpdateManyInput>
    /**
     * Filter which ODS to update
     */
    where?: ODSWhereInput
    /**
     * Limit how many ODS to update.
     */
    limit?: number
  }

  /**
   * ODS upsert
   */
  export type ODSUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ODS
     */
    select?: ODSSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ODS
     */
    omit?: ODSOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ODSInclude<ExtArgs> | null
    /**
     * The filter to search for the ODS to update in case it exists.
     */
    where: ODSWhereUniqueInput
    /**
     * In case the ODS found by the `where` argument doesn't exist, create a new ODS with this data.
     */
    create: XOR<ODSCreateInput, ODSUncheckedCreateInput>
    /**
     * In case the ODS was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ODSUpdateInput, ODSUncheckedUpdateInput>
  }

  /**
   * ODS delete
   */
  export type ODSDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ODS
     */
    select?: ODSSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ODS
     */
    omit?: ODSOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ODSInclude<ExtArgs> | null
    /**
     * Filter which ODS to delete.
     */
    where: ODSWhereUniqueInput
  }

  /**
   * ODS deleteMany
   */
  export type ODSDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ODS to delete
     */
    where?: ODSWhereInput
    /**
     * Limit how many ODS to delete.
     */
    limit?: number
  }

  /**
   * ODS.empresas
   */
  export type ODS$empresasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmpresaODS
     */
    select?: EmpresaODSSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmpresaODS
     */
    omit?: EmpresaODSOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmpresaODSInclude<ExtArgs> | null
    where?: EmpresaODSWhereInput
    orderBy?: EmpresaODSOrderByWithRelationInput | EmpresaODSOrderByWithRelationInput[]
    cursor?: EmpresaODSWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EmpresaODSScalarFieldEnum | EmpresaODSScalarFieldEnum[]
  }

  /**
   * ODS without action
   */
  export type ODSDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ODS
     */
    select?: ODSSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ODS
     */
    omit?: ODSOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ODSInclude<ExtArgs> | null
  }


  /**
   * Model EmpresaODS
   */

  export type AggregateEmpresaODS = {
    _count: EmpresaODSCountAggregateOutputType | null
    _avg: EmpresaODSAvgAggregateOutputType | null
    _sum: EmpresaODSSumAggregateOutputType | null
    _min: EmpresaODSMinAggregateOutputType | null
    _max: EmpresaODSMaxAggregateOutputType | null
  }

  export type EmpresaODSAvgAggregateOutputType = {
    empresaId: number | null
    odsId: number | null
  }

  export type EmpresaODSSumAggregateOutputType = {
    empresaId: number | null
    odsId: number | null
  }

  export type EmpresaODSMinAggregateOutputType = {
    empresaId: number | null
    odsId: number | null
  }

  export type EmpresaODSMaxAggregateOutputType = {
    empresaId: number | null
    odsId: number | null
  }

  export type EmpresaODSCountAggregateOutputType = {
    empresaId: number
    odsId: number
    _all: number
  }


  export type EmpresaODSAvgAggregateInputType = {
    empresaId?: true
    odsId?: true
  }

  export type EmpresaODSSumAggregateInputType = {
    empresaId?: true
    odsId?: true
  }

  export type EmpresaODSMinAggregateInputType = {
    empresaId?: true
    odsId?: true
  }

  export type EmpresaODSMaxAggregateInputType = {
    empresaId?: true
    odsId?: true
  }

  export type EmpresaODSCountAggregateInputType = {
    empresaId?: true
    odsId?: true
    _all?: true
  }

  export type EmpresaODSAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmpresaODS to aggregate.
     */
    where?: EmpresaODSWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmpresaODS to fetch.
     */
    orderBy?: EmpresaODSOrderByWithRelationInput | EmpresaODSOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EmpresaODSWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmpresaODS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmpresaODS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EmpresaODS
    **/
    _count?: true | EmpresaODSCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EmpresaODSAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EmpresaODSSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmpresaODSMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmpresaODSMaxAggregateInputType
  }

  export type GetEmpresaODSAggregateType<T extends EmpresaODSAggregateArgs> = {
        [P in keyof T & keyof AggregateEmpresaODS]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmpresaODS[P]>
      : GetScalarType<T[P], AggregateEmpresaODS[P]>
  }




  export type EmpresaODSGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmpresaODSWhereInput
    orderBy?: EmpresaODSOrderByWithAggregationInput | EmpresaODSOrderByWithAggregationInput[]
    by: EmpresaODSScalarFieldEnum[] | EmpresaODSScalarFieldEnum
    having?: EmpresaODSScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmpresaODSCountAggregateInputType | true
    _avg?: EmpresaODSAvgAggregateInputType
    _sum?: EmpresaODSSumAggregateInputType
    _min?: EmpresaODSMinAggregateInputType
    _max?: EmpresaODSMaxAggregateInputType
  }

  export type EmpresaODSGroupByOutputType = {
    empresaId: number
    odsId: number
    _count: EmpresaODSCountAggregateOutputType | null
    _avg: EmpresaODSAvgAggregateOutputType | null
    _sum: EmpresaODSSumAggregateOutputType | null
    _min: EmpresaODSMinAggregateOutputType | null
    _max: EmpresaODSMaxAggregateOutputType | null
  }

  type GetEmpresaODSGroupByPayload<T extends EmpresaODSGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmpresaODSGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmpresaODSGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmpresaODSGroupByOutputType[P]>
            : GetScalarType<T[P], EmpresaODSGroupByOutputType[P]>
        }
      >
    >


  export type EmpresaODSSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    empresaId?: boolean
    odsId?: boolean
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
    ods?: boolean | ODSDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["empresaODS"]>

  export type EmpresaODSSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    empresaId?: boolean
    odsId?: boolean
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
    ods?: boolean | ODSDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["empresaODS"]>

  export type EmpresaODSSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    empresaId?: boolean
    odsId?: boolean
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
    ods?: boolean | ODSDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["empresaODS"]>

  export type EmpresaODSSelectScalar = {
    empresaId?: boolean
    odsId?: boolean
  }

  export type EmpresaODSOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"empresaId" | "odsId", ExtArgs["result"]["empresaODS"]>
  export type EmpresaODSInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
    ods?: boolean | ODSDefaultArgs<ExtArgs>
  }
  export type EmpresaODSIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
    ods?: boolean | ODSDefaultArgs<ExtArgs>
  }
  export type EmpresaODSIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
    ods?: boolean | ODSDefaultArgs<ExtArgs>
  }

  export type $EmpresaODSPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EmpresaODS"
    objects: {
      empresa: Prisma.$EmpresaPayload<ExtArgs>
      ods: Prisma.$ODSPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      empresaId: number
      odsId: number
    }, ExtArgs["result"]["empresaODS"]>
    composites: {}
  }

  type EmpresaODSGetPayload<S extends boolean | null | undefined | EmpresaODSDefaultArgs> = $Result.GetResult<Prisma.$EmpresaODSPayload, S>

  type EmpresaODSCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EmpresaODSFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EmpresaODSCountAggregateInputType | true
    }

  export interface EmpresaODSDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EmpresaODS'], meta: { name: 'EmpresaODS' } }
    /**
     * Find zero or one EmpresaODS that matches the filter.
     * @param {EmpresaODSFindUniqueArgs} args - Arguments to find a EmpresaODS
     * @example
     * // Get one EmpresaODS
     * const empresaODS = await prisma.empresaODS.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EmpresaODSFindUniqueArgs>(args: SelectSubset<T, EmpresaODSFindUniqueArgs<ExtArgs>>): Prisma__EmpresaODSClient<$Result.GetResult<Prisma.$EmpresaODSPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EmpresaODS that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EmpresaODSFindUniqueOrThrowArgs} args - Arguments to find a EmpresaODS
     * @example
     * // Get one EmpresaODS
     * const empresaODS = await prisma.empresaODS.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EmpresaODSFindUniqueOrThrowArgs>(args: SelectSubset<T, EmpresaODSFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EmpresaODSClient<$Result.GetResult<Prisma.$EmpresaODSPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EmpresaODS that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmpresaODSFindFirstArgs} args - Arguments to find a EmpresaODS
     * @example
     * // Get one EmpresaODS
     * const empresaODS = await prisma.empresaODS.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EmpresaODSFindFirstArgs>(args?: SelectSubset<T, EmpresaODSFindFirstArgs<ExtArgs>>): Prisma__EmpresaODSClient<$Result.GetResult<Prisma.$EmpresaODSPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EmpresaODS that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmpresaODSFindFirstOrThrowArgs} args - Arguments to find a EmpresaODS
     * @example
     * // Get one EmpresaODS
     * const empresaODS = await prisma.empresaODS.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EmpresaODSFindFirstOrThrowArgs>(args?: SelectSubset<T, EmpresaODSFindFirstOrThrowArgs<ExtArgs>>): Prisma__EmpresaODSClient<$Result.GetResult<Prisma.$EmpresaODSPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EmpresaODS that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmpresaODSFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EmpresaODS
     * const empresaODS = await prisma.empresaODS.findMany()
     * 
     * // Get first 10 EmpresaODS
     * const empresaODS = await prisma.empresaODS.findMany({ take: 10 })
     * 
     * // Only select the `empresaId`
     * const empresaODSWithEmpresaIdOnly = await prisma.empresaODS.findMany({ select: { empresaId: true } })
     * 
     */
    findMany<T extends EmpresaODSFindManyArgs>(args?: SelectSubset<T, EmpresaODSFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmpresaODSPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EmpresaODS.
     * @param {EmpresaODSCreateArgs} args - Arguments to create a EmpresaODS.
     * @example
     * // Create one EmpresaODS
     * const EmpresaODS = await prisma.empresaODS.create({
     *   data: {
     *     // ... data to create a EmpresaODS
     *   }
     * })
     * 
     */
    create<T extends EmpresaODSCreateArgs>(args: SelectSubset<T, EmpresaODSCreateArgs<ExtArgs>>): Prisma__EmpresaODSClient<$Result.GetResult<Prisma.$EmpresaODSPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EmpresaODS.
     * @param {EmpresaODSCreateManyArgs} args - Arguments to create many EmpresaODS.
     * @example
     * // Create many EmpresaODS
     * const empresaODS = await prisma.empresaODS.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EmpresaODSCreateManyArgs>(args?: SelectSubset<T, EmpresaODSCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EmpresaODS and returns the data saved in the database.
     * @param {EmpresaODSCreateManyAndReturnArgs} args - Arguments to create many EmpresaODS.
     * @example
     * // Create many EmpresaODS
     * const empresaODS = await prisma.empresaODS.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EmpresaODS and only return the `empresaId`
     * const empresaODSWithEmpresaIdOnly = await prisma.empresaODS.createManyAndReturn({
     *   select: { empresaId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EmpresaODSCreateManyAndReturnArgs>(args?: SelectSubset<T, EmpresaODSCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmpresaODSPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a EmpresaODS.
     * @param {EmpresaODSDeleteArgs} args - Arguments to delete one EmpresaODS.
     * @example
     * // Delete one EmpresaODS
     * const EmpresaODS = await prisma.empresaODS.delete({
     *   where: {
     *     // ... filter to delete one EmpresaODS
     *   }
     * })
     * 
     */
    delete<T extends EmpresaODSDeleteArgs>(args: SelectSubset<T, EmpresaODSDeleteArgs<ExtArgs>>): Prisma__EmpresaODSClient<$Result.GetResult<Prisma.$EmpresaODSPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EmpresaODS.
     * @param {EmpresaODSUpdateArgs} args - Arguments to update one EmpresaODS.
     * @example
     * // Update one EmpresaODS
     * const empresaODS = await prisma.empresaODS.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EmpresaODSUpdateArgs>(args: SelectSubset<T, EmpresaODSUpdateArgs<ExtArgs>>): Prisma__EmpresaODSClient<$Result.GetResult<Prisma.$EmpresaODSPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EmpresaODS.
     * @param {EmpresaODSDeleteManyArgs} args - Arguments to filter EmpresaODS to delete.
     * @example
     * // Delete a few EmpresaODS
     * const { count } = await prisma.empresaODS.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EmpresaODSDeleteManyArgs>(args?: SelectSubset<T, EmpresaODSDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EmpresaODS.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmpresaODSUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EmpresaODS
     * const empresaODS = await prisma.empresaODS.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EmpresaODSUpdateManyArgs>(args: SelectSubset<T, EmpresaODSUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EmpresaODS and returns the data updated in the database.
     * @param {EmpresaODSUpdateManyAndReturnArgs} args - Arguments to update many EmpresaODS.
     * @example
     * // Update many EmpresaODS
     * const empresaODS = await prisma.empresaODS.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more EmpresaODS and only return the `empresaId`
     * const empresaODSWithEmpresaIdOnly = await prisma.empresaODS.updateManyAndReturn({
     *   select: { empresaId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EmpresaODSUpdateManyAndReturnArgs>(args: SelectSubset<T, EmpresaODSUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmpresaODSPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one EmpresaODS.
     * @param {EmpresaODSUpsertArgs} args - Arguments to update or create a EmpresaODS.
     * @example
     * // Update or create a EmpresaODS
     * const empresaODS = await prisma.empresaODS.upsert({
     *   create: {
     *     // ... data to create a EmpresaODS
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EmpresaODS we want to update
     *   }
     * })
     */
    upsert<T extends EmpresaODSUpsertArgs>(args: SelectSubset<T, EmpresaODSUpsertArgs<ExtArgs>>): Prisma__EmpresaODSClient<$Result.GetResult<Prisma.$EmpresaODSPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EmpresaODS.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmpresaODSCountArgs} args - Arguments to filter EmpresaODS to count.
     * @example
     * // Count the number of EmpresaODS
     * const count = await prisma.empresaODS.count({
     *   where: {
     *     // ... the filter for the EmpresaODS we want to count
     *   }
     * })
    **/
    count<T extends EmpresaODSCountArgs>(
      args?: Subset<T, EmpresaODSCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmpresaODSCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EmpresaODS.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmpresaODSAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EmpresaODSAggregateArgs>(args: Subset<T, EmpresaODSAggregateArgs>): Prisma.PrismaPromise<GetEmpresaODSAggregateType<T>>

    /**
     * Group by EmpresaODS.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmpresaODSGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EmpresaODSGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmpresaODSGroupByArgs['orderBy'] }
        : { orderBy?: EmpresaODSGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EmpresaODSGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmpresaODSGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EmpresaODS model
   */
  readonly fields: EmpresaODSFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EmpresaODS.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EmpresaODSClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    empresa<T extends EmpresaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EmpresaDefaultArgs<ExtArgs>>): Prisma__EmpresaClient<$Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    ods<T extends ODSDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ODSDefaultArgs<ExtArgs>>): Prisma__ODSClient<$Result.GetResult<Prisma.$ODSPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the EmpresaODS model
   */
  interface EmpresaODSFieldRefs {
    readonly empresaId: FieldRef<"EmpresaODS", 'Int'>
    readonly odsId: FieldRef<"EmpresaODS", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * EmpresaODS findUnique
   */
  export type EmpresaODSFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmpresaODS
     */
    select?: EmpresaODSSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmpresaODS
     */
    omit?: EmpresaODSOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmpresaODSInclude<ExtArgs> | null
    /**
     * Filter, which EmpresaODS to fetch.
     */
    where: EmpresaODSWhereUniqueInput
  }

  /**
   * EmpresaODS findUniqueOrThrow
   */
  export type EmpresaODSFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmpresaODS
     */
    select?: EmpresaODSSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmpresaODS
     */
    omit?: EmpresaODSOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmpresaODSInclude<ExtArgs> | null
    /**
     * Filter, which EmpresaODS to fetch.
     */
    where: EmpresaODSWhereUniqueInput
  }

  /**
   * EmpresaODS findFirst
   */
  export type EmpresaODSFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmpresaODS
     */
    select?: EmpresaODSSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmpresaODS
     */
    omit?: EmpresaODSOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmpresaODSInclude<ExtArgs> | null
    /**
     * Filter, which EmpresaODS to fetch.
     */
    where?: EmpresaODSWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmpresaODS to fetch.
     */
    orderBy?: EmpresaODSOrderByWithRelationInput | EmpresaODSOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmpresaODS.
     */
    cursor?: EmpresaODSWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmpresaODS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmpresaODS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmpresaODS.
     */
    distinct?: EmpresaODSScalarFieldEnum | EmpresaODSScalarFieldEnum[]
  }

  /**
   * EmpresaODS findFirstOrThrow
   */
  export type EmpresaODSFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmpresaODS
     */
    select?: EmpresaODSSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmpresaODS
     */
    omit?: EmpresaODSOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmpresaODSInclude<ExtArgs> | null
    /**
     * Filter, which EmpresaODS to fetch.
     */
    where?: EmpresaODSWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmpresaODS to fetch.
     */
    orderBy?: EmpresaODSOrderByWithRelationInput | EmpresaODSOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmpresaODS.
     */
    cursor?: EmpresaODSWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmpresaODS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmpresaODS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmpresaODS.
     */
    distinct?: EmpresaODSScalarFieldEnum | EmpresaODSScalarFieldEnum[]
  }

  /**
   * EmpresaODS findMany
   */
  export type EmpresaODSFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmpresaODS
     */
    select?: EmpresaODSSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmpresaODS
     */
    omit?: EmpresaODSOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmpresaODSInclude<ExtArgs> | null
    /**
     * Filter, which EmpresaODS to fetch.
     */
    where?: EmpresaODSWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmpresaODS to fetch.
     */
    orderBy?: EmpresaODSOrderByWithRelationInput | EmpresaODSOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EmpresaODS.
     */
    cursor?: EmpresaODSWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmpresaODS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmpresaODS.
     */
    skip?: number
    distinct?: EmpresaODSScalarFieldEnum | EmpresaODSScalarFieldEnum[]
  }

  /**
   * EmpresaODS create
   */
  export type EmpresaODSCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmpresaODS
     */
    select?: EmpresaODSSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmpresaODS
     */
    omit?: EmpresaODSOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmpresaODSInclude<ExtArgs> | null
    /**
     * The data needed to create a EmpresaODS.
     */
    data: XOR<EmpresaODSCreateInput, EmpresaODSUncheckedCreateInput>
  }

  /**
   * EmpresaODS createMany
   */
  export type EmpresaODSCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EmpresaODS.
     */
    data: EmpresaODSCreateManyInput | EmpresaODSCreateManyInput[]
  }

  /**
   * EmpresaODS createManyAndReturn
   */
  export type EmpresaODSCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmpresaODS
     */
    select?: EmpresaODSSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EmpresaODS
     */
    omit?: EmpresaODSOmit<ExtArgs> | null
    /**
     * The data used to create many EmpresaODS.
     */
    data: EmpresaODSCreateManyInput | EmpresaODSCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmpresaODSIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * EmpresaODS update
   */
  export type EmpresaODSUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmpresaODS
     */
    select?: EmpresaODSSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmpresaODS
     */
    omit?: EmpresaODSOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmpresaODSInclude<ExtArgs> | null
    /**
     * The data needed to update a EmpresaODS.
     */
    data: XOR<EmpresaODSUpdateInput, EmpresaODSUncheckedUpdateInput>
    /**
     * Choose, which EmpresaODS to update.
     */
    where: EmpresaODSWhereUniqueInput
  }

  /**
   * EmpresaODS updateMany
   */
  export type EmpresaODSUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EmpresaODS.
     */
    data: XOR<EmpresaODSUpdateManyMutationInput, EmpresaODSUncheckedUpdateManyInput>
    /**
     * Filter which EmpresaODS to update
     */
    where?: EmpresaODSWhereInput
    /**
     * Limit how many EmpresaODS to update.
     */
    limit?: number
  }

  /**
   * EmpresaODS updateManyAndReturn
   */
  export type EmpresaODSUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmpresaODS
     */
    select?: EmpresaODSSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EmpresaODS
     */
    omit?: EmpresaODSOmit<ExtArgs> | null
    /**
     * The data used to update EmpresaODS.
     */
    data: XOR<EmpresaODSUpdateManyMutationInput, EmpresaODSUncheckedUpdateManyInput>
    /**
     * Filter which EmpresaODS to update
     */
    where?: EmpresaODSWhereInput
    /**
     * Limit how many EmpresaODS to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmpresaODSIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * EmpresaODS upsert
   */
  export type EmpresaODSUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmpresaODS
     */
    select?: EmpresaODSSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmpresaODS
     */
    omit?: EmpresaODSOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmpresaODSInclude<ExtArgs> | null
    /**
     * The filter to search for the EmpresaODS to update in case it exists.
     */
    where: EmpresaODSWhereUniqueInput
    /**
     * In case the EmpresaODS found by the `where` argument doesn't exist, create a new EmpresaODS with this data.
     */
    create: XOR<EmpresaODSCreateInput, EmpresaODSUncheckedCreateInput>
    /**
     * In case the EmpresaODS was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EmpresaODSUpdateInput, EmpresaODSUncheckedUpdateInput>
  }

  /**
   * EmpresaODS delete
   */
  export type EmpresaODSDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmpresaODS
     */
    select?: EmpresaODSSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmpresaODS
     */
    omit?: EmpresaODSOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmpresaODSInclude<ExtArgs> | null
    /**
     * Filter which EmpresaODS to delete.
     */
    where: EmpresaODSWhereUniqueInput
  }

  /**
   * EmpresaODS deleteMany
   */
  export type EmpresaODSDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmpresaODS to delete
     */
    where?: EmpresaODSWhereInput
    /**
     * Limit how many EmpresaODS to delete.
     */
    limit?: number
  }

  /**
   * EmpresaODS without action
   */
  export type EmpresaODSDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmpresaODS
     */
    select?: EmpresaODSSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmpresaODS
     */
    omit?: EmpresaODSOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmpresaODSInclude<ExtArgs> | null
  }


  /**
   * Model Acao
   */

  export type AggregateAcao = {
    _count: AcaoCountAggregateOutputType | null
    _avg: AcaoAvgAggregateOutputType | null
    _sum: AcaoSumAggregateOutputType | null
    _min: AcaoMinAggregateOutputType | null
    _max: AcaoMaxAggregateOutputType | null
  }

  export type AcaoAvgAggregateOutputType = {
    id: number | null
  }

  export type AcaoSumAggregateOutputType = {
    id: number | null
  }

  export type AcaoMinAggregateOutputType = {
    id: number | null
    nome: string | null
    notaFiscal: string | null
    ong: string | null
  }

  export type AcaoMaxAggregateOutputType = {
    id: number | null
    nome: string | null
    notaFiscal: string | null
    ong: string | null
  }

  export type AcaoCountAggregateOutputType = {
    id: number
    nome: number
    notaFiscal: number
    ong: number
    _all: number
  }


  export type AcaoAvgAggregateInputType = {
    id?: true
  }

  export type AcaoSumAggregateInputType = {
    id?: true
  }

  export type AcaoMinAggregateInputType = {
    id?: true
    nome?: true
    notaFiscal?: true
    ong?: true
  }

  export type AcaoMaxAggregateInputType = {
    id?: true
    nome?: true
    notaFiscal?: true
    ong?: true
  }

  export type AcaoCountAggregateInputType = {
    id?: true
    nome?: true
    notaFiscal?: true
    ong?: true
    _all?: true
  }

  export type AcaoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Acao to aggregate.
     */
    where?: AcaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Acaos to fetch.
     */
    orderBy?: AcaoOrderByWithRelationInput | AcaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AcaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Acaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Acaos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Acaos
    **/
    _count?: true | AcaoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AcaoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AcaoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AcaoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AcaoMaxAggregateInputType
  }

  export type GetAcaoAggregateType<T extends AcaoAggregateArgs> = {
        [P in keyof T & keyof AggregateAcao]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAcao[P]>
      : GetScalarType<T[P], AggregateAcao[P]>
  }




  export type AcaoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AcaoWhereInput
    orderBy?: AcaoOrderByWithAggregationInput | AcaoOrderByWithAggregationInput[]
    by: AcaoScalarFieldEnum[] | AcaoScalarFieldEnum
    having?: AcaoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AcaoCountAggregateInputType | true
    _avg?: AcaoAvgAggregateInputType
    _sum?: AcaoSumAggregateInputType
    _min?: AcaoMinAggregateInputType
    _max?: AcaoMaxAggregateInputType
  }

  export type AcaoGroupByOutputType = {
    id: number
    nome: string | null
    notaFiscal: string | null
    ong: string
    _count: AcaoCountAggregateOutputType | null
    _avg: AcaoAvgAggregateOutputType | null
    _sum: AcaoSumAggregateOutputType | null
    _min: AcaoMinAggregateOutputType | null
    _max: AcaoMaxAggregateOutputType | null
  }

  type GetAcaoGroupByPayload<T extends AcaoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AcaoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AcaoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AcaoGroupByOutputType[P]>
            : GetScalarType<T[P], AcaoGroupByOutputType[P]>
        }
      >
    >


  export type AcaoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    notaFiscal?: boolean
    ong?: boolean
    empresas?: boolean | Acao$empresasArgs<ExtArgs>
    _count?: boolean | AcaoCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["acao"]>

  export type AcaoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    notaFiscal?: boolean
    ong?: boolean
  }, ExtArgs["result"]["acao"]>

  export type AcaoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    notaFiscal?: boolean
    ong?: boolean
  }, ExtArgs["result"]["acao"]>

  export type AcaoSelectScalar = {
    id?: boolean
    nome?: boolean
    notaFiscal?: boolean
    ong?: boolean
  }

  export type AcaoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nome" | "notaFiscal" | "ong", ExtArgs["result"]["acao"]>
  export type AcaoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    empresas?: boolean | Acao$empresasArgs<ExtArgs>
    _count?: boolean | AcaoCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AcaoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type AcaoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $AcaoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Acao"
    objects: {
      empresas: Prisma.$EmpresaPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      nome: string | null
      notaFiscal: string | null
      ong: string
    }, ExtArgs["result"]["acao"]>
    composites: {}
  }

  type AcaoGetPayload<S extends boolean | null | undefined | AcaoDefaultArgs> = $Result.GetResult<Prisma.$AcaoPayload, S>

  type AcaoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AcaoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AcaoCountAggregateInputType | true
    }

  export interface AcaoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Acao'], meta: { name: 'Acao' } }
    /**
     * Find zero or one Acao that matches the filter.
     * @param {AcaoFindUniqueArgs} args - Arguments to find a Acao
     * @example
     * // Get one Acao
     * const acao = await prisma.acao.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AcaoFindUniqueArgs>(args: SelectSubset<T, AcaoFindUniqueArgs<ExtArgs>>): Prisma__AcaoClient<$Result.GetResult<Prisma.$AcaoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Acao that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AcaoFindUniqueOrThrowArgs} args - Arguments to find a Acao
     * @example
     * // Get one Acao
     * const acao = await prisma.acao.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AcaoFindUniqueOrThrowArgs>(args: SelectSubset<T, AcaoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AcaoClient<$Result.GetResult<Prisma.$AcaoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Acao that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcaoFindFirstArgs} args - Arguments to find a Acao
     * @example
     * // Get one Acao
     * const acao = await prisma.acao.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AcaoFindFirstArgs>(args?: SelectSubset<T, AcaoFindFirstArgs<ExtArgs>>): Prisma__AcaoClient<$Result.GetResult<Prisma.$AcaoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Acao that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcaoFindFirstOrThrowArgs} args - Arguments to find a Acao
     * @example
     * // Get one Acao
     * const acao = await prisma.acao.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AcaoFindFirstOrThrowArgs>(args?: SelectSubset<T, AcaoFindFirstOrThrowArgs<ExtArgs>>): Prisma__AcaoClient<$Result.GetResult<Prisma.$AcaoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Acaos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcaoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Acaos
     * const acaos = await prisma.acao.findMany()
     * 
     * // Get first 10 Acaos
     * const acaos = await prisma.acao.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const acaoWithIdOnly = await prisma.acao.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AcaoFindManyArgs>(args?: SelectSubset<T, AcaoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AcaoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Acao.
     * @param {AcaoCreateArgs} args - Arguments to create a Acao.
     * @example
     * // Create one Acao
     * const Acao = await prisma.acao.create({
     *   data: {
     *     // ... data to create a Acao
     *   }
     * })
     * 
     */
    create<T extends AcaoCreateArgs>(args: SelectSubset<T, AcaoCreateArgs<ExtArgs>>): Prisma__AcaoClient<$Result.GetResult<Prisma.$AcaoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Acaos.
     * @param {AcaoCreateManyArgs} args - Arguments to create many Acaos.
     * @example
     * // Create many Acaos
     * const acao = await prisma.acao.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AcaoCreateManyArgs>(args?: SelectSubset<T, AcaoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Acaos and returns the data saved in the database.
     * @param {AcaoCreateManyAndReturnArgs} args - Arguments to create many Acaos.
     * @example
     * // Create many Acaos
     * const acao = await prisma.acao.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Acaos and only return the `id`
     * const acaoWithIdOnly = await prisma.acao.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AcaoCreateManyAndReturnArgs>(args?: SelectSubset<T, AcaoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AcaoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Acao.
     * @param {AcaoDeleteArgs} args - Arguments to delete one Acao.
     * @example
     * // Delete one Acao
     * const Acao = await prisma.acao.delete({
     *   where: {
     *     // ... filter to delete one Acao
     *   }
     * })
     * 
     */
    delete<T extends AcaoDeleteArgs>(args: SelectSubset<T, AcaoDeleteArgs<ExtArgs>>): Prisma__AcaoClient<$Result.GetResult<Prisma.$AcaoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Acao.
     * @param {AcaoUpdateArgs} args - Arguments to update one Acao.
     * @example
     * // Update one Acao
     * const acao = await prisma.acao.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AcaoUpdateArgs>(args: SelectSubset<T, AcaoUpdateArgs<ExtArgs>>): Prisma__AcaoClient<$Result.GetResult<Prisma.$AcaoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Acaos.
     * @param {AcaoDeleteManyArgs} args - Arguments to filter Acaos to delete.
     * @example
     * // Delete a few Acaos
     * const { count } = await prisma.acao.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AcaoDeleteManyArgs>(args?: SelectSubset<T, AcaoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Acaos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcaoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Acaos
     * const acao = await prisma.acao.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AcaoUpdateManyArgs>(args: SelectSubset<T, AcaoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Acaos and returns the data updated in the database.
     * @param {AcaoUpdateManyAndReturnArgs} args - Arguments to update many Acaos.
     * @example
     * // Update many Acaos
     * const acao = await prisma.acao.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Acaos and only return the `id`
     * const acaoWithIdOnly = await prisma.acao.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AcaoUpdateManyAndReturnArgs>(args: SelectSubset<T, AcaoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AcaoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Acao.
     * @param {AcaoUpsertArgs} args - Arguments to update or create a Acao.
     * @example
     * // Update or create a Acao
     * const acao = await prisma.acao.upsert({
     *   create: {
     *     // ... data to create a Acao
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Acao we want to update
     *   }
     * })
     */
    upsert<T extends AcaoUpsertArgs>(args: SelectSubset<T, AcaoUpsertArgs<ExtArgs>>): Prisma__AcaoClient<$Result.GetResult<Prisma.$AcaoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Acaos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcaoCountArgs} args - Arguments to filter Acaos to count.
     * @example
     * // Count the number of Acaos
     * const count = await prisma.acao.count({
     *   where: {
     *     // ... the filter for the Acaos we want to count
     *   }
     * })
    **/
    count<T extends AcaoCountArgs>(
      args?: Subset<T, AcaoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AcaoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Acao.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcaoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AcaoAggregateArgs>(args: Subset<T, AcaoAggregateArgs>): Prisma.PrismaPromise<GetAcaoAggregateType<T>>

    /**
     * Group by Acao.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcaoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AcaoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AcaoGroupByArgs['orderBy'] }
        : { orderBy?: AcaoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AcaoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAcaoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Acao model
   */
  readonly fields: AcaoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Acao.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AcaoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    empresas<T extends Acao$empresasArgs<ExtArgs> = {}>(args?: Subset<T, Acao$empresasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Acao model
   */
  interface AcaoFieldRefs {
    readonly id: FieldRef<"Acao", 'Int'>
    readonly nome: FieldRef<"Acao", 'String'>
    readonly notaFiscal: FieldRef<"Acao", 'String'>
    readonly ong: FieldRef<"Acao", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Acao findUnique
   */
  export type AcaoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Acao
     */
    select?: AcaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Acao
     */
    omit?: AcaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcaoInclude<ExtArgs> | null
    /**
     * Filter, which Acao to fetch.
     */
    where: AcaoWhereUniqueInput
  }

  /**
   * Acao findUniqueOrThrow
   */
  export type AcaoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Acao
     */
    select?: AcaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Acao
     */
    omit?: AcaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcaoInclude<ExtArgs> | null
    /**
     * Filter, which Acao to fetch.
     */
    where: AcaoWhereUniqueInput
  }

  /**
   * Acao findFirst
   */
  export type AcaoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Acao
     */
    select?: AcaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Acao
     */
    omit?: AcaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcaoInclude<ExtArgs> | null
    /**
     * Filter, which Acao to fetch.
     */
    where?: AcaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Acaos to fetch.
     */
    orderBy?: AcaoOrderByWithRelationInput | AcaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Acaos.
     */
    cursor?: AcaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Acaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Acaos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Acaos.
     */
    distinct?: AcaoScalarFieldEnum | AcaoScalarFieldEnum[]
  }

  /**
   * Acao findFirstOrThrow
   */
  export type AcaoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Acao
     */
    select?: AcaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Acao
     */
    omit?: AcaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcaoInclude<ExtArgs> | null
    /**
     * Filter, which Acao to fetch.
     */
    where?: AcaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Acaos to fetch.
     */
    orderBy?: AcaoOrderByWithRelationInput | AcaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Acaos.
     */
    cursor?: AcaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Acaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Acaos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Acaos.
     */
    distinct?: AcaoScalarFieldEnum | AcaoScalarFieldEnum[]
  }

  /**
   * Acao findMany
   */
  export type AcaoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Acao
     */
    select?: AcaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Acao
     */
    omit?: AcaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcaoInclude<ExtArgs> | null
    /**
     * Filter, which Acaos to fetch.
     */
    where?: AcaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Acaos to fetch.
     */
    orderBy?: AcaoOrderByWithRelationInput | AcaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Acaos.
     */
    cursor?: AcaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Acaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Acaos.
     */
    skip?: number
    distinct?: AcaoScalarFieldEnum | AcaoScalarFieldEnum[]
  }

  /**
   * Acao create
   */
  export type AcaoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Acao
     */
    select?: AcaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Acao
     */
    omit?: AcaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcaoInclude<ExtArgs> | null
    /**
     * The data needed to create a Acao.
     */
    data: XOR<AcaoCreateInput, AcaoUncheckedCreateInput>
  }

  /**
   * Acao createMany
   */
  export type AcaoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Acaos.
     */
    data: AcaoCreateManyInput | AcaoCreateManyInput[]
  }

  /**
   * Acao createManyAndReturn
   */
  export type AcaoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Acao
     */
    select?: AcaoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Acao
     */
    omit?: AcaoOmit<ExtArgs> | null
    /**
     * The data used to create many Acaos.
     */
    data: AcaoCreateManyInput | AcaoCreateManyInput[]
  }

  /**
   * Acao update
   */
  export type AcaoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Acao
     */
    select?: AcaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Acao
     */
    omit?: AcaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcaoInclude<ExtArgs> | null
    /**
     * The data needed to update a Acao.
     */
    data: XOR<AcaoUpdateInput, AcaoUncheckedUpdateInput>
    /**
     * Choose, which Acao to update.
     */
    where: AcaoWhereUniqueInput
  }

  /**
   * Acao updateMany
   */
  export type AcaoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Acaos.
     */
    data: XOR<AcaoUpdateManyMutationInput, AcaoUncheckedUpdateManyInput>
    /**
     * Filter which Acaos to update
     */
    where?: AcaoWhereInput
    /**
     * Limit how many Acaos to update.
     */
    limit?: number
  }

  /**
   * Acao updateManyAndReturn
   */
  export type AcaoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Acao
     */
    select?: AcaoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Acao
     */
    omit?: AcaoOmit<ExtArgs> | null
    /**
     * The data used to update Acaos.
     */
    data: XOR<AcaoUpdateManyMutationInput, AcaoUncheckedUpdateManyInput>
    /**
     * Filter which Acaos to update
     */
    where?: AcaoWhereInput
    /**
     * Limit how many Acaos to update.
     */
    limit?: number
  }

  /**
   * Acao upsert
   */
  export type AcaoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Acao
     */
    select?: AcaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Acao
     */
    omit?: AcaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcaoInclude<ExtArgs> | null
    /**
     * The filter to search for the Acao to update in case it exists.
     */
    where: AcaoWhereUniqueInput
    /**
     * In case the Acao found by the `where` argument doesn't exist, create a new Acao with this data.
     */
    create: XOR<AcaoCreateInput, AcaoUncheckedCreateInput>
    /**
     * In case the Acao was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AcaoUpdateInput, AcaoUncheckedUpdateInput>
  }

  /**
   * Acao delete
   */
  export type AcaoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Acao
     */
    select?: AcaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Acao
     */
    omit?: AcaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcaoInclude<ExtArgs> | null
    /**
     * Filter which Acao to delete.
     */
    where: AcaoWhereUniqueInput
  }

  /**
   * Acao deleteMany
   */
  export type AcaoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Acaos to delete
     */
    where?: AcaoWhereInput
    /**
     * Limit how many Acaos to delete.
     */
    limit?: number
  }

  /**
   * Acao.empresas
   */
  export type Acao$empresasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Empresa
     */
    select?: EmpresaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Empresa
     */
    omit?: EmpresaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmpresaInclude<ExtArgs> | null
    where?: EmpresaWhereInput
    orderBy?: EmpresaOrderByWithRelationInput | EmpresaOrderByWithRelationInput[]
    cursor?: EmpresaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EmpresaScalarFieldEnum | EmpresaScalarFieldEnum[]
  }

  /**
   * Acao without action
   */
  export type AcaoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Acao
     */
    select?: AcaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Acao
     */
    omit?: AcaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcaoInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const EmpresaScalarFieldEnum: {
    id: 'id',
    nome: 'nome',
    cnpj: 'cnpj',
    email: 'email',
    senha: 'senha',
    colaboradores: 'colaboradores',
    pontos: 'pontos',
    selo: 'selo'
  };

  export type EmpresaScalarFieldEnum = (typeof EmpresaScalarFieldEnum)[keyof typeof EmpresaScalarFieldEnum]


  export const ODSScalarFieldEnum: {
    id: 'id',
    titulo: 'titulo'
  };

  export type ODSScalarFieldEnum = (typeof ODSScalarFieldEnum)[keyof typeof ODSScalarFieldEnum]


  export const EmpresaODSScalarFieldEnum: {
    empresaId: 'empresaId',
    odsId: 'odsId'
  };

  export type EmpresaODSScalarFieldEnum = (typeof EmpresaODSScalarFieldEnum)[keyof typeof EmpresaODSScalarFieldEnum]


  export const AcaoScalarFieldEnum: {
    id: 'id',
    nome: 'nome',
    notaFiscal: 'notaFiscal',
    ong: 'ong'
  };

  export type AcaoScalarFieldEnum = (typeof AcaoScalarFieldEnum)[keyof typeof AcaoScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type EmpresaWhereInput = {
    AND?: EmpresaWhereInput | EmpresaWhereInput[]
    OR?: EmpresaWhereInput[]
    NOT?: EmpresaWhereInput | EmpresaWhereInput[]
    id?: IntFilter<"Empresa"> | number
    nome?: StringNullableFilter<"Empresa"> | string | null
    cnpj?: StringNullableFilter<"Empresa"> | string | null
    email?: StringNullableFilter<"Empresa"> | string | null
    senha?: StringNullableFilter<"Empresa"> | string | null
    colaboradores?: IntNullableFilter<"Empresa"> | number | null
    pontos?: IntNullableFilter<"Empresa"> | number | null
    selo?: StringNullableFilter<"Empresa"> | string | null
    acoes?: AcaoListRelationFilter
    ods?: EmpresaODSListRelationFilter
  }

  export type EmpresaOrderByWithRelationInput = {
    id?: SortOrder
    nome?: SortOrderInput | SortOrder
    cnpj?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    senha?: SortOrderInput | SortOrder
    colaboradores?: SortOrderInput | SortOrder
    pontos?: SortOrderInput | SortOrder
    selo?: SortOrderInput | SortOrder
    acoes?: AcaoOrderByRelationAggregateInput
    ods?: EmpresaODSOrderByRelationAggregateInput
  }

  export type EmpresaWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: EmpresaWhereInput | EmpresaWhereInput[]
    OR?: EmpresaWhereInput[]
    NOT?: EmpresaWhereInput | EmpresaWhereInput[]
    nome?: StringNullableFilter<"Empresa"> | string | null
    cnpj?: StringNullableFilter<"Empresa"> | string | null
    email?: StringNullableFilter<"Empresa"> | string | null
    senha?: StringNullableFilter<"Empresa"> | string | null
    colaboradores?: IntNullableFilter<"Empresa"> | number | null
    pontos?: IntNullableFilter<"Empresa"> | number | null
    selo?: StringNullableFilter<"Empresa"> | string | null
    acoes?: AcaoListRelationFilter
    ods?: EmpresaODSListRelationFilter
  }, "id">

  export type EmpresaOrderByWithAggregationInput = {
    id?: SortOrder
    nome?: SortOrderInput | SortOrder
    cnpj?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    senha?: SortOrderInput | SortOrder
    colaboradores?: SortOrderInput | SortOrder
    pontos?: SortOrderInput | SortOrder
    selo?: SortOrderInput | SortOrder
    _count?: EmpresaCountOrderByAggregateInput
    _avg?: EmpresaAvgOrderByAggregateInput
    _max?: EmpresaMaxOrderByAggregateInput
    _min?: EmpresaMinOrderByAggregateInput
    _sum?: EmpresaSumOrderByAggregateInput
  }

  export type EmpresaScalarWhereWithAggregatesInput = {
    AND?: EmpresaScalarWhereWithAggregatesInput | EmpresaScalarWhereWithAggregatesInput[]
    OR?: EmpresaScalarWhereWithAggregatesInput[]
    NOT?: EmpresaScalarWhereWithAggregatesInput | EmpresaScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Empresa"> | number
    nome?: StringNullableWithAggregatesFilter<"Empresa"> | string | null
    cnpj?: StringNullableWithAggregatesFilter<"Empresa"> | string | null
    email?: StringNullableWithAggregatesFilter<"Empresa"> | string | null
    senha?: StringNullableWithAggregatesFilter<"Empresa"> | string | null
    colaboradores?: IntNullableWithAggregatesFilter<"Empresa"> | number | null
    pontos?: IntNullableWithAggregatesFilter<"Empresa"> | number | null
    selo?: StringNullableWithAggregatesFilter<"Empresa"> | string | null
  }

  export type ODSWhereInput = {
    AND?: ODSWhereInput | ODSWhereInput[]
    OR?: ODSWhereInput[]
    NOT?: ODSWhereInput | ODSWhereInput[]
    id?: IntFilter<"ODS"> | number
    titulo?: StringFilter<"ODS"> | string
    empresas?: EmpresaODSListRelationFilter
  }

  export type ODSOrderByWithRelationInput = {
    id?: SortOrder
    titulo?: SortOrder
    empresas?: EmpresaODSOrderByRelationAggregateInput
  }

  export type ODSWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ODSWhereInput | ODSWhereInput[]
    OR?: ODSWhereInput[]
    NOT?: ODSWhereInput | ODSWhereInput[]
    titulo?: StringFilter<"ODS"> | string
    empresas?: EmpresaODSListRelationFilter
  }, "id">

  export type ODSOrderByWithAggregationInput = {
    id?: SortOrder
    titulo?: SortOrder
    _count?: ODSCountOrderByAggregateInput
    _avg?: ODSAvgOrderByAggregateInput
    _max?: ODSMaxOrderByAggregateInput
    _min?: ODSMinOrderByAggregateInput
    _sum?: ODSSumOrderByAggregateInput
  }

  export type ODSScalarWhereWithAggregatesInput = {
    AND?: ODSScalarWhereWithAggregatesInput | ODSScalarWhereWithAggregatesInput[]
    OR?: ODSScalarWhereWithAggregatesInput[]
    NOT?: ODSScalarWhereWithAggregatesInput | ODSScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ODS"> | number
    titulo?: StringWithAggregatesFilter<"ODS"> | string
  }

  export type EmpresaODSWhereInput = {
    AND?: EmpresaODSWhereInput | EmpresaODSWhereInput[]
    OR?: EmpresaODSWhereInput[]
    NOT?: EmpresaODSWhereInput | EmpresaODSWhereInput[]
    empresaId?: IntFilter<"EmpresaODS"> | number
    odsId?: IntFilter<"EmpresaODS"> | number
    empresa?: XOR<EmpresaScalarRelationFilter, EmpresaWhereInput>
    ods?: XOR<ODSScalarRelationFilter, ODSWhereInput>
  }

  export type EmpresaODSOrderByWithRelationInput = {
    empresaId?: SortOrder
    odsId?: SortOrder
    empresa?: EmpresaOrderByWithRelationInput
    ods?: ODSOrderByWithRelationInput
  }

  export type EmpresaODSWhereUniqueInput = Prisma.AtLeast<{
    empresaId_odsId?: EmpresaODSEmpresaIdOdsIdCompoundUniqueInput
    AND?: EmpresaODSWhereInput | EmpresaODSWhereInput[]
    OR?: EmpresaODSWhereInput[]
    NOT?: EmpresaODSWhereInput | EmpresaODSWhereInput[]
    empresaId?: IntFilter<"EmpresaODS"> | number
    odsId?: IntFilter<"EmpresaODS"> | number
    empresa?: XOR<EmpresaScalarRelationFilter, EmpresaWhereInput>
    ods?: XOR<ODSScalarRelationFilter, ODSWhereInput>
  }, "empresaId_odsId">

  export type EmpresaODSOrderByWithAggregationInput = {
    empresaId?: SortOrder
    odsId?: SortOrder
    _count?: EmpresaODSCountOrderByAggregateInput
    _avg?: EmpresaODSAvgOrderByAggregateInput
    _max?: EmpresaODSMaxOrderByAggregateInput
    _min?: EmpresaODSMinOrderByAggregateInput
    _sum?: EmpresaODSSumOrderByAggregateInput
  }

  export type EmpresaODSScalarWhereWithAggregatesInput = {
    AND?: EmpresaODSScalarWhereWithAggregatesInput | EmpresaODSScalarWhereWithAggregatesInput[]
    OR?: EmpresaODSScalarWhereWithAggregatesInput[]
    NOT?: EmpresaODSScalarWhereWithAggregatesInput | EmpresaODSScalarWhereWithAggregatesInput[]
    empresaId?: IntWithAggregatesFilter<"EmpresaODS"> | number
    odsId?: IntWithAggregatesFilter<"EmpresaODS"> | number
  }

  export type AcaoWhereInput = {
    AND?: AcaoWhereInput | AcaoWhereInput[]
    OR?: AcaoWhereInput[]
    NOT?: AcaoWhereInput | AcaoWhereInput[]
    id?: IntFilter<"Acao"> | number
    nome?: StringNullableFilter<"Acao"> | string | null
    notaFiscal?: StringNullableFilter<"Acao"> | string | null
    ong?: StringFilter<"Acao"> | string
    empresas?: EmpresaListRelationFilter
  }

  export type AcaoOrderByWithRelationInput = {
    id?: SortOrder
    nome?: SortOrderInput | SortOrder
    notaFiscal?: SortOrderInput | SortOrder
    ong?: SortOrder
    empresas?: EmpresaOrderByRelationAggregateInput
  }

  export type AcaoWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: AcaoWhereInput | AcaoWhereInput[]
    OR?: AcaoWhereInput[]
    NOT?: AcaoWhereInput | AcaoWhereInput[]
    nome?: StringNullableFilter<"Acao"> | string | null
    notaFiscal?: StringNullableFilter<"Acao"> | string | null
    ong?: StringFilter<"Acao"> | string
    empresas?: EmpresaListRelationFilter
  }, "id">

  export type AcaoOrderByWithAggregationInput = {
    id?: SortOrder
    nome?: SortOrderInput | SortOrder
    notaFiscal?: SortOrderInput | SortOrder
    ong?: SortOrder
    _count?: AcaoCountOrderByAggregateInput
    _avg?: AcaoAvgOrderByAggregateInput
    _max?: AcaoMaxOrderByAggregateInput
    _min?: AcaoMinOrderByAggregateInput
    _sum?: AcaoSumOrderByAggregateInput
  }

  export type AcaoScalarWhereWithAggregatesInput = {
    AND?: AcaoScalarWhereWithAggregatesInput | AcaoScalarWhereWithAggregatesInput[]
    OR?: AcaoScalarWhereWithAggregatesInput[]
    NOT?: AcaoScalarWhereWithAggregatesInput | AcaoScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Acao"> | number
    nome?: StringNullableWithAggregatesFilter<"Acao"> | string | null
    notaFiscal?: StringNullableWithAggregatesFilter<"Acao"> | string | null
    ong?: StringWithAggregatesFilter<"Acao"> | string
  }

  export type EmpresaCreateInput = {
    nome?: string | null
    cnpj?: string | null
    email?: string | null
    senha?: string | null
    colaboradores?: number | null
    pontos?: number | null
    selo?: string | null
    acoes?: AcaoCreateNestedManyWithoutEmpresasInput
    ods?: EmpresaODSCreateNestedManyWithoutEmpresaInput
  }

  export type EmpresaUncheckedCreateInput = {
    id?: number
    nome?: string | null
    cnpj?: string | null
    email?: string | null
    senha?: string | null
    colaboradores?: number | null
    pontos?: number | null
    selo?: string | null
    acoes?: AcaoUncheckedCreateNestedManyWithoutEmpresasInput
    ods?: EmpresaODSUncheckedCreateNestedManyWithoutEmpresaInput
  }

  export type EmpresaUpdateInput = {
    nome?: NullableStringFieldUpdateOperationsInput | string | null
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    senha?: NullableStringFieldUpdateOperationsInput | string | null
    colaboradores?: NullableIntFieldUpdateOperationsInput | number | null
    pontos?: NullableIntFieldUpdateOperationsInput | number | null
    selo?: NullableStringFieldUpdateOperationsInput | string | null
    acoes?: AcaoUpdateManyWithoutEmpresasNestedInput
    ods?: EmpresaODSUpdateManyWithoutEmpresaNestedInput
  }

  export type EmpresaUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: NullableStringFieldUpdateOperationsInput | string | null
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    senha?: NullableStringFieldUpdateOperationsInput | string | null
    colaboradores?: NullableIntFieldUpdateOperationsInput | number | null
    pontos?: NullableIntFieldUpdateOperationsInput | number | null
    selo?: NullableStringFieldUpdateOperationsInput | string | null
    acoes?: AcaoUncheckedUpdateManyWithoutEmpresasNestedInput
    ods?: EmpresaODSUncheckedUpdateManyWithoutEmpresaNestedInput
  }

  export type EmpresaCreateManyInput = {
    id?: number
    nome?: string | null
    cnpj?: string | null
    email?: string | null
    senha?: string | null
    colaboradores?: number | null
    pontos?: number | null
    selo?: string | null
  }

  export type EmpresaUpdateManyMutationInput = {
    nome?: NullableStringFieldUpdateOperationsInput | string | null
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    senha?: NullableStringFieldUpdateOperationsInput | string | null
    colaboradores?: NullableIntFieldUpdateOperationsInput | number | null
    pontos?: NullableIntFieldUpdateOperationsInput | number | null
    selo?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EmpresaUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: NullableStringFieldUpdateOperationsInput | string | null
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    senha?: NullableStringFieldUpdateOperationsInput | string | null
    colaboradores?: NullableIntFieldUpdateOperationsInput | number | null
    pontos?: NullableIntFieldUpdateOperationsInput | number | null
    selo?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ODSCreateInput = {
    titulo: string
    empresas?: EmpresaODSCreateNestedManyWithoutOdsInput
  }

  export type ODSUncheckedCreateInput = {
    id?: number
    titulo: string
    empresas?: EmpresaODSUncheckedCreateNestedManyWithoutOdsInput
  }

  export type ODSUpdateInput = {
    titulo?: StringFieldUpdateOperationsInput | string
    empresas?: EmpresaODSUpdateManyWithoutOdsNestedInput
  }

  export type ODSUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    titulo?: StringFieldUpdateOperationsInput | string
    empresas?: EmpresaODSUncheckedUpdateManyWithoutOdsNestedInput
  }

  export type ODSCreateManyInput = {
    id?: number
    titulo: string
  }

  export type ODSUpdateManyMutationInput = {
    titulo?: StringFieldUpdateOperationsInput | string
  }

  export type ODSUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    titulo?: StringFieldUpdateOperationsInput | string
  }

  export type EmpresaODSCreateInput = {
    empresa: EmpresaCreateNestedOneWithoutOdsInput
    ods: ODSCreateNestedOneWithoutEmpresasInput
  }

  export type EmpresaODSUncheckedCreateInput = {
    empresaId: number
    odsId: number
  }

  export type EmpresaODSUpdateInput = {
    empresa?: EmpresaUpdateOneRequiredWithoutOdsNestedInput
    ods?: ODSUpdateOneRequiredWithoutEmpresasNestedInput
  }

  export type EmpresaODSUncheckedUpdateInput = {
    empresaId?: IntFieldUpdateOperationsInput | number
    odsId?: IntFieldUpdateOperationsInput | number
  }

  export type EmpresaODSCreateManyInput = {
    empresaId: number
    odsId: number
  }

  export type EmpresaODSUpdateManyMutationInput = {

  }

  export type EmpresaODSUncheckedUpdateManyInput = {
    empresaId?: IntFieldUpdateOperationsInput | number
    odsId?: IntFieldUpdateOperationsInput | number
  }

  export type AcaoCreateInput = {
    nome?: string | null
    notaFiscal?: string | null
    ong: string
    empresas?: EmpresaCreateNestedManyWithoutAcoesInput
  }

  export type AcaoUncheckedCreateInput = {
    id?: number
    nome?: string | null
    notaFiscal?: string | null
    ong: string
    empresas?: EmpresaUncheckedCreateNestedManyWithoutAcoesInput
  }

  export type AcaoUpdateInput = {
    nome?: NullableStringFieldUpdateOperationsInput | string | null
    notaFiscal?: NullableStringFieldUpdateOperationsInput | string | null
    ong?: StringFieldUpdateOperationsInput | string
    empresas?: EmpresaUpdateManyWithoutAcoesNestedInput
  }

  export type AcaoUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: NullableStringFieldUpdateOperationsInput | string | null
    notaFiscal?: NullableStringFieldUpdateOperationsInput | string | null
    ong?: StringFieldUpdateOperationsInput | string
    empresas?: EmpresaUncheckedUpdateManyWithoutAcoesNestedInput
  }

  export type AcaoCreateManyInput = {
    id?: number
    nome?: string | null
    notaFiscal?: string | null
    ong: string
  }

  export type AcaoUpdateManyMutationInput = {
    nome?: NullableStringFieldUpdateOperationsInput | string | null
    notaFiscal?: NullableStringFieldUpdateOperationsInput | string | null
    ong?: StringFieldUpdateOperationsInput | string
  }

  export type AcaoUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: NullableStringFieldUpdateOperationsInput | string | null
    notaFiscal?: NullableStringFieldUpdateOperationsInput | string | null
    ong?: StringFieldUpdateOperationsInput | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type AcaoListRelationFilter = {
    every?: AcaoWhereInput
    some?: AcaoWhereInput
    none?: AcaoWhereInput
  }

  export type EmpresaODSListRelationFilter = {
    every?: EmpresaODSWhereInput
    some?: EmpresaODSWhereInput
    none?: EmpresaODSWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AcaoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EmpresaODSOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EmpresaCountOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    cnpj?: SortOrder
    email?: SortOrder
    senha?: SortOrder
    colaboradores?: SortOrder
    pontos?: SortOrder
    selo?: SortOrder
  }

  export type EmpresaAvgOrderByAggregateInput = {
    id?: SortOrder
    colaboradores?: SortOrder
    pontos?: SortOrder
  }

  export type EmpresaMaxOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    cnpj?: SortOrder
    email?: SortOrder
    senha?: SortOrder
    colaboradores?: SortOrder
    pontos?: SortOrder
    selo?: SortOrder
  }

  export type EmpresaMinOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    cnpj?: SortOrder
    email?: SortOrder
    senha?: SortOrder
    colaboradores?: SortOrder
    pontos?: SortOrder
    selo?: SortOrder
  }

  export type EmpresaSumOrderByAggregateInput = {
    id?: SortOrder
    colaboradores?: SortOrder
    pontos?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type ODSCountOrderByAggregateInput = {
    id?: SortOrder
    titulo?: SortOrder
  }

  export type ODSAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ODSMaxOrderByAggregateInput = {
    id?: SortOrder
    titulo?: SortOrder
  }

  export type ODSMinOrderByAggregateInput = {
    id?: SortOrder
    titulo?: SortOrder
  }

  export type ODSSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EmpresaScalarRelationFilter = {
    is?: EmpresaWhereInput
    isNot?: EmpresaWhereInput
  }

  export type ODSScalarRelationFilter = {
    is?: ODSWhereInput
    isNot?: ODSWhereInput
  }

  export type EmpresaODSEmpresaIdOdsIdCompoundUniqueInput = {
    empresaId: number
    odsId: number
  }

  export type EmpresaODSCountOrderByAggregateInput = {
    empresaId?: SortOrder
    odsId?: SortOrder
  }

  export type EmpresaODSAvgOrderByAggregateInput = {
    empresaId?: SortOrder
    odsId?: SortOrder
  }

  export type EmpresaODSMaxOrderByAggregateInput = {
    empresaId?: SortOrder
    odsId?: SortOrder
  }

  export type EmpresaODSMinOrderByAggregateInput = {
    empresaId?: SortOrder
    odsId?: SortOrder
  }

  export type EmpresaODSSumOrderByAggregateInput = {
    empresaId?: SortOrder
    odsId?: SortOrder
  }

  export type EmpresaListRelationFilter = {
    every?: EmpresaWhereInput
    some?: EmpresaWhereInput
    none?: EmpresaWhereInput
  }

  export type EmpresaOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AcaoCountOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    notaFiscal?: SortOrder
    ong?: SortOrder
  }

  export type AcaoAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type AcaoMaxOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    notaFiscal?: SortOrder
    ong?: SortOrder
  }

  export type AcaoMinOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    notaFiscal?: SortOrder
    ong?: SortOrder
  }

  export type AcaoSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type AcaoCreateNestedManyWithoutEmpresasInput = {
    create?: XOR<AcaoCreateWithoutEmpresasInput, AcaoUncheckedCreateWithoutEmpresasInput> | AcaoCreateWithoutEmpresasInput[] | AcaoUncheckedCreateWithoutEmpresasInput[]
    connectOrCreate?: AcaoCreateOrConnectWithoutEmpresasInput | AcaoCreateOrConnectWithoutEmpresasInput[]
    connect?: AcaoWhereUniqueInput | AcaoWhereUniqueInput[]
  }

  export type EmpresaODSCreateNestedManyWithoutEmpresaInput = {
    create?: XOR<EmpresaODSCreateWithoutEmpresaInput, EmpresaODSUncheckedCreateWithoutEmpresaInput> | EmpresaODSCreateWithoutEmpresaInput[] | EmpresaODSUncheckedCreateWithoutEmpresaInput[]
    connectOrCreate?: EmpresaODSCreateOrConnectWithoutEmpresaInput | EmpresaODSCreateOrConnectWithoutEmpresaInput[]
    createMany?: EmpresaODSCreateManyEmpresaInputEnvelope
    connect?: EmpresaODSWhereUniqueInput | EmpresaODSWhereUniqueInput[]
  }

  export type AcaoUncheckedCreateNestedManyWithoutEmpresasInput = {
    create?: XOR<AcaoCreateWithoutEmpresasInput, AcaoUncheckedCreateWithoutEmpresasInput> | AcaoCreateWithoutEmpresasInput[] | AcaoUncheckedCreateWithoutEmpresasInput[]
    connectOrCreate?: AcaoCreateOrConnectWithoutEmpresasInput | AcaoCreateOrConnectWithoutEmpresasInput[]
    connect?: AcaoWhereUniqueInput | AcaoWhereUniqueInput[]
  }

  export type EmpresaODSUncheckedCreateNestedManyWithoutEmpresaInput = {
    create?: XOR<EmpresaODSCreateWithoutEmpresaInput, EmpresaODSUncheckedCreateWithoutEmpresaInput> | EmpresaODSCreateWithoutEmpresaInput[] | EmpresaODSUncheckedCreateWithoutEmpresaInput[]
    connectOrCreate?: EmpresaODSCreateOrConnectWithoutEmpresaInput | EmpresaODSCreateOrConnectWithoutEmpresaInput[]
    createMany?: EmpresaODSCreateManyEmpresaInputEnvelope
    connect?: EmpresaODSWhereUniqueInput | EmpresaODSWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type AcaoUpdateManyWithoutEmpresasNestedInput = {
    create?: XOR<AcaoCreateWithoutEmpresasInput, AcaoUncheckedCreateWithoutEmpresasInput> | AcaoCreateWithoutEmpresasInput[] | AcaoUncheckedCreateWithoutEmpresasInput[]
    connectOrCreate?: AcaoCreateOrConnectWithoutEmpresasInput | AcaoCreateOrConnectWithoutEmpresasInput[]
    upsert?: AcaoUpsertWithWhereUniqueWithoutEmpresasInput | AcaoUpsertWithWhereUniqueWithoutEmpresasInput[]
    set?: AcaoWhereUniqueInput | AcaoWhereUniqueInput[]
    disconnect?: AcaoWhereUniqueInput | AcaoWhereUniqueInput[]
    delete?: AcaoWhereUniqueInput | AcaoWhereUniqueInput[]
    connect?: AcaoWhereUniqueInput | AcaoWhereUniqueInput[]
    update?: AcaoUpdateWithWhereUniqueWithoutEmpresasInput | AcaoUpdateWithWhereUniqueWithoutEmpresasInput[]
    updateMany?: AcaoUpdateManyWithWhereWithoutEmpresasInput | AcaoUpdateManyWithWhereWithoutEmpresasInput[]
    deleteMany?: AcaoScalarWhereInput | AcaoScalarWhereInput[]
  }

  export type EmpresaODSUpdateManyWithoutEmpresaNestedInput = {
    create?: XOR<EmpresaODSCreateWithoutEmpresaInput, EmpresaODSUncheckedCreateWithoutEmpresaInput> | EmpresaODSCreateWithoutEmpresaInput[] | EmpresaODSUncheckedCreateWithoutEmpresaInput[]
    connectOrCreate?: EmpresaODSCreateOrConnectWithoutEmpresaInput | EmpresaODSCreateOrConnectWithoutEmpresaInput[]
    upsert?: EmpresaODSUpsertWithWhereUniqueWithoutEmpresaInput | EmpresaODSUpsertWithWhereUniqueWithoutEmpresaInput[]
    createMany?: EmpresaODSCreateManyEmpresaInputEnvelope
    set?: EmpresaODSWhereUniqueInput | EmpresaODSWhereUniqueInput[]
    disconnect?: EmpresaODSWhereUniqueInput | EmpresaODSWhereUniqueInput[]
    delete?: EmpresaODSWhereUniqueInput | EmpresaODSWhereUniqueInput[]
    connect?: EmpresaODSWhereUniqueInput | EmpresaODSWhereUniqueInput[]
    update?: EmpresaODSUpdateWithWhereUniqueWithoutEmpresaInput | EmpresaODSUpdateWithWhereUniqueWithoutEmpresaInput[]
    updateMany?: EmpresaODSUpdateManyWithWhereWithoutEmpresaInput | EmpresaODSUpdateManyWithWhereWithoutEmpresaInput[]
    deleteMany?: EmpresaODSScalarWhereInput | EmpresaODSScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type AcaoUncheckedUpdateManyWithoutEmpresasNestedInput = {
    create?: XOR<AcaoCreateWithoutEmpresasInput, AcaoUncheckedCreateWithoutEmpresasInput> | AcaoCreateWithoutEmpresasInput[] | AcaoUncheckedCreateWithoutEmpresasInput[]
    connectOrCreate?: AcaoCreateOrConnectWithoutEmpresasInput | AcaoCreateOrConnectWithoutEmpresasInput[]
    upsert?: AcaoUpsertWithWhereUniqueWithoutEmpresasInput | AcaoUpsertWithWhereUniqueWithoutEmpresasInput[]
    set?: AcaoWhereUniqueInput | AcaoWhereUniqueInput[]
    disconnect?: AcaoWhereUniqueInput | AcaoWhereUniqueInput[]
    delete?: AcaoWhereUniqueInput | AcaoWhereUniqueInput[]
    connect?: AcaoWhereUniqueInput | AcaoWhereUniqueInput[]
    update?: AcaoUpdateWithWhereUniqueWithoutEmpresasInput | AcaoUpdateWithWhereUniqueWithoutEmpresasInput[]
    updateMany?: AcaoUpdateManyWithWhereWithoutEmpresasInput | AcaoUpdateManyWithWhereWithoutEmpresasInput[]
    deleteMany?: AcaoScalarWhereInput | AcaoScalarWhereInput[]
  }

  export type EmpresaODSUncheckedUpdateManyWithoutEmpresaNestedInput = {
    create?: XOR<EmpresaODSCreateWithoutEmpresaInput, EmpresaODSUncheckedCreateWithoutEmpresaInput> | EmpresaODSCreateWithoutEmpresaInput[] | EmpresaODSUncheckedCreateWithoutEmpresaInput[]
    connectOrCreate?: EmpresaODSCreateOrConnectWithoutEmpresaInput | EmpresaODSCreateOrConnectWithoutEmpresaInput[]
    upsert?: EmpresaODSUpsertWithWhereUniqueWithoutEmpresaInput | EmpresaODSUpsertWithWhereUniqueWithoutEmpresaInput[]
    createMany?: EmpresaODSCreateManyEmpresaInputEnvelope
    set?: EmpresaODSWhereUniqueInput | EmpresaODSWhereUniqueInput[]
    disconnect?: EmpresaODSWhereUniqueInput | EmpresaODSWhereUniqueInput[]
    delete?: EmpresaODSWhereUniqueInput | EmpresaODSWhereUniqueInput[]
    connect?: EmpresaODSWhereUniqueInput | EmpresaODSWhereUniqueInput[]
    update?: EmpresaODSUpdateWithWhereUniqueWithoutEmpresaInput | EmpresaODSUpdateWithWhereUniqueWithoutEmpresaInput[]
    updateMany?: EmpresaODSUpdateManyWithWhereWithoutEmpresaInput | EmpresaODSUpdateManyWithWhereWithoutEmpresaInput[]
    deleteMany?: EmpresaODSScalarWhereInput | EmpresaODSScalarWhereInput[]
  }

  export type EmpresaODSCreateNestedManyWithoutOdsInput = {
    create?: XOR<EmpresaODSCreateWithoutOdsInput, EmpresaODSUncheckedCreateWithoutOdsInput> | EmpresaODSCreateWithoutOdsInput[] | EmpresaODSUncheckedCreateWithoutOdsInput[]
    connectOrCreate?: EmpresaODSCreateOrConnectWithoutOdsInput | EmpresaODSCreateOrConnectWithoutOdsInput[]
    createMany?: EmpresaODSCreateManyOdsInputEnvelope
    connect?: EmpresaODSWhereUniqueInput | EmpresaODSWhereUniqueInput[]
  }

  export type EmpresaODSUncheckedCreateNestedManyWithoutOdsInput = {
    create?: XOR<EmpresaODSCreateWithoutOdsInput, EmpresaODSUncheckedCreateWithoutOdsInput> | EmpresaODSCreateWithoutOdsInput[] | EmpresaODSUncheckedCreateWithoutOdsInput[]
    connectOrCreate?: EmpresaODSCreateOrConnectWithoutOdsInput | EmpresaODSCreateOrConnectWithoutOdsInput[]
    createMany?: EmpresaODSCreateManyOdsInputEnvelope
    connect?: EmpresaODSWhereUniqueInput | EmpresaODSWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EmpresaODSUpdateManyWithoutOdsNestedInput = {
    create?: XOR<EmpresaODSCreateWithoutOdsInput, EmpresaODSUncheckedCreateWithoutOdsInput> | EmpresaODSCreateWithoutOdsInput[] | EmpresaODSUncheckedCreateWithoutOdsInput[]
    connectOrCreate?: EmpresaODSCreateOrConnectWithoutOdsInput | EmpresaODSCreateOrConnectWithoutOdsInput[]
    upsert?: EmpresaODSUpsertWithWhereUniqueWithoutOdsInput | EmpresaODSUpsertWithWhereUniqueWithoutOdsInput[]
    createMany?: EmpresaODSCreateManyOdsInputEnvelope
    set?: EmpresaODSWhereUniqueInput | EmpresaODSWhereUniqueInput[]
    disconnect?: EmpresaODSWhereUniqueInput | EmpresaODSWhereUniqueInput[]
    delete?: EmpresaODSWhereUniqueInput | EmpresaODSWhereUniqueInput[]
    connect?: EmpresaODSWhereUniqueInput | EmpresaODSWhereUniqueInput[]
    update?: EmpresaODSUpdateWithWhereUniqueWithoutOdsInput | EmpresaODSUpdateWithWhereUniqueWithoutOdsInput[]
    updateMany?: EmpresaODSUpdateManyWithWhereWithoutOdsInput | EmpresaODSUpdateManyWithWhereWithoutOdsInput[]
    deleteMany?: EmpresaODSScalarWhereInput | EmpresaODSScalarWhereInput[]
  }

  export type EmpresaODSUncheckedUpdateManyWithoutOdsNestedInput = {
    create?: XOR<EmpresaODSCreateWithoutOdsInput, EmpresaODSUncheckedCreateWithoutOdsInput> | EmpresaODSCreateWithoutOdsInput[] | EmpresaODSUncheckedCreateWithoutOdsInput[]
    connectOrCreate?: EmpresaODSCreateOrConnectWithoutOdsInput | EmpresaODSCreateOrConnectWithoutOdsInput[]
    upsert?: EmpresaODSUpsertWithWhereUniqueWithoutOdsInput | EmpresaODSUpsertWithWhereUniqueWithoutOdsInput[]
    createMany?: EmpresaODSCreateManyOdsInputEnvelope
    set?: EmpresaODSWhereUniqueInput | EmpresaODSWhereUniqueInput[]
    disconnect?: EmpresaODSWhereUniqueInput | EmpresaODSWhereUniqueInput[]
    delete?: EmpresaODSWhereUniqueInput | EmpresaODSWhereUniqueInput[]
    connect?: EmpresaODSWhereUniqueInput | EmpresaODSWhereUniqueInput[]
    update?: EmpresaODSUpdateWithWhereUniqueWithoutOdsInput | EmpresaODSUpdateWithWhereUniqueWithoutOdsInput[]
    updateMany?: EmpresaODSUpdateManyWithWhereWithoutOdsInput | EmpresaODSUpdateManyWithWhereWithoutOdsInput[]
    deleteMany?: EmpresaODSScalarWhereInput | EmpresaODSScalarWhereInput[]
  }

  export type EmpresaCreateNestedOneWithoutOdsInput = {
    create?: XOR<EmpresaCreateWithoutOdsInput, EmpresaUncheckedCreateWithoutOdsInput>
    connectOrCreate?: EmpresaCreateOrConnectWithoutOdsInput
    connect?: EmpresaWhereUniqueInput
  }

  export type ODSCreateNestedOneWithoutEmpresasInput = {
    create?: XOR<ODSCreateWithoutEmpresasInput, ODSUncheckedCreateWithoutEmpresasInput>
    connectOrCreate?: ODSCreateOrConnectWithoutEmpresasInput
    connect?: ODSWhereUniqueInput
  }

  export type EmpresaUpdateOneRequiredWithoutOdsNestedInput = {
    create?: XOR<EmpresaCreateWithoutOdsInput, EmpresaUncheckedCreateWithoutOdsInput>
    connectOrCreate?: EmpresaCreateOrConnectWithoutOdsInput
    upsert?: EmpresaUpsertWithoutOdsInput
    connect?: EmpresaWhereUniqueInput
    update?: XOR<XOR<EmpresaUpdateToOneWithWhereWithoutOdsInput, EmpresaUpdateWithoutOdsInput>, EmpresaUncheckedUpdateWithoutOdsInput>
  }

  export type ODSUpdateOneRequiredWithoutEmpresasNestedInput = {
    create?: XOR<ODSCreateWithoutEmpresasInput, ODSUncheckedCreateWithoutEmpresasInput>
    connectOrCreate?: ODSCreateOrConnectWithoutEmpresasInput
    upsert?: ODSUpsertWithoutEmpresasInput
    connect?: ODSWhereUniqueInput
    update?: XOR<XOR<ODSUpdateToOneWithWhereWithoutEmpresasInput, ODSUpdateWithoutEmpresasInput>, ODSUncheckedUpdateWithoutEmpresasInput>
  }

  export type EmpresaCreateNestedManyWithoutAcoesInput = {
    create?: XOR<EmpresaCreateWithoutAcoesInput, EmpresaUncheckedCreateWithoutAcoesInput> | EmpresaCreateWithoutAcoesInput[] | EmpresaUncheckedCreateWithoutAcoesInput[]
    connectOrCreate?: EmpresaCreateOrConnectWithoutAcoesInput | EmpresaCreateOrConnectWithoutAcoesInput[]
    connect?: EmpresaWhereUniqueInput | EmpresaWhereUniqueInput[]
  }

  export type EmpresaUncheckedCreateNestedManyWithoutAcoesInput = {
    create?: XOR<EmpresaCreateWithoutAcoesInput, EmpresaUncheckedCreateWithoutAcoesInput> | EmpresaCreateWithoutAcoesInput[] | EmpresaUncheckedCreateWithoutAcoesInput[]
    connectOrCreate?: EmpresaCreateOrConnectWithoutAcoesInput | EmpresaCreateOrConnectWithoutAcoesInput[]
    connect?: EmpresaWhereUniqueInput | EmpresaWhereUniqueInput[]
  }

  export type EmpresaUpdateManyWithoutAcoesNestedInput = {
    create?: XOR<EmpresaCreateWithoutAcoesInput, EmpresaUncheckedCreateWithoutAcoesInput> | EmpresaCreateWithoutAcoesInput[] | EmpresaUncheckedCreateWithoutAcoesInput[]
    connectOrCreate?: EmpresaCreateOrConnectWithoutAcoesInput | EmpresaCreateOrConnectWithoutAcoesInput[]
    upsert?: EmpresaUpsertWithWhereUniqueWithoutAcoesInput | EmpresaUpsertWithWhereUniqueWithoutAcoesInput[]
    set?: EmpresaWhereUniqueInput | EmpresaWhereUniqueInput[]
    disconnect?: EmpresaWhereUniqueInput | EmpresaWhereUniqueInput[]
    delete?: EmpresaWhereUniqueInput | EmpresaWhereUniqueInput[]
    connect?: EmpresaWhereUniqueInput | EmpresaWhereUniqueInput[]
    update?: EmpresaUpdateWithWhereUniqueWithoutAcoesInput | EmpresaUpdateWithWhereUniqueWithoutAcoesInput[]
    updateMany?: EmpresaUpdateManyWithWhereWithoutAcoesInput | EmpresaUpdateManyWithWhereWithoutAcoesInput[]
    deleteMany?: EmpresaScalarWhereInput | EmpresaScalarWhereInput[]
  }

  export type EmpresaUncheckedUpdateManyWithoutAcoesNestedInput = {
    create?: XOR<EmpresaCreateWithoutAcoesInput, EmpresaUncheckedCreateWithoutAcoesInput> | EmpresaCreateWithoutAcoesInput[] | EmpresaUncheckedCreateWithoutAcoesInput[]
    connectOrCreate?: EmpresaCreateOrConnectWithoutAcoesInput | EmpresaCreateOrConnectWithoutAcoesInput[]
    upsert?: EmpresaUpsertWithWhereUniqueWithoutAcoesInput | EmpresaUpsertWithWhereUniqueWithoutAcoesInput[]
    set?: EmpresaWhereUniqueInput | EmpresaWhereUniqueInput[]
    disconnect?: EmpresaWhereUniqueInput | EmpresaWhereUniqueInput[]
    delete?: EmpresaWhereUniqueInput | EmpresaWhereUniqueInput[]
    connect?: EmpresaWhereUniqueInput | EmpresaWhereUniqueInput[]
    update?: EmpresaUpdateWithWhereUniqueWithoutAcoesInput | EmpresaUpdateWithWhereUniqueWithoutAcoesInput[]
    updateMany?: EmpresaUpdateManyWithWhereWithoutAcoesInput | EmpresaUpdateManyWithWhereWithoutAcoesInput[]
    deleteMany?: EmpresaScalarWhereInput | EmpresaScalarWhereInput[]
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type AcaoCreateWithoutEmpresasInput = {
    nome?: string | null
    notaFiscal?: string | null
    ong: string
  }

  export type AcaoUncheckedCreateWithoutEmpresasInput = {
    id?: number
    nome?: string | null
    notaFiscal?: string | null
    ong: string
  }

  export type AcaoCreateOrConnectWithoutEmpresasInput = {
    where: AcaoWhereUniqueInput
    create: XOR<AcaoCreateWithoutEmpresasInput, AcaoUncheckedCreateWithoutEmpresasInput>
  }

  export type EmpresaODSCreateWithoutEmpresaInput = {
    ods: ODSCreateNestedOneWithoutEmpresasInput
  }

  export type EmpresaODSUncheckedCreateWithoutEmpresaInput = {
    odsId: number
  }

  export type EmpresaODSCreateOrConnectWithoutEmpresaInput = {
    where: EmpresaODSWhereUniqueInput
    create: XOR<EmpresaODSCreateWithoutEmpresaInput, EmpresaODSUncheckedCreateWithoutEmpresaInput>
  }

  export type EmpresaODSCreateManyEmpresaInputEnvelope = {
    data: EmpresaODSCreateManyEmpresaInput | EmpresaODSCreateManyEmpresaInput[]
  }

  export type AcaoUpsertWithWhereUniqueWithoutEmpresasInput = {
    where: AcaoWhereUniqueInput
    update: XOR<AcaoUpdateWithoutEmpresasInput, AcaoUncheckedUpdateWithoutEmpresasInput>
    create: XOR<AcaoCreateWithoutEmpresasInput, AcaoUncheckedCreateWithoutEmpresasInput>
  }

  export type AcaoUpdateWithWhereUniqueWithoutEmpresasInput = {
    where: AcaoWhereUniqueInput
    data: XOR<AcaoUpdateWithoutEmpresasInput, AcaoUncheckedUpdateWithoutEmpresasInput>
  }

  export type AcaoUpdateManyWithWhereWithoutEmpresasInput = {
    where: AcaoScalarWhereInput
    data: XOR<AcaoUpdateManyMutationInput, AcaoUncheckedUpdateManyWithoutEmpresasInput>
  }

  export type AcaoScalarWhereInput = {
    AND?: AcaoScalarWhereInput | AcaoScalarWhereInput[]
    OR?: AcaoScalarWhereInput[]
    NOT?: AcaoScalarWhereInput | AcaoScalarWhereInput[]
    id?: IntFilter<"Acao"> | number
    nome?: StringNullableFilter<"Acao"> | string | null
    notaFiscal?: StringNullableFilter<"Acao"> | string | null
    ong?: StringFilter<"Acao"> | string
  }

  export type EmpresaODSUpsertWithWhereUniqueWithoutEmpresaInput = {
    where: EmpresaODSWhereUniqueInput
    update: XOR<EmpresaODSUpdateWithoutEmpresaInput, EmpresaODSUncheckedUpdateWithoutEmpresaInput>
    create: XOR<EmpresaODSCreateWithoutEmpresaInput, EmpresaODSUncheckedCreateWithoutEmpresaInput>
  }

  export type EmpresaODSUpdateWithWhereUniqueWithoutEmpresaInput = {
    where: EmpresaODSWhereUniqueInput
    data: XOR<EmpresaODSUpdateWithoutEmpresaInput, EmpresaODSUncheckedUpdateWithoutEmpresaInput>
  }

  export type EmpresaODSUpdateManyWithWhereWithoutEmpresaInput = {
    where: EmpresaODSScalarWhereInput
    data: XOR<EmpresaODSUpdateManyMutationInput, EmpresaODSUncheckedUpdateManyWithoutEmpresaInput>
  }

  export type EmpresaODSScalarWhereInput = {
    AND?: EmpresaODSScalarWhereInput | EmpresaODSScalarWhereInput[]
    OR?: EmpresaODSScalarWhereInput[]
    NOT?: EmpresaODSScalarWhereInput | EmpresaODSScalarWhereInput[]
    empresaId?: IntFilter<"EmpresaODS"> | number
    odsId?: IntFilter<"EmpresaODS"> | number
  }

  export type EmpresaODSCreateWithoutOdsInput = {
    empresa: EmpresaCreateNestedOneWithoutOdsInput
  }

  export type EmpresaODSUncheckedCreateWithoutOdsInput = {
    empresaId: number
  }

  export type EmpresaODSCreateOrConnectWithoutOdsInput = {
    where: EmpresaODSWhereUniqueInput
    create: XOR<EmpresaODSCreateWithoutOdsInput, EmpresaODSUncheckedCreateWithoutOdsInput>
  }

  export type EmpresaODSCreateManyOdsInputEnvelope = {
    data: EmpresaODSCreateManyOdsInput | EmpresaODSCreateManyOdsInput[]
  }

  export type EmpresaODSUpsertWithWhereUniqueWithoutOdsInput = {
    where: EmpresaODSWhereUniqueInput
    update: XOR<EmpresaODSUpdateWithoutOdsInput, EmpresaODSUncheckedUpdateWithoutOdsInput>
    create: XOR<EmpresaODSCreateWithoutOdsInput, EmpresaODSUncheckedCreateWithoutOdsInput>
  }

  export type EmpresaODSUpdateWithWhereUniqueWithoutOdsInput = {
    where: EmpresaODSWhereUniqueInput
    data: XOR<EmpresaODSUpdateWithoutOdsInput, EmpresaODSUncheckedUpdateWithoutOdsInput>
  }

  export type EmpresaODSUpdateManyWithWhereWithoutOdsInput = {
    where: EmpresaODSScalarWhereInput
    data: XOR<EmpresaODSUpdateManyMutationInput, EmpresaODSUncheckedUpdateManyWithoutOdsInput>
  }

  export type EmpresaCreateWithoutOdsInput = {
    nome?: string | null
    cnpj?: string | null
    email?: string | null
    senha?: string | null
    colaboradores?: number | null
    pontos?: number | null
    selo?: string | null
    acoes?: AcaoCreateNestedManyWithoutEmpresasInput
  }

  export type EmpresaUncheckedCreateWithoutOdsInput = {
    id?: number
    nome?: string | null
    cnpj?: string | null
    email?: string | null
    senha?: string | null
    colaboradores?: number | null
    pontos?: number | null
    selo?: string | null
    acoes?: AcaoUncheckedCreateNestedManyWithoutEmpresasInput
  }

  export type EmpresaCreateOrConnectWithoutOdsInput = {
    where: EmpresaWhereUniqueInput
    create: XOR<EmpresaCreateWithoutOdsInput, EmpresaUncheckedCreateWithoutOdsInput>
  }

  export type ODSCreateWithoutEmpresasInput = {
    titulo: string
  }

  export type ODSUncheckedCreateWithoutEmpresasInput = {
    id?: number
    titulo: string
  }

  export type ODSCreateOrConnectWithoutEmpresasInput = {
    where: ODSWhereUniqueInput
    create: XOR<ODSCreateWithoutEmpresasInput, ODSUncheckedCreateWithoutEmpresasInput>
  }

  export type EmpresaUpsertWithoutOdsInput = {
    update: XOR<EmpresaUpdateWithoutOdsInput, EmpresaUncheckedUpdateWithoutOdsInput>
    create: XOR<EmpresaCreateWithoutOdsInput, EmpresaUncheckedCreateWithoutOdsInput>
    where?: EmpresaWhereInput
  }

  export type EmpresaUpdateToOneWithWhereWithoutOdsInput = {
    where?: EmpresaWhereInput
    data: XOR<EmpresaUpdateWithoutOdsInput, EmpresaUncheckedUpdateWithoutOdsInput>
  }

  export type EmpresaUpdateWithoutOdsInput = {
    nome?: NullableStringFieldUpdateOperationsInput | string | null
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    senha?: NullableStringFieldUpdateOperationsInput | string | null
    colaboradores?: NullableIntFieldUpdateOperationsInput | number | null
    pontos?: NullableIntFieldUpdateOperationsInput | number | null
    selo?: NullableStringFieldUpdateOperationsInput | string | null
    acoes?: AcaoUpdateManyWithoutEmpresasNestedInput
  }

  export type EmpresaUncheckedUpdateWithoutOdsInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: NullableStringFieldUpdateOperationsInput | string | null
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    senha?: NullableStringFieldUpdateOperationsInput | string | null
    colaboradores?: NullableIntFieldUpdateOperationsInput | number | null
    pontos?: NullableIntFieldUpdateOperationsInput | number | null
    selo?: NullableStringFieldUpdateOperationsInput | string | null
    acoes?: AcaoUncheckedUpdateManyWithoutEmpresasNestedInput
  }

  export type ODSUpsertWithoutEmpresasInput = {
    update: XOR<ODSUpdateWithoutEmpresasInput, ODSUncheckedUpdateWithoutEmpresasInput>
    create: XOR<ODSCreateWithoutEmpresasInput, ODSUncheckedCreateWithoutEmpresasInput>
    where?: ODSWhereInput
  }

  export type ODSUpdateToOneWithWhereWithoutEmpresasInput = {
    where?: ODSWhereInput
    data: XOR<ODSUpdateWithoutEmpresasInput, ODSUncheckedUpdateWithoutEmpresasInput>
  }

  export type ODSUpdateWithoutEmpresasInput = {
    titulo?: StringFieldUpdateOperationsInput | string
  }

  export type ODSUncheckedUpdateWithoutEmpresasInput = {
    id?: IntFieldUpdateOperationsInput | number
    titulo?: StringFieldUpdateOperationsInput | string
  }

  export type EmpresaCreateWithoutAcoesInput = {
    nome?: string | null
    cnpj?: string | null
    email?: string | null
    senha?: string | null
    colaboradores?: number | null
    pontos?: number | null
    selo?: string | null
    ods?: EmpresaODSCreateNestedManyWithoutEmpresaInput
  }

  export type EmpresaUncheckedCreateWithoutAcoesInput = {
    id?: number
    nome?: string | null
    cnpj?: string | null
    email?: string | null
    senha?: string | null
    colaboradores?: number | null
    pontos?: number | null
    selo?: string | null
    ods?: EmpresaODSUncheckedCreateNestedManyWithoutEmpresaInput
  }

  export type EmpresaCreateOrConnectWithoutAcoesInput = {
    where: EmpresaWhereUniqueInput
    create: XOR<EmpresaCreateWithoutAcoesInput, EmpresaUncheckedCreateWithoutAcoesInput>
  }

  export type EmpresaUpsertWithWhereUniqueWithoutAcoesInput = {
    where: EmpresaWhereUniqueInput
    update: XOR<EmpresaUpdateWithoutAcoesInput, EmpresaUncheckedUpdateWithoutAcoesInput>
    create: XOR<EmpresaCreateWithoutAcoesInput, EmpresaUncheckedCreateWithoutAcoesInput>
  }

  export type EmpresaUpdateWithWhereUniqueWithoutAcoesInput = {
    where: EmpresaWhereUniqueInput
    data: XOR<EmpresaUpdateWithoutAcoesInput, EmpresaUncheckedUpdateWithoutAcoesInput>
  }

  export type EmpresaUpdateManyWithWhereWithoutAcoesInput = {
    where: EmpresaScalarWhereInput
    data: XOR<EmpresaUpdateManyMutationInput, EmpresaUncheckedUpdateManyWithoutAcoesInput>
  }

  export type EmpresaScalarWhereInput = {
    AND?: EmpresaScalarWhereInput | EmpresaScalarWhereInput[]
    OR?: EmpresaScalarWhereInput[]
    NOT?: EmpresaScalarWhereInput | EmpresaScalarWhereInput[]
    id?: IntFilter<"Empresa"> | number
    nome?: StringNullableFilter<"Empresa"> | string | null
    cnpj?: StringNullableFilter<"Empresa"> | string | null
    email?: StringNullableFilter<"Empresa"> | string | null
    senha?: StringNullableFilter<"Empresa"> | string | null
    colaboradores?: IntNullableFilter<"Empresa"> | number | null
    pontos?: IntNullableFilter<"Empresa"> | number | null
    selo?: StringNullableFilter<"Empresa"> | string | null
  }

  export type EmpresaODSCreateManyEmpresaInput = {
    odsId: number
  }

  export type AcaoUpdateWithoutEmpresasInput = {
    nome?: NullableStringFieldUpdateOperationsInput | string | null
    notaFiscal?: NullableStringFieldUpdateOperationsInput | string | null
    ong?: StringFieldUpdateOperationsInput | string
  }

  export type AcaoUncheckedUpdateWithoutEmpresasInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: NullableStringFieldUpdateOperationsInput | string | null
    notaFiscal?: NullableStringFieldUpdateOperationsInput | string | null
    ong?: StringFieldUpdateOperationsInput | string
  }

  export type AcaoUncheckedUpdateManyWithoutEmpresasInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: NullableStringFieldUpdateOperationsInput | string | null
    notaFiscal?: NullableStringFieldUpdateOperationsInput | string | null
    ong?: StringFieldUpdateOperationsInput | string
  }

  export type EmpresaODSUpdateWithoutEmpresaInput = {
    ods?: ODSUpdateOneRequiredWithoutEmpresasNestedInput
  }

  export type EmpresaODSUncheckedUpdateWithoutEmpresaInput = {
    odsId?: IntFieldUpdateOperationsInput | number
  }

  export type EmpresaODSUncheckedUpdateManyWithoutEmpresaInput = {
    odsId?: IntFieldUpdateOperationsInput | number
  }

  export type EmpresaODSCreateManyOdsInput = {
    empresaId: number
  }

  export type EmpresaODSUpdateWithoutOdsInput = {
    empresa?: EmpresaUpdateOneRequiredWithoutOdsNestedInput
  }

  export type EmpresaODSUncheckedUpdateWithoutOdsInput = {
    empresaId?: IntFieldUpdateOperationsInput | number
  }

  export type EmpresaODSUncheckedUpdateManyWithoutOdsInput = {
    empresaId?: IntFieldUpdateOperationsInput | number
  }

  export type EmpresaUpdateWithoutAcoesInput = {
    nome?: NullableStringFieldUpdateOperationsInput | string | null
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    senha?: NullableStringFieldUpdateOperationsInput | string | null
    colaboradores?: NullableIntFieldUpdateOperationsInput | number | null
    pontos?: NullableIntFieldUpdateOperationsInput | number | null
    selo?: NullableStringFieldUpdateOperationsInput | string | null
    ods?: EmpresaODSUpdateManyWithoutEmpresaNestedInput
  }

  export type EmpresaUncheckedUpdateWithoutAcoesInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: NullableStringFieldUpdateOperationsInput | string | null
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    senha?: NullableStringFieldUpdateOperationsInput | string | null
    colaboradores?: NullableIntFieldUpdateOperationsInput | number | null
    pontos?: NullableIntFieldUpdateOperationsInput | number | null
    selo?: NullableStringFieldUpdateOperationsInput | string | null
    ods?: EmpresaODSUncheckedUpdateManyWithoutEmpresaNestedInput
  }

  export type EmpresaUncheckedUpdateManyWithoutAcoesInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: NullableStringFieldUpdateOperationsInput | string | null
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    senha?: NullableStringFieldUpdateOperationsInput | string | null
    colaboradores?: NullableIntFieldUpdateOperationsInput | number | null
    pontos?: NullableIntFieldUpdateOperationsInput | number | null
    selo?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}