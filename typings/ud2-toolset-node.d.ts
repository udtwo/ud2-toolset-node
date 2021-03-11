declare module 'ud2-toolset-node' {
	class mongodb {
		ObjectId: object;
		ClientSession: object;
		MongoClient: object;
	}

	/**
	 * MongoDB 创建数据库操作相关参数类
	 * @class
	 */
	class MongoPlusInfo {
		/**
		 * 创建一个参数对象
		 * @constructor
		 * @param {object} options 信息参数
		 * @param {string | null} [options.connectName='default'] 连接名称
		 * @param {string | Array} options.server 服务器地址
		 * @param {string} options.user 用户名
		 * @param {string} options.password 密码
		 * @param {string} [options.authSource='admin'] 权限数据库名称
		 * @param {string | null} [options.replicaSet=null] 副本集名称
		 * @param {string} options.dbName 数据库名称
		 * @param {number} [options.poolSize=50000] 连接池大小
		 * @param {number} [options.socketTimeoutMS=60000] 超时时间
		 * @param {number} [options.transactionSleepTime=2000] 事务休眠时间
		 */
		constructor(options: {
			connectName?: string,
			server: string | null,
			user: string,
			password: string,
			authSource?: string,
			replicaSet?: string | null,
			dbName: string,
			poolSize: number,
			socketTimeoutMS: number,
			transactionSleepTime: number
		});
	}

	/**
	 * MongoDB 数据库操作
	 * @class
	 */
	class MongoPlus {
		/**
		 * 创建一个数据库操作对象
		 * @constructor
		 * @param {MongoPlusInfo} mongoPlusInfo 数据库连接对象
		 */
		constructor(info: MongoPlusInfo);
		/**
		 * 获取 MongoClient 对象
		 * @returns {mongodb.MongoClient} 返回获取到的 MongoClient 对象，可能为 null
		 */
		getMongoClient(): mongodb['MongoClient'];
		/**
		 * 连接 MongoDB 数据库，获取 MongoClient 对象
		 * @async
		 * @returns {mongodb.MongoClient} 返回 MongoClient 对象，如果获取失败，则返回 null
		 */
		connect(): mongodb['MongoClient'];
		/**
		 * MongoDB 数据库事务执行方法
		 * @async
		 * @param {function(mongodb.ClientSession, mongodb.MongoClient):MongoResultInfo} transactionProcess 事务执行回调方法
		 * @returns {MongoResultInfo} 事务执行完毕所返回的相关结果对象
		 */
		transaction(transactionProcess: (session: mongodb['ClientSession'], client: mongodb['MongoClient']) => Promise<MongoResultInfo>): Promise<MongoResultInfo>;
		/**
		 * MongoDB 数据库查询方法
		 * @async
		 * @param {MongoModel} model 数据模型
		 * @param {object} [options={}] 信息参数
		 * @param {mongodb.ClientSession | null} [options.session=null] MongoClient 运行中的 session 对象
		 * @param {object | null} [options.where=null] 查询方法中的条件筛选
		 * @param {object | null} [options.project=null] 查询方法中的显示字段筛选
		 * @param {object | null} [options.sort=null] 查询方法中的排序
		 * @param {number | null} [options.skip=null] 查询方法中跳过的数据行数
		 * @param {number | null} [options.limit=null] 查询方法中提取的数据行数
		 * @param {boolean} [options.isCount=false] 是否统计查询行数
		 * @returns {MongoResultInfo} 事务执行完毕所返回的相关结果对象
		 */
		find(model: object, options: {
			session?: mongodb['ClientSession'],
			where?: object | null,
			project?: object | null,
			sort?: object | null,
			skip?: object | null,
			limit?: object | null,
			isCount?: boolean
		}): Promise<MongoResultInfo>;
		/**
		 * MongoDB 数据库单条查询方法
		 * @async
		 * @param {MongoModel} model 数据模型
		 * @param {object} [options={}] 信息参数
		 * @param {mongodb.ClientSession | null} [options.session=null] MongoClient 运行中的 session 对象
		 * @param {object | null} [options.where=null] 查询方法中的条件筛选
		 * @param {object | null} [options.project=null] 查询方法中的显示字段筛选
		 * @param {object | null} [options.sort=null] 查询方法中的排序
		 * @returns {MongoResultInfo} 事务执行完毕所返回的相关结果对象
		 */
		findOne(model: object, options: {
			session?: mongodb['ClientSession'],
			where?: object | null,
			project?: object | null,
			sort?: object | null
		}): Promise<MongoResultInfo>;
		/**
		 * MongoDB 数据库新增方法
		 * @async
		 * @param {MongoModel} model 数据模型
		 * @param {object} data 单条数据对象
		 * @param {object} [options={}] 信息参数
		 * @param {mongodb.ClientSession | null} [options.session=null] MongoClient 运行中的 session 对象
		 * @returns {MongoResultInfo} 事务执行完毕所返回的相关结果对象
		 */
		insertOne(model: object, data: object, options: {
			session?: mongodb['ClientSession']
		}): Promise<MongoResultInfo>;
		/**
		 * MongoDB 数据库多条新增方法
		 * @async
		 * @param {MongoModel} model 数据模型
		 * @param {Array} datas 多条数据对象集合
		 * @param {object} [options={}] 信息参数
		 * @param {mongodb.ClientSession | null} [options.session=null] MongoClient 运行中的 session 对象
		 * @returns {MongoResultInfo} 事务执行完毕所返回的相关结果对象
		 */
		insertMany(model: object, datas: Array<object>, options: {
			session?: mongodb['ClientSession']
		}): Promise<MongoResultInfo>;
		/**
		 * MongoDB 数据库编辑方法
		 * 只编辑通过 where 匹配出来的第一条数据，其他数据不编辑
		 * @summary 返回的错误 mongodbBizLogicError、mongodbOperatorValueTypeError
		 * @param {MongoModel} model 数据模型
		 * @param {object} operators 数据库操作符
		 * @param {object | null} [operators.$set=null] 变更字段的值，如不存在则新增字段
		 * @param {object | null} [operators.$inc=null] 向数字字段执行增加指定的值
		 * @param {object | null} [operators.$min=null] 向数字字段设置一个新的值，前提为新设置的值要小于该字段的当前值
		 * @param {object | null} [operators.$max=null] 向数字字段设置一个新的值，前提为新设置的值要大于该字段的当前值
		 * @param {object | null} [operators.$mul=null] 向数字字段执行乘以指定的值
		 * @param {object | null} [operators.$setOnInsert=null] 当更新数据时 upsert 成立且插入数据时，$setOnInsert 的字段和值会插入到新数据中，如果插入数据不成立 $setOnInsert 的字段和值会被忽略
		 * @param {object | null} [operators.$unset=null] 删除指定的字段和值
		 * @param {object | null} [operators.$rename=null] 对字段进行重命名
		 * @param {object | null} [operators.$currentDate=null] 将字段设置为当前日期
		 * @param {object | null} [operators.$addToSet=null] 向数组字段插入一个或若干个值，前提待插入的值在数组中不存在
		 * @param {object | null} [operators.$pop=null] 向数组字段移除第一个或最后一个值
		 * @param {object | null} [operators.$pull=null] 向数组字段移除一个或若干个指定的值
		 * @param {object | null} [operators.$pullAll=null] 向数组字段移除全部的指定的值
		 * @param {object | null} [operators.$push=null] 向数组字段新增一个或若干个指定的值
		 * @param {object} [options={}] 信息参数
		 * @param {mongodb.ClientSession | null} [options.session=null] MongoClient 运行中的 session 对象
		 * @param {object | null} [options.where=null] 查询方法中的条件筛选
		 * @param {boolean} [options.upsert=false] 是否启用自动更新并新增
		 * @returns {MongoResultInfo} 事务执行完毕所返回的相关结果对象
		 */
		updateOne(model: object, operators: {
			$set?: object | null,
			$inc?: object | null,
			$min?: object | null,
			$max?: object | null,
			$mul?: object | null,
			$setOnInsert?: object | null,
			$unset?: object | null,
			$rename?: object | null,
			$currentDate?: object | null,
			$addToSet?: object | null,
			$pop?: object | null,
			$pull?: object | null,
			$pullAll?: object | null,
			$push?: object | null
		}, options: {
			session?: mongodb['ClientSession'],
			where?: object | null,
			upsert?: boolean
		}): Promise<MongoResultInfo>;
		/**
		 * MongoDB 数据库编辑多条方法
		 * 通过 where 条件匹配出的所有数据都被编辑
		 * @summary 返回的错误 mongodbBizLogicError、mongodbOperatorValueTypeError
		 * @param {MongoModel} model 数据模型
		 * @param {object} operators 数据库操作符
		 * @param {object | null} [operators.$set=null] 变更字段的值，如不存在则新增字段
		 * @param {object | null} [operators.$inc=null] 向数字字段执行增加指定的值
		 * @param {object | null} [operators.$min=null] 向数字字段设置一个新的值，前提为新设置的值要小于该字段的当前值
		 * @param {object | null} [operators.$max=null] 向数字字段设置一个新的值，前提为新设置的值要大于该字段的当前值
		 * @param {object | null} [operators.$mul=null] 向数字字段执行乘以指定的值
		 * @param {object | null} [operators.$setOnInsert=null] 当更新数据时 upsert 成立且插入数据时，$setOnInsert 的字段和值会插入到新数据中，如果插入数据不成立 $setOnInsert 的字段和值会被忽略
		 * @param {object | null} [operators.$unset=null] 删除指定的字段和值
		 * @param {object | null} [operators.$rename=null] 对字段进行重命名
		 * @param {object | null} [operators.$currentDate=null] 将字段设置为当前日期
		 * @param {object | null} [operators.$addToSet=null] 向数组字段插入一个或若干个值，前提待插入的值在数组中不存在
		 * @param {object | null} [operators.$pop=null] 向数组字段移除第一个或最后一个值
		 * @param {object | null} [operators.$pull=null] 向数组字段移除一个或若干个指定的值
		 * @param {object | null} [operators.$pullAll=null] 向数组字段移除全部的指定的值
		 * @param {object | null} [operators.$push=null] 向数组字段新增一个或若干个指定的值
		 * @param {object} [options={}] 信息参数
		 * @param {mongodb.ClientSession | null} [options.session=null] MongoClient 运行中的 session 对象
		 * @param {object | null} [options.where=null] 查询方法中的条件筛选
		 * @param {boolean} [options.upsert=false] 是否启用自动更新并新增
		 * @returns {MongoResultInfo} 事务执行完毕所返回的相关结果对象
		 */
		updateMany(model: object, operators: {
			$set?: object | null,
			$inc?: object | null,
			$min?: object | null,
			$max?: object | null,
			$mul?: object | null,
			$setOnInsert?: object | null,
			$unset?: object | null,
			$rename?: object | null,
			$currentDate?: object | null,
			$addToSet?: object | null,
			$pop?: object | null,
			$pull?: object | null,
			$pullAll?: object | null,
			$push?: object | null
		}, options: {
			session?: mongodb['ClientSession'],
			where?: object | null,
			upsert?: boolean
		}): Promise<MongoResultInfo>;
		/**
		 * MongoDB 数据库删除方法
		 * 通过 where 条件匹配出的所有数据都被编辑
		 * @summary 返回的错误 mongodbBizLogicError
		 * @param {MongoModel} model 数据模型
		 * @param {object} [options={}] 信息参数
		 * @param {mongodb.ClientSession | null} [options.session=null] MongoClient 运行中的 session 对象
		 * @param {object | null} [options.where=null] 查询方法中的条件筛选
		 * @returns {MongoResultInfo} 事务执行完毕所返回的相关结果对象
		 */
		deleteOne(model: object, options: {
			session?: mongodb['ClientSession'],
			where?: object | null
		}): Promise<MongoResultInfo>;
		/**
		 * MongoDB 数据库删除方法
		 * 只删除通过 where 匹配出来的第一条数据，其他数据不编辑
		 * @summary 返回的错误 mongodbBizLogicError
		 * @param {MongoModel} model 数据模型
		 * @param {object} [options={}] 信息参数
		 * @param {mongodb.ClientSession | null} [options.session=null] MongoClient 运行中的 session 对象
		 * @param {object | null} [options.where=null] 查询方法中的条件筛选
		 * @returns {MongoResultInfo} 事务执行完毕所返回的相关结果对象
		 */
		deleteMany(model: object, options: {
			session?: mongodb['ClientSession'],
			where?: object | null
		}): Promise<MongoResultInfo>;
		/**
		 * MongoDB 数据库查询并编辑方法
		 * @summary 返回的错误 mongodbBizLogicError、mongodbOperatorValueTypeError
		 * @param {MongoModel} model 数据模型
		 * @param {object} operators 数据库操作符
		 * @param {object | null} [operators.$set=null] 变更字段的值，如不存在则新增字段
		 * @param {object | null} [operators.$inc=null] 向数字字段执行增加指定的值
		 * @param {object | null} [operators.$min=null] 向数字字段设置一个新的值，前提为新设置的值要小于该字段的当前值
		 * @param {object | null} [operators.$max=null] 向数字字段设置一个新的值，前提为新设置的值要大于该字段的当前值
		 * @param {object | null} [operators.$mul=null] 向数字字段执行乘以指定的值
		 * @param {object | null} [operators.$setOnInsert=null] 当更新数据时 upsert 成立且插入数据时，$setOnInsert 的字段和值会插入到新数据中，如果插入数据不成立 $setOnInsert 的字段和值会被忽略
		 * @param {object | null} [operators.$unset=null] 删除指定的字段和值
		 * @param {object | null} [operators.$rename=null] 对字段进行重命名
		 * @param {object | null} [operators.$currentDate=null] 将字段设置为当前日期
		 * @param {object | null} [operators.$addToSet=null] 向数组字段插入一个或若干个值，前提待插入的值在数组中不存在
		 * @param {object | null} [operators.$pop=null] 向数组字段移除第一个或最后一个值
		 * @param {object | null} [operators.$pull=null] 向数组字段移除一个或若干个指定的值
		 * @param {object | null} [operators.$pullAll=null] 向数组字段移除全部的指定的值
		 * @param {object | null} [operators.$push=null] 向数组字段新增一个或若干个指定的值
		 * @param {object} [options={}] 信息参数
		 * @param {mongodb.ClientSession | null} [options.session=null] MongoClient 运行中的 session 对象
		 * @param {object | null} [options.where=null] 查询方法中的条件筛选
		 * @param {object | null} [options.projection=null] 查询方法中的显示字段筛选
		 * @param {object | null} [options.sort=null] 查询方法中的排序
		 * @param {boolean} [options.upsert=false] 是否启用自动更新并新增
		 * @param {boolean} [options.isOriginal=true] 是否返回未编辑前的数据对象
		 * @returns {MongoResultInfo} 事务执行完毕所返回的相关结果对象
		 */
		findOneAndUpdate(model: object, operators: {
			$set?: object | null,
			$inc?: object | null,
			$min?: object | null,
			$max?: object | null,
			$mul?: object | null,
			$setOnInsert?: object | null,
			$unset?: object | null,
			$rename?: object | null,
			$currentDate?: object | null,
			$addToSet?: object | null,
			$pop?: object | null,
			$pull?: object | null,
			$pullAll?: object | null,
			$push?: object | null
		}, options: {
			session?: mongodb['ClientSession'],
			where?: object | null,
			projection?: object | null,
			sort?: object | null,
			upsert?: boolean,
			isOriginal?: boolean
		}): Promise<MongoResultInfo>;
		/**
		 * MongoDB 数据库查询并删除方法
		 * @summary 返回的错误 mongodbBizLogicError
		 * @param {MongoModel} model 数据模型
		 * @param {object} [options={}] 信息参数
		 * @param {mongodb.ClientSession | null} [options.session=null] MongoClient 运行中的 session 对象
		 * @param {object | null} [options.where=null] 查询方法中的条件筛选
		 * @param {object | null} [options.projection=null] 查询方法中的显示字段筛选
		 * @param {object | null} [options.sort=null] 查询方法中的排序
		 * @param {boolean} [options.isOriginal=true] 是否返回未编辑前的数据对象
		 * @returns {MongoResultInfo} 事务执行完毕所返回的相关结果对象
		 */
		findOneAndDelete(model: object, options: {
			session?: mongodb['ClientSession'],
			where?: object | null,
			projection?: object | null,
			sort?: object | null,
			isOriginal?: boolean
		}): Promise<MongoResultInfo>;
		/**
		 * 数据库类型
		 */
		static type: Enumerator;
		/**
		 * 数据库运行结果参数对象
		 */
		static result: MongoResult;
	}
	/**
	 * MongoDB 数据业务执行结果信息类
	 * @class
	 */
	class MongoResultInfo {
		/**
		 * 创建一个 MongoDB 数据业务执行结果信息对象
		 * @constructor
		 * @param {string} sender 该结果的发起方
		 * @param {StateInfo} stateInfo 状态信息对象
		 * @param {object} [options={}] 信息参数
		 * @param {object | Array} options.result 结果对象或集合
		 * @param {number | null} options.count 统计数据
		 * @param {object | null} options.render 传递原参数
		 * @param {ObjectId | null} options.insertedId 执行新增后的新增行对应的 ObjectId
		 * @param {Array | null} options.insertedIds 执行新增后的新增行对应的 ObjectId 集合
		 * @param {number | null} options.insertedCount 执行新增后的新增行数
		 * @param {number | null} options.modifiedCount 执行更新后的更新行数
		 * @param {number | null} options.matchedCount 执行更新时的 where 条件匹配的行数
		 * @param {number | null} options.upsertedId 执行更新并新增后的新增行对应的 ObjectId
		 * @param {number | null} options.upsertedCount 执行更新并新增后的新增行数
		 * @param {number | null} options.deletedCount 执行删除后的删除行数
		 */
		constructor(sender: string, stateInfo: StateInfo, options: {
			result: object | Array<object>,
			count: number | null,
			render: object | null,
			insertedId: mongodb['ObjectId'] | null,
			insertedIds: Array<mongodb['ObjectId']> | null,
			insertedCount: number | null,
			modifiedCount: number | null,
			matchedCount: number | null,
			upsertedId: mongodb['ObjectId'] | null,
			upsertedCount: number | null,
			deletedCount: number | null
		});
	}
	/**
	 * MongoDB 运行结果参数类
	 * @class
	 */
	class MongoResult {
		/**
		 * 业务过程中返回的成功相关的状态结果
		 * @static
		 * @param {object} [options={}] 信息参数
		 * @param {object | Array | null} [options.result=null] 执行业务时返回的结果
		 * @param {object | null} [options.render=null] 执行业务时返回的相关参数信息
		 * @param {string | null} [options.sender=null] 状态信息的调用对象说明
		 * @param {number | null} [options.count=null] 统计数据
		 * @returns {MongoResultInfo} 返回状态信息描述
		 */
		static complete(options: {
			result?: object | Array<object> | null,
			render?: object | null,
			sender?: string | null,
			count?: number | null
		}): MongoResultInfo;
		/**
		 * 新增业务过程中返回的成功相关的状态结果
		 * @static
		 * @param {object} result 执行业务时返回的结果
		 * @returns {MongoResultInfo} 返回状态信息描述
		 */
		static completeByInsert(result: object): MongoResultInfo;
		/**
		 * 编辑业务过程中返回的成功相关的状态结果
		 * @static
		 * @param {object} result 执行业务时返回的结果
		 * @returns {MongoResultInfo} 返回状态信息描述
		 */
		static completeByUpdate(result: object): MongoResultInfo;
		/**
		 * 删除业务过程中返回的成功相关的状态结果
		 * @static
		 * @param {object} result 执行业务时返回的结果
		 * @returns {MongoResultInfo} 返回状态信息描述
		 */
		static completeByDelete(result: object): MongoResultInfo;
		/**
		 * 更新(编辑、删除)并查询业务过程中返回的成功相关的状态结果
		 * @static
		 * @param {object} result 执行业务时返回的结果
		 * @param {string} sender 状态信息的调用对象说明
		 * @returns {MongoResultInfo} 返回状态信息描述
		 */
		static completeByFindAndModify(result: object, sender: string): MongoResultInfo;
		/**
		 * 业务过程中返回错误相关的状态结果
		 * @static
		 * @param {StateInfo} stateInfo 状态信息对象
		 * @param {object} [options={}] 信息参数
		 * @param {object | null} [options.render=null] 执行业务时返回的相关参数信息
		 * @param {string | null} [options.sender='MongoResult.error'] 错误信息的调用对象说明
		 * @returns {MongoResultInfo} 返回状态信息描述
		 */
		static error(stateInfo: StateInfo, options: {
			render?: object | null,
			sender?: string | null
		}): MongoResultInfo;
	}

	/**
	 * Redis 数据库操作类
	 * @class
	 */
	class RedisPlusInfo {
		/**
		 * 创建一个参数对象
		 * @constructor
		 * @param {object} options 信息参数
		 * @param {string | null} [connectName='default'] 连接名称
		 * @param {string} host 服务器 IP 地址
		 * @param {string} port 服务器端口号
		 * @param {string} password 服务器密码
		 * @param {number} [db=0] 待操作的数据库编号
		 */
		constructor(options: {
			connectName: string,
			host: string,
			port: string,
			password: string,
			db: number
		});
	}
	/**
	 * Redis 数据库操作类
	 * @class
	 */
	class RedisPlus {
		/**
		 * 创建一个数据库操作对象
		 * @constructor
		 * @param {RedisPlusInfo} redisPlusInfo 数据库连接对象
		 */
		constructor();

		/**
		 * 设置当前客户端所操作的数据库的存储容器编号
		 * @async
		 * @param {string | number} no 容器编号
		 * @returns {string} 返回状态值，可能为 null
		 */
		select(no: string): Promise<string>;
		/**
		 * 设置 key 的过期时间，以秒计
		 * @async
		 * @param {string} key 数据键
		 * @param {number} second 过期时间，以秒计
		 * @returns {number} 返回通过 key 是否成功设置过期时间
		 */
		expire(key: string, second: number): Promise<number>;
		/**
		 * 通过 UNIX 时间戳的参数方式设置 key 的过期时间
		 * @async
		 * @param {string} key 数据键
		 * @param {number} timestamp 过期时间，UNIX 时间戳
		 * @returns {number} 返回通过 key 是否成功设置过期时间
		 */
		expireat(key: string, timestamp: number): Promise<number>;
		/**
		 * 设置 key 的过期时间，以秒计
		 * @async
		 * @param {string} key 数据键
		 * @param {number} milliseconds 过期时间，以秒计
		 * @returns {number} 返回通过 key 是否成功设置过期时间
		 */
		pexpire(key: string, milliseconds: number): Promise<number>;
		/**
		 * 通过 UNIX 时间戳(毫秒级)的参数方式设置 key 的过期时间
		 * @async
		 * @param {string} key 数据键
		 * @param {number} millisecondsTimestamp 过期时间，UNIX 时间戳(毫秒级)
		 * @returns {number} 返回通过 key 是否成功设置过期时间
		 */
		pexpireat(key: string, millisecondsTimestamp: number): Promise<number>;
		/**
		 * 移除 key 的过期时间，key 将永久保持
		 * @async
		 * @param {string} key 数据键
		 * @returns {number} 返回通过 key 是否成功移除过期时间
		 */
		persist(key: string): Promise<number>;
		/**
		 * 查询 key 的剩余生存时间
		 * @async
		 * @param {string} key 数据键
		 * @returns {number} 返回 key 的剩余生存时间，-1 为永久保持
		 */
		ttl(key: string): Promise<number>;
		/**
		 * 查询 key 的剩余生存时间
		 * @async
		 * @param {string} key 数据键
		 * @returns {number} 返回 key 的剩余生存时间(毫秒级)，-1 为永久保持
		 */
		pttl(key: string): Promise<number>;
		/**
		 * 返回一个随机的 key
		 * @async
		 * @returns {string} 返回一个随机的 key
		 */
		randomkey(): Promise<string>;
		/**
		 * 通过 pattern 获取符合要求的 key 集合
		 * @async
		 * @param {string} pattern 匹配参数
		 * @returns {Array} 返回符合要求的 key 集合
		 */
		keys(pattern: string): Promise<Array<string>>;
		/**
		 * 通过 key 获取数据库容器的数据类型
		 * @async
		 * @param {string} key 数据键
		 * @returns {string} 返回通过 key 获取数据库容器的数据类型
		 */
		type(key: string): Promise<string>;
		/**
		 * 通过 key 删除指定键值
		 * @async
		 * @param {string} key 数据键
		 * @returns {number} 返回通过 key 是否删除掉键值
		 */
		del(key: string): Promise<number>;
		/**
		 * 通过 key 判断指定键是否存在
		 * @async
		 * @param {string} key 数据键
		 * @returns {number} 返回通过 key 是否查找到对应的键值
		 */
		exists(key: string): Promise<number>;
		/**
		 * 通过 key 转移当前键值所在的数据库
		 * @async
		 * @param {string} key 数据键
		 * @param {string | number} no
		 * @returns {number} 返回通过 key 是否成功转移到指定数据库
		 */
		move(key: string, db: string | number): Promise<number>;

		/**
		 * 迭代并通过 pattern 获取符合要求的 key 集合
		 * @async
		 * @param {string} pattern 匹配参数
		 * @param {number} count 数据集中返回的元素数量
		 * @returns {Array} 返回符合要求的 key 集合
		 */
		scanKeys(pattern: string, count: number): Promise<Array<string>>;

		/**
		 * 通过 key 获取数据库容器内的指定数据
		 * @async
		 * @param {string} key 数据键
		 * @returns {string} 返回通过 key 获取到的对应的 value
		 */
		get(key: string): Promise<string>;
		/**
		 * 通过 key 设置数据库容器内的指定数据值
		 * @async
		 * @param {string} key 数据键
		 * @param {string | number | boolean} value 数据值
		 * @returns {string} 返回执行后的状态，'OK'代表执行完成
		 */
		set(key: string): Promise<string>;
		/**
		 * 通过 key 获取当前数据值并设置新的数据值
		 * @async
		 * @param {string} key 数据键
		 * @param {string | number | boolean} value 数据值
		 * @returns {string} 返回设置前的旧值
		 */
		getset(key: string): Promise<string>;
		/**
		 * 通过 key 将新值追加到原值后
		 * @async
		 * @param {string} key 数据键
		 * @param {string | number | boolean} value 数据值
		 * @returns {number} 返回追加后的值的长度
		 */
		append(key: string, value: string | number | boolean): Promise<number>;

		/**
		 * 通过 key 对应值的数字值增 1
		 * @async
		 * @param {string} key 数据键
		 * @returns {number} 返回增量后的结果
		 */
		incr(key: string): Promise<number>;
		/**
		 * 通过 key 对应值的数字值增加给定的增量
		 * @async
		 * @param {string} key 数据键
		 * @param {number} increment 增量
		 * @returns {number} 返回增量后的结果
		 */
		incrby(key: string): Promise<number>;
		/**
		 * 通过 key 对应值的数字值增 1
		 * @async
		 * @param {string} key 数据键
		 * @returns {number} 返回增量后的结果
		 */
		decr(key: string): Promise<number>;
		/**
		 * 通过 key 对应值的数字值减少给定的增量
		 * @async
		 * @param {string} key 数据键
		 * @param {number} increment 减量
		 * @returns {number} 返回减量后的结果
		 */
		decrby(key: string): Promise<number>;
		/**
		 * 通过 key 对应值的数字值增 1
		 * @async
		 * @param {string} key 数据键
		 * @returns {number} 返回增量后的结果
		 */
		incrbyfloat(key: string): Promise<number>;

	}

	/**
	 * 状态信息类
	 * @class
	 */
	class StateInfo {
		/**
		 * 创建一个状态信息对象
		 * @constructor
		 * @param {string | number} no 状态信息编号
		 * @param {string} text 状态信息描述
		 * @param {number} type 状态信息类型
		 * @param {string} [aliasName=null] 状态信息别名
		 */
		constructor(no: string | number, text: string, type: number, aliasName?: string);
		/**
		 * 编辑状态信息的描述文本
		 * @param {string} text 状态信息描述
		 * @param {number | null} [type=null] 状态信息类型，可为空
		 */
		changeInfo(text: string, type?: number | null): void;
		/**
		 * 将状态信息显示到控制台
		 */
		getToConsole(): void;
		/**
		* 状态信息类型枚举
		*/
		static type: Enumerator;
	}

}