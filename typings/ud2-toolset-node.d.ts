import ResponseMultiList from "../express/ResponseMultiList";

declare module 'ud2-toolset-node' {

	class Decimal { }
	class mongodb {
		ObjectId: object;
		Decimal128: object;
		Long: object;
		ClientSession: object;
		MongoClient: object;
		AggregationCursor: object;
	}
	class express {
		Router: object;
		Response: object;
		Request: object;
	}

	/**
	 * 页码对象
	 * @class
	 */
	class PageInfo {
		/**
		 * 创建一个页码对象
		 * @param {number} now 当前页
		 * @param {number} size 页尺寸
		 * @param {number} count 条目总数量
		 */
		constructor(now: number, size: number, count: number);
	}

	/**
	 * 控制器基础类
	 * @class
	 */
	class Controller {
		/**
		 * 创建一个控制器
		 * @constructor
		 * @param {string} controllerName 控制器名称
		 * @param {object} [options={}] 操作选项 
		 * @param {AjaxArgsChecker} [deriveChecker=null] 派生检测器类
		 * @param {object} [deriveState=null] 派生状态对象
		 */
		constructor(controllerName: string, options: {
			deriveChecker: AjaxArgsChecker,
			deriveState: object
		});

		/**
		 * 控制器创建
		 * @param {function} createrCallback 创建器回调
		 * @returns { express.Router } 返回路由对象
		 */
		create(createrCallback: Function): express['Router'];

		/**
		 * 获取 Router 路由对象
		 * @returns {express.Router} 返回路由对象
		 */
		getRouter(): express['Router'];
	}

	/**
	 * 响应处理类
	 * @class
	 */
	class ResponseHandler {

		/**
		 * 自定义响应输出对象
		 * @static
		 * @param {express.Response} res Response 对象
		 * @param {StateInfo | MongoResultInfo} info 状态对象
		 * @param {object} [render={}] 递交业务结果对象
		 */
		static render(res: express['Response'], info: StateInfo | MongoResultInfo, render: object): void;

		/**
		 * 错误响应输出对象
		 * @static
		 * @param {express.Response} res Response 对象
		 * @param {StateInfo | MongoResultInfo} info 状态对象
		 * @param {object} [render={}] 递交业务结果对象
		 */
		static error(res: express['Response'], info: StateInfo | MongoResultInfo, render: object): void;

		/**
		 * 基于 MongoResultInfo 的列表响应输出对象
		 * @param {express.Response} res Response 对象
		 * @param {MongoResultInfo} mongoResultInfo MongoResultInfo 状态对象
		 */
		static list(res: express['Response'], mongoResultInfo: MongoResultInfo): void;

		/**
		 * 基于 MongoResultInfo 的页码列表响应输出对象
		 * @param {express.Response} res Response 对象
		 * @param {object} pageInfo 页码对象
		 * @param {MongoResultInfo} mongoResultInfo MongoResultInfo 状态对象
		 */
		static pageList(res: express['Response'], pageInfo: object, mongoResultInfo: MongoResultInfo): void;

		/**
		 * 基于 ResponseMultiList 的集合响应输出对象
		 * @param {express.Response} res Response 对象
		 * @param {ResponseMultiList} responseMultiList MongoResultInfo 集合处理对象
		 */
		static mulitList(res: express['Response'], responseMultiList: ResponseMultiList): void;

	}
	/**
	 * 多集合输出处理类
	 * @class
	 */
	class ResponseMultiList {

		/**
		 * 构造一个多集合处理对象
		 * @constructor
		 */
		constructor();

		/**
		 * 向处理对象添加集合
		 * @param {string} name 集合名称
		 * @param {MongoResultInfo} mongoResultInfo 数据库状态对象
		 * @param {object} [page=null] 页码对象
		 */
		add(name: string, mongoResultInfo: MongoResultInfo, page?: { now: number, size: number }): void;

		/**
		 * 检测容器中是否包含错误对象
		 * @returns {boolean} 返回容器中是否包含错误对象
		 */
		hasError(): boolean;

		/**
		 * 检测容器中是否无错误对象
		 * @returns {boolean} 返回容器中是否无错误对象
		 */
		noError(): boolean;

		/**
		 * 输出容器错误对象
		 * @returns {MongoResultInfo} 返回容器错误对象
		 */
		error(): MongoResultInfo;

		/**
		 * 输出多集合组合结果对象
		 * @returns {object} 输出组合结果对象
		 */
		result(): object;

	}

	/**
	 * 页处理类
	 * @class
	 */
	class PageHandler {

		/**
		 * 页码信息
		 * @param {PageInfo} pageInfo 页码对象
		 * @param {number} count 数据数据
		 * @returns {object} pageInfo 对象
		 */
		static pageInfo(page: object, allCount: number): object;

	}

	/**
	 * 路由处理类
	 * @class
	 */
	class RouterHandler {

		/**
		 * 基础访问路由创建
		 * @param {object[]} pathSet 路径规则设定
		 * @param {string} pathSet[].visit 访问路径
		 * @param {string} pathSet[].view 需呈现的页面路径
		 * @param {object} renderOptions 页面呈现处理配置参数
		 * @param {express.Express} [renderOptions.app=null] Express 对象
		 * @param {string} [renderOptions.appUsePath=null] 首要访问路径
		 * @param {object} [renderOptions.options={}] 呈现页面过程中向页面传递的参数对象
		 * @param {string} [renderOptions.preViewPath=''] 页面路径中的前置路径
		 * @param {function(express.Request, express.Response):boolean} [renderOptions.preCallback=Utils.noopTrue] 页面处理的前置回调 如果为false 则不执行页面呈现
		 * @returns {express.Router} 路由对象
		 */
		static routerBaseCreate(pathSet: Array<{
			visit: string,
			view: string
		}>, renderOptions: {
			app?: express,
			appUsePath?: string,
			options: object,
			preViewPath: string,
			preCallback: boolean
		}): express['Router'];

		/**
		 * 参数访问路由创建
		 * @param {string} preVisitPath 前置访问路径
		 * @param {object[]} pathParams 路径参数集合
		 * @param {object} renderOptions 页面呈现处理配置参数
		 * @param {express.Express} [renderOptions.app=null] Express 对象
		 * @param {string} [renderOptions.appUsePath=null] 首要访问路径
		 * @param {object} [renderOptions.options={}] 呈现页面过程中向页面传递的参数对象
		 * @param {string} [renderOptions.preViewPath=''] 页面路径中的前置路径
		 * @param {function(express.Request, express.Response):boolean} [renderOptions.preCallback=Utils.noopTrue] 页面处理的前置回调 如果为false 则不执行页面呈现
		 * @returns {express.Router} 路由对象
		 */
		static routerParamsCreate(preVisitPath: string, pathParams: object, renderOptions: {
			app?: express,
			appUsePath?: string,
			options: object,
			preViewPath: string,
			preCallback: boolean
		}): express['Router'];

		/**
		 * 控制器路由创建
		 * @param {controller} controller 控制器对象
		 * @param {object} renderOptions 页面呈现处理配置参数
		 * @param {express.Express} [renderOptions.app=null] Express 对象
		 * @param {string} [renderOptions.appUsePath=null] 首要访问路径
		 * @returns {express.Router} 路由对象
		 */
		static routerControllerCreate(): express['Router'];

	}

	/**
	 * 模型创建器
	 * @class
	 */
	class ModelCreater {

		/**
		 * 创建一个模型创建器
		 * @constructor
		 * @param {string} name 模型名称
		 * @param {object} cols 模型属性对象集合
		 * @param {object} options 模型配置参数
		 * @param {string} options.realName 模型在数据库中名称，如为 null 则名称同 name
		 * @param {string} options.version 模型的版本号
		 */
		constructor(controllerName: string, cols: object, options: {
			realName: string,
			version: string
		})

		/**
		 * 获取模型列对象集合
		 * @returns {object} 返回该模型的列对象集合
		 */
		getModelCols(): object;

		/**
		 * 模型的参数值检测方法
		 * @param {object} data 待检测的参数值数据
		 * @param {object} [option={}] 检测参数
		 * @param {string} [option.checkModelMode=CheckModelModeEnum.modelFull] 检测模型参数的方式
		 * @param {string} [option.checkValueMode=null] 检测模型参数值的方式
		 * @returns {object} 检测后的参数值数据，如果检测失败，并且检测参数中有返回报告设置，则返回错误对象
		 */
		getModelCols(data: object, option: {
			checkModelMode: string,
			checkValueMode?: string
		}): object;

		/**
		 * 模型的参数值检测方法
		 * @param {object} data 待检测的参数值数据
		 * @param {object} [option={}] 检测参数
		 * @param {string} [option.checkModelMode=CheckModelModeEnum.modelFull] 检测模型参数的方式
		 * @param {string} [option.checkValueMode=null] 检测模型参数值的方式
		 * @returns {object} 检测后的参数值数据，如果检测失败，并且检测参数中有返回报告设置，则返回错误对象
		 */
		valueCheck(data: object, option: {
			checkModelMode: string,
			checkValueMode?: string
		}): object;

		/**
		 * 通过传入的参数值数据创建一个模型数据对象
		 * @param {object} data 待检测的参数值数据
		 * @param {object} [option={}] 检测参数
		 * @param {string} [option.checkModelMode=CheckModelModeEnum.modelFull] 检测模型参数的方式
		 * @param {string} [option.checkValueMode=null] 检测模型参数值的方式
		 * @returns {object} 模型数据对象，如果检测失败，并且检测参数中有返回报告设置，则返回错误对象
		 */
		create(data: object, option: {
			checkModelMode: string,
			checkValueMode?: string
		}): object;

		/**
		 * 通过传入的参数值数据创建一个模型数据对象
		 * 该模型模型参数检测方式为 modelPart，即通过传入模型参数返回只含有部分属性的模型，而非补全模型属性
		 * @param {object} data 待检测的参数值数据
		 * @param {string} [checkValueMode=CheckValueModeEnum.failToDefault] 检测模型参数值的方式
		 * @returns {object} 模型数据对象，如果检测失败，并且检测参数中有返回报告设置，则返回错误对象
		 */
		createPart(data: object, checkValueMode: string): object;

	}
	/**
	 * 聚合管道类
	 */
	class AggregatePipeline {

		/**
		 * 创建一个聚合管道对象
		 * @constructor
		 * @param {ModelCreater | null} [baseModel=null] 初始 Model
		 */
		constructor(baseModel: ModelCreater | null);
		/**
		 * 管道操作对象集合
		 * @member
		 */
		pipeline: Array<object>;
		/**
		 * 向聚合管道添加一个集合关联对象
		 * @param {ModelCreater | string} fromModel 关联模型
		 * @param {string} localField 主集合查询字段
		 * @param {string} foreignField 外连集合待查字段
		 * @param {string} lookName 关联名称
		 * @returns {this} 返回当前对象
		 */
		lookup(fromModel: ModelCreater | string, localField: string, foreignField: string, lookName: string): this;
		/**
		 * 向聚合管道添加一个展开对象
		 * @param {string} name 展开字段名称
		 * @param {boolean} [preserveNullAndEmptyArrays=false] 是否保留空/空白数组
		 * @returns {this} 返回当前对象
		 */
		unwind(name: string, preserveNullAndEmptyArrays?: boolean): this;
		/**
		 * 向聚合管道添加一个投影对象
		 * @param {object} rule 投影规则
		 * @returns {this} 返回当前对象
		 */
		project(rule: object): this;
		/**
		 * 向管道添加一个排序规则
		 * @param {object | string} rule 排序规则字段名称
		 * @param {number | boolean} [ruleMethod] 排序方式
		 * @returns {this} 返回当前对象
		 * @example
		 * sort(rule: object)
		 * % 通过排序规则进行管道设置
		 * sort(rule: string, ruleMethod: boolean)
		 * % 通过排序字段及排序方式进行管道设置
		 */
		sort(rule: object | string, ruleMethod: number | boolean): this;
		/**
		 * 设置管道游标跳过数据的条目数量
		 * @param {number} value 跳过数据的条目数量
		 * @returns {this} 返回当前对象
		 */
		skip(value: number): this;
		/**
		 * 设置管道游标输出数据的条目数量
		 * @param {number} value 输出数据的条目数量
		 * @returns {this} 返回当前对象
		 */
		limit(value: number): this;
		/**
		 * 向管道添加一个分组规则
		 * @param {object} rule 分组规则
		 * @returns {this} 返回当前对象
		 */
		group(rule: object): this;
		/**
		 * 向管道添加一个匹配规则
		 * @param {object} rule 匹配规则
		 * @returns {this} 返回当前对象
		 */
		match(rule: object): this;
		/**
		 * 当管道执行到当前阶段时，统计当前阶段中的文档数量
		 * @param {string} countName 计数字段名称
		 * @returns {this} 返回当前对象
		 */
		count(countName: string): this;

		/**
		 * 通过 PageInfo 对象向管道加入分页条件
		 * 在调用处进行分页操作
		 * @param {number | PageInfo} [now] 当前页 或 单参数时为分页对象
		 * @param {number} [max] 最大页
		 * @returns {this} 返回当前操作对象
		 */
		pageHere(now?: number | PageInfo, max?: number): this;
		/**
		 * 向管道加入统计条件
		 * 在调用处进行统计操作
		 * 统计会在结果集中输出
		 * @returns {this} 返回当前操作对象
		 */
		countHere(): this;

		/**
		 * 向管道添加若干字段
		 * @param {object} fields 字段及字段参数
		 * @returns {this} 返回当前对象
		 */
		addFields(fields: object): this;
		/**
		 * 向管道添加若干字段
		 * @param {object} fields 字段及字段参数
		 * @returns {this} 返回当前对象
		 */
		set(fields: object): this;
		/**
		 * 从管道移除若干字段
		 * @param {Array<string>} fields 字段
		 * @returns {this} 返回当前对象
		 */
		unset(fields: Array<string>): this;

	}
	/**
	 * 聚合对象
	 * 通过执行聚合管道流程后生成的聚合对象
	 * @class
	 */
	class AggregateResultInfo {

		/**
		 * 创建一个聚合对象
		 * @constructor
		 * @param {AggregationCursor} cursor 聚合游标
		 * @param {object} options 聚合对象选项
		 * @param {number} [returnCount=0] 聚合回传总数
		 */
		constructor(cursor: mongodb['AggregationCursor']);
		/**
		 * 返回聚合后得到的数据集
		 * @returns {Array<object>} 聚合后得到的数据集
		 */
		toArray(): Promise<Array<object>>;
		/**
		 * 返回聚合后得到的数据集
		 * 并输出为 MongoResultInfo
		 * @returns {MongoResultInfo} 返回聚合后得到的数据集，并输出响应的结果对象
		 */
		find(): Promise<MongoResultInfo>;
		/**
		 * 返回聚合后得到的单条数据
		 * 并输出为 MongoResultInfo
		 * @returns {MongoResultInfo} 返回聚合后得到的单条数据，并输出响应的结果对象
		 */
		findOne(): Promise<MongoResultInfo>;

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
		 * MongoDB 管道执行方法
		 * @async
		 * @param {MongoModel} model 数据模型
		 * @param {Array} [pipeline=[]] 聚合管道
		 * @param {object} [options={}] 聚合参数
		 * @param {mongodb.ClientSession | null} [options.session=null] MongoClient 运行中的 session 对象
		 * @param {number} [options.batchSize=1000] 聚合返回的文档数
		 * @returns {AggregateResultInfo} 聚合对象
		 */
		aggregate(model: object, pipeline: Array<object>, options?: {
			session?: mongodb['ClientSession'],
			batchSize?: number
		}): AggregateResultInfo;
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
		 * @param {object | null} [options.projection=null] 查询方法中的显示字段筛选
		 * @param {object | null} [options.sort=null] 查询方法中的排序
		 * @param {number | null} [options.skip=null] 查询方法中跳过的数据行数
		 * @param {number | null} [options.limit=null] 查询方法中提取的数据行数
		 * @param {PageInfo | object | null} [options.page=null] 查询方法中需要的页码
		 * @param {boolean} [options.isCount=false] 是否统计查询行数
		 * @returns {MongoResultInfo} 事务执行完毕所返回的相关结果对象
		 */
		find(model: object, options: {
			session?: mongodb['ClientSession'],
			where?: object | null,
			projection?: object | null,
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
		 * @param {object | null} [options.projection=null] 查询方法中的显示字段筛选
		 * @param {object | null} [options.sort=null] 查询方法中的排序
		 * @returns {MongoResultInfo} 事务执行完毕所返回的相关结果对象
		 */
		findOne(model: object, options: {
			session?: mongodb['ClientSession'],
			where?: object | null,
			projection?: object | null,
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
		 * @param {object | Array} [options.result=null] 结果对象或集合
		 * @param {number | null} [options.count=null] 统计数据
		 * @param {object | null} [options.render=null] 传递原参数
		 * @param {ObjectId | null} [options.insertedId=null] 执行新增后的新增行对应的 ObjectId
		 * @param {Array | null} [options.insertedIds=null] 执行新增后的新增行对应的 ObjectId 集合
		 * @param {number | null} [options.insertedCount=null] 执行新增后的新增行数
		 * @param {number | null} [options.modifiedCount=null] 执行更新后的更新行数
		 * @param {number | null} [options.matchedCount=null] 执行更新时的 where 条件匹配的行数
		 * @param {ObjectId | null} [options.upsertedId=null] 执行更新并新增后的新增行对应的 ObjectId
		 * @param {number | null} [options.upsertedCount=null] 执行更新并新增后的新增行数
		 * @param {number | null} [options.deletedCount=null] 执行删除后的删除行数
		 * @param {string} [options.errorRemark=null] 错误描述
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
		 * @param {string | null} [options.errorRemark=null] 错误描述
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
	/**
	 * 状态管理者类
	 * @class
	 */
	class StateManager {

		/**
		 * 新增状态信息
		 * @param {string | number} no 状态编号
		 * @param {string} text 状态描述
		 * @param {number} type 状态类型
		 * @param {string} [aliasName=null] 状态信息别名
		 */
		stateInfoAdd(no: string, text: string, type: number, aliasName?: string): void;
		/**
		 * 编辑状态信息
		 * @param {string | number} no 状态编号
		 * @param {string} text 状态描述
		 * @param {Enumerator} [type=null] 状态类型
		 */
		stateInfoChange(no: string | number, text: string, type?: Enumerator | null): void;

		/**
		 * 移除状态信息
		 * @param {string | number} no 状态编号
		 */
		stateInfoRemove(no: string | number): void;

	}

	/**
	* 提交检测器类
	* @class
	*/
	class AjaxArgsChecker {

		/**
		 * 检测容器中是否包含错误对象
		 * @returns {boolean} 返回容器中是否包含错误对象
		 */
		hasError(): boolean;

		/**
		 * 检测容器中错误数量是否为 0
		 * @returns {boolean} 返回容器中错误数量是否为 0
		 */
		noError(): boolean;

		/**
		 * 打印错误对应的结果对象
		 * @param {express.Response} res Response 对象
		 */
		print(): void;
		/**
		 * 清空错误列表
		 */
		empty(): void;

		/**
		 * 判断传入值是否符合 ObjectId 规则
		 * @param {any} value 待检测的值
		 * @param {object} [options={}] 判断参数
		 * @param {string | null} [options.field=null] 字段信息
		 * @param {string} [options.errorText='id错误'] 错误文本
		 * @returns {boolean} 返回是否符合检测结果
		 */
		checkObjectId(value: any, options?: {
			field?: string | null,
			errorText?: string
		}): boolean;

		/**
		 * 字符串长度检测
		 * @param {any} value 待检测的值
		 * @param {object} [options={}] 判断参数
		 * @param {number} [options.des=null] 固定长度检测
		 * @param {number} [options.min=null] 最小长度检测
		 * @param {number} [options.max=null] 最大长度检测
		 * @param {string | null} [options.field=null] 字段信息
		 * @param {string} [options.errorText='字符串长度错误'] 错误文本
		 * @returns {boolean} 返回是否符合检测结果
		 * @example
		 * checkStringLength(value, { des: ? }); 固定长度检测
		 * checkStringLength(value, { min: ? }); 最小长度检测
		 * checkStringLength(value, { max: ? }); 最大长度检测
		 * checkStringLength(value, { min: ?, max: ? }); 长度范围检测
		 */
		checkStringLength(value: any, options?: {
			des?: number,
			min?: number,
			max?: number,
			field?: string | null,
			errorText: string
		}): boolean;

		/**
		 * 数值检测
		 * @param {any} value 待检测的值
		 * @param {object} [options={}] 判断参数
		 * @param {number} [options.min=null] 最小值
		 * @param {number} [options.max=null] 最大值
		 * @param {string | null} [options.field=null] 字段信息
		 * @param {string} [options.errorText='数值及范围错误'] 错误文本
		 * @returns {boolean} 返回是否符合检测结果
		 * @example
		 * checkNumber(value); 数值检测
		 * checkNumber(value, { min: ? }); 数值最小值检测
		 * checkNumber(value, { max: ? }); 数值最大值检测
		 * checkNumber(value, { min: ?, max: ? }); 数值范围检测
		 */
		checkNumber(value: any, options?: {
			min?: number,
			max?: number,
			field?: string | null,
			errorText?: string
		}): boolean;

		/**
		 * Decimal 数值检测
		 * @param {any} value 待检测的值
		 * @param {object} [options={}] 判断参数
		 * @param {number} [options.min=null] 最小值
		 * @param {number} [options.max=null] 最大值
		 * @param {string | null} [options.field=null] 字段信息
		 * @param {string} [options.errorText='数值及范围错误'] 错误文本
		 * @returns {boolean} 返回是否符合检测结果
		 */
		checkDecimal(value: any, options?: {
			min?: number,
			max?: number,
			field?: string | null
			errorText?: string
		}): boolean;

		/**
		 * 日期检测
		 * @param {any} value 待检测的值
		 * @param {object} [options={}] 判断参数
		 * @param {string | null} [options.field=null] 字段信息
		 * @param {string} [options.errorText='日期格式错误'] 错误文本
		 * @returns {boolean} 返回是否符合检测结果
		 */
		checkDate(value: any, field?: string | null, options?: {
			errorText: string
		}): boolean;

		/**
		 * 数组检测
		 * @param {any} value 待检测的值
		 * @param {object} [options={}] 判断参数
		 * @param {string | null} [field=null] 字段信息
		 * @param {CheckArrayInTypeEnum | null} [type=null] 检测类型
		 * @param {RegExp | null} [options.regex=Utils.RegexRule.all] 参数取值范围
		 * @param {Array<any> | null} [options.valueRange=[]] 参数取值范围
		 * @param {string} [options.errorText='数组格式错误'] 错误文本
		 * @returns {boolean} 返回是否符合检测结果
		 */
		checkArray(value: any, field?: string | null, options?: {
			type: String | null,
			regex: RegExp | null,
			valueRange: Array<any> | null,
			errorText: string
		}): boolean;

		/**
		 * 参数取值范围检测
		 * @param {any} value 待检测的值
		 * @param {object} [options={}] 判断参数
		 * @param {Array<any>} [options.valueRange=[]] 参数取值范围
		 * @param {string | null} [options.field=null] 字段信息
		 * @param {string} [options.errorText='范围内无此值'] 错误文本
		 * @returns {boolean} 返回是否符合检测结果
		 */
		checkByRange(value: any, valueRange: Array<any>, field?: string | null, options?: {
			errorText: string
		}): boolean;

		/**
		 * 参数正则范围检测
		 * @param {any} value 待检测的值
		 * @param {object} [options={}] 判断参数
		 * @param {RegExp} [options.regex=Utils.RegexRule.all] 参数取值范围
		 * @param {string | null} [options.field=null] 字段信息
		 * @param {string} [options.errorText='值不符合正则表达式'] 错误文本
		 * @returns {boolean} 返回是否符合检测结果
		 */
		checkByRegex(value: any, regex: RegExp, field?: string | null, options?: {
			errorText: string
		}): boolean;

		/**
		 * 手机号格式检测
		 * @param {any} value 待检测的值
		 * @param {object} [options={}] 判断参数
		 * @param {string | null} [options.field=null] 字段信息
		 * @param {string} [options.errorText='手机格式错误'] 错误文本
		 * @returns {boolean} 返回是否符合检测结果
		 */
		checkPhone(value: any, field?: string | null, options?: {
			errorText: string
		}): boolean;

		/**
		 * 电话号格式检测
		 * @param {any} value 待检测的值
		 * @param {object} [options={}] 判断参数
		 * @param {string | null} [options.field=null] 字段信息
		 * @param {string} [options.errorText='电话格式错误'] 错误文本
		 * @returns {boolean} 返回是否符合检测结果
		 */
		checkTelephone(value: any, field?: string | null, options?: {
			errorText: string
		}): boolean;

		/**
		 * 邮编格式检测
		 * @param {any} value 待检测的值
		 * @param {string | null} [field=null] 字段信息
		 * @param {object} [options={}] 判断参数
		 * @param {string} [options.errorText='邮编格式错误'] 错误文本
		 * @returns {boolean} 返回是否符合检测结果
		 */
		checkMail(value: any, field?: string | null, options?: {
			errorText: string
		}): boolean;

		/**
		 * 邮编格式检测
		 * @param {any} value 待检测的值
		 * @param {string | null} [field=null] 字段信息
		 * @param {object} [options={}] 判断参数
		 * @param {string} [options.errorText='邮编格式错误'] 错误文本
		 * @returns {boolean} 返回是否符合检测结果
		 */
		checkZipCode(value: any, field?: string | null, options?: {
			errorText: string
		}): boolean;

	}
	/**
	 * 常用值转换类
	 * @class
	 */
	class Converter {
		/**
		 * 将值强制转换为 ObjectId
		 * @static
		 * @param {any} value 待转换的值
		 * @param {mongodb['ObjectId'] | null} [defaultValue=null] 若无法转换，则返回此值
		 * @returns {mongodb['ObjectId'] | null} 返回转换后的值，若无法转换，则返回 defaultValue
		 */
		static toObjectId(value: any, defaultValue?: object): mongodb['ObjectId'] | null;
		/**
		 * 将值强制转换为 DB Decimal128
		 * @param {any} value 待转换的值
		 * @param {mongodb.Decimal128 | null} [defaultValue=null] 若无法转换，则返回此值
		 * @returns {mongodb.Decimal128 | null} 返回转换后的值，若无法转换，则返回 defaultValue
		 */
		static toDBDecimal128(value: any, defaultValue?: mongodb['Decimal128'] | null): mongodb['Decimal128'] | null;
		/**
		 * 将值强制转换为 DB Long
		 * @param {any} value 待转换的值
		 * @param {mongodb.Long | null} [defaultValue=null] 若无法转换，则返回此值
		 * @returns {mongodb.Long | null} 返回转换后的值，若无法转换，则返回 defaultValue
		 */
		static toDBLong(value: any, defaultValue?: mongodb['Long'] | null): mongodb['Long'] | null;

		/**
		 * 将参数强制转换为 Decimal
		 * @param {any} value 待转换的值
		 * @param {Decimal | null} [defaultValue=null] 若无法转换，则返回此值
		 * @returns {Decimal | null} 返回转换后的值，若无法转换，则返回 defaultValue
		 */
		static toDecimal(value: any, defaultValue: Decimal | null): Decimal | null;
		/**
		 * 将参数强制转换为 Number
		 * @param {any} value 待转换的值
		 * @param {Number | null} [defaultValue=null] 若无法转换，则返回此值
		 * @returns {Number | null} 返回转换后的值，若无法转换，则返回 defaultValue
		 */
		static toNumber(value: any, defaultValue: Number | null): Number | null;

		/**
		 * 将参数转换为助记码
		 * @param {string} value 待转换的值
		 * @returns {string} 返回转换后的助记码
		 */
		static toHelpCode(value: string): string;
	}

	/**
	 * 字符串处理类
	 * @class
	 */
	class StringHandler {

		/**
		 * 将字符串加密
		 * @static
		 * @param {string} text 待加密字符串
		 * @param {object} [options={}] 加密参数
		 * @param {string} options.digest 加密类型
		 * @param {string} options.saleBefore 加盐前缀
		 * @param {string} options.saleAfter 加盐后缀
		 * @returns {string} 加密后的文本
		 */
		static passToMD5(text: string, options: {
			digest: string,
			saleBefore: string,
			saleAfter: string
		}): string;

		/**
		 * 判断字符串是否为空或空字符串
		 * @static
		 * @param {string} text 待判断的字符串
		 * @returns {boolean} 返回是否为空 
		 */
		static isEmpty(text: string): boolean;

		/**
		 * 判断字符串是否有效
		 * @static
		 * @param {string} text 待判断的字符串
		 * @returns {boolean} 返回是否有效
		 */
		static isValid(text: string): boolean;

		/**
		 * 将16进制字符串转为36进制
		 * 其中转换前的16进制字符串为小写
		 * @static
		 * @param {string} text 待转换的16进制字符串
		 * @returns {string | null} 转换后的36进制字符串，当无法转换时返回 null
		 */
		static hexToShort(text: string): string | null;

	}
	/**
	* 字符串进制转换
	* @class
	*/
	class StringHexConverter {

		/**
		 * 构造进制转换类，并设定转换规则
		 * @constructor
		 * @param {string} srcAlphabet 转换前的进制序列
		 * @param {string} dstAlphabet 转换后的进制序列
		 */
		constructor(srcAlphabet: string, dstAlphabet: string);

		/**
		 * 将传入值转换为指定规则的值
		 * @param {string} number 待转换的值
		 * @returns {string | null} 转换后的值，无法转换时返回 null
		 */
		convert(number: string): string | null;

		/**
		 * 验证字符串是否符合转换前规则
		 * @param {string} number 待验证的字符串
		 * @returns {boolean} 验证结果
		 */
		isValid(number: string): boolean;

	}

	/**
	 * 类型检测类
	 * @class
	 */
	class TypeChecker {

		/**
		 * 判断类型
		 * @static
		 * @param {object} type 待判断类型的对象
		 * @returns {boolean} 返回一个方法，此方法用来判断传入的对象是否为指定的参数 [type] 类型 
		 */
		static isType(type: object): boolean;

		/**
		 * 判断传入参数值的类型是否为 Object
		 * @static
		 * @param {any} value 待检测的值
		 * @returns {boolean} 返回参数类型是否为 Object
		 */
		static isObject(value: any): boolean;

		/**
		 * 判断传入参数值的类型是否为 Function
		 * @static
		 * @param {any} value 待检测的值
		 * @returns {boolean} 返回参数类型是否为 Function
		 */
		static isFunction(value: any): boolean;

		/**
		 * 判断传入参数值的类型是否为 String
		 * @static
		 * @param {any} value 待检测的值
		 * @returns {boolean} 返回参数类型是否为 String
		 */
		static isString(value: any): boolean;

		/**
		 * 判断传入参数值的类型是否为 boolean
		 * @static
		 * @param {any} value 待检测的值
		 * @returns {boolean} 返回参数类型是否为 boolean
		 */
		static isboolean(value: any): boolean;

		/**
		 * 判断传入参数值的类型是否为 Number
		 * @static
		 * @param {any} value 待检测的值
		 * @returns {boolean} 返回参数类型是否为 Number
		 */
		static isNumber(value: any): boolean;

		/**
		 * 判断传入参数值的类型是否为 Array
		 * @static
		 * @param {any} value 待检测的值
		 * @returns {boolean} 返回参数类型是否为 Array
		 */
		static isArray(value: any): boolean;

		/**
		 * 判断传入参数值的类型是否为 Date
		 * @static
		 * @param {any} value 待检测的值
		 * @returns {boolean} 返回参数类型是否为 Date
		 */
		static isDate(value: any): boolean;

		/**
		 * 判断传入参数值的类型是否为 RegExp
		 * @static
		 * @param {any} value 待检测的值
		 * @returns {boolean} 返回参数类型是否为 RegExp
		 */
		static isRegExp(value: any): boolean;

	}
	/**
	 * 值检测类
	 * @class
	 */
	class ValueChecker {

		/**
		 * 检测传入值是否为 undefined 或 null
		 * @param {any} value 待检测的值
		 *  @returns {boolean} 返回检测结果
		 */
		static isUndefinedOrNull(value: any): boolean;

		/**
		 * 检测传入值是否为 undefined
		 * @param {any} value 待检测的值
		 *  @returns {boolean} 返回检测结果
		 */
		static isUndefined(value: any): boolean;

	}

}