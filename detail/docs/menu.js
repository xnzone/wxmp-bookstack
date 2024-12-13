export const menuConfig = [
  {
    "id": "01_mysql_45",
    "title": "",
    "children": [
      {
        "id": "01-mysql-45_00-cover",
        "title": "MySQL实战45讲"
      },
      {
        "id": "01_select_sql_executor",
        "title": "基础架构：一条SQL查询语句是如何执行的"
      },
      {
        "id": "02_how_sql_execut",
        "title": "日志系统：一条SQL更新语句是如何执行的"
      },
      {
        "id": "03_transation",
        "title": "事务隔离：为什么你改了我还看不见"
      },
      {
        "id": "04_index_first",
        "title": "深入浅出索引(上)"
      },
      {
        "id": "05_index_second",
        "title": "深入浅出索引(下)"
      },
      {
        "id": "06_lock_global_and_table",
        "title": "全局锁和表锁：给表加个字段怎么有这么多阻碍"
      },
      {
        "id": "07_lock_row",
        "title": "行锁功过：怎么减少行锁对性能的影响"
      },
      {
        "id": "08_transation_isolate",
        "title": "事务到底是隔离的还是不隔离的"
      },
      {
        "id": "09_index_choose",
        "title": "普通索引和唯一索引，应该怎么选择"
      },
      {
        "id": "10_mysql_choose_wrong_index",
        "title": "MySQL为什么有时候会选错索引"
      },
      {
        "id": "11_mysql_add_index",
        "title": "怎么给字符串字段加索引"
      },
      {
        "id": "12_mysql_shrink",
        "title": "为什么我的MySQL会“抖”一下"
      },
      {
        "id": "13_delete_data",
        "title": "为什么表数据删掉一半，表文件大小不变"
      },
      {
        "id": "14_count_slow",
        "title": "count(*)这么慢，我该怎么办"
      },
      {
        "id": "15_qa_log_index",
        "title": "答疑文章（一）：日志和索引相关问题"
      },
      {
        "id": "16_order_by",
        "title": "order by 是怎么工作的？"
      },
      {
        "id": "17_random",
        "title": "如何正确的显示随机消息？"
      },
      {
        "id": "18_execute_difference",
        "title": "为什么这些SQL语句逻辑相同，性能却差别巨大？"
      },
      {
        "id": "19_why_slow",
        "title": "为什么我只查一行语句，也执行这么慢？"
      },
      {
        "id": "20_phantom_read",
        "title": "幻读是什么？幻读有什么问题？"
      },
      {
        "id": "21_why_lock",
        "title": "为什么我只查一行的语句，锁这么多？"
      },
      {
        "id": "22_run_fast",
        "title": "MySQL有哪些饮鸩止渴的提高性能的方法？"
      },
      {
        "id": "23_no_loss_data",
        "title": "MySQL是怎么保证数据不丢的？"
      },
      {
        "id": "24_consistency",
        "title": "MySQL是怎么保证主备一致的？"
      },
      {
        "id": "25_available",
        "title": "MySQL是怎么保证高可用的？"
      },
      {
        "id": "26_delay",
        "title": "备库为什么会延迟好几个小时？"
      },
      {
        "id": "27_master_slave",
        "title": "主库出问题了，从库怎么办？"
      },
      {
        "id": "28_write_read",
        "title": "读写分离有哪些坑？"
      },
      {
        "id": "29_mysql_error",
        "title": "如何判断一个数据库是不是出问题了？"
      },
      {
        "id": "30_qa_lock",
        "title": "答疑文章（二）：用动态的观点看加锁"
      },
      {
        "id": "31_delete_mistake",
        "title": "误删数据后除了跑路，还能怎么办？"
      },
      {
        "id": "32_can_not_kill",
        "title": "为什么还有kill不掉的语句？"
      },
      {
        "id": "33_data_full",
        "title": "我查这么多数据，会不会把数据库内存打爆？"
      },
      {
        "id": "34_join",
        "title": "到底可不可以使用join？"
      },
      {
        "id": "35_join_optimize",
        "title": "join语句怎么优化？"
      },
      {
        "id": "36_temp_table",
        "title": "为什么临时表可以重名？"
      },
      {
        "id": "37_when_temp_table",
        "title": "什么时候会使用内部临时表？"
      },
      {
        "id": "38_mysql_engine",
        "title": "都说InnoDB好，那还要不要使用Memory引擎？"
      },
      {
        "id": "39_primary",
        "title": "自增主键为什么不是连续的？"
      },
      {
        "id": "40_insert_lock",
        "title": "insert语句的锁为什么这么多？"
      },
      {
        "id": "41_copy_table",
        "title": "怎么最快地复制一张表？"
      },
      {
        "id": "42_grant",
        "title": "grant之后要跟着flush privilege吗？"
      },
      {
        "id": "43_partition",
        "title": "要不要使用分区表？"
      },
      {
        "id": "44_qa_good",
        "title": "答疑文章（三）"
      },
      {
        "id": "45_id_over",
        "title": "自增id用完了怎么办？"
      }
    ]
  },
  {
    "id": "02_redisdoc",
    "title": "",
    "children": [
      {
        "id": "02-redisdoc_cover",
        "title": "Redis命令参考"
      },
      {
        "id": "01_string",
        "title": "字符串",
        "children": [
          {
            "id": "01_set",
            "title": "SET"
          },
          {
            "id": "02_setnx",
            "title": "SETNX"
          },
          {
            "id": "03_setex",
            "title": "SETEX"
          },
          {
            "id": "04_psetex",
            "title": "PSETEX"
          },
          {
            "id": "05_get",
            "title": "GET"
          },
          {
            "id": "06_getset",
            "title": "GETSET"
          },
          {
            "id": "07_strlen",
            "title": "GETSET"
          },
          {
            "id": "08_append",
            "title": "APPEND"
          },
          {
            "id": "09_setrange",
            "title": "SETRANGE"
          },
          {
            "id": "10_getrange",
            "title": "GETRANGE"
          },
          {
            "id": "11_incr",
            "title": "INCR"
          },
          {
            "id": "12_incrby",
            "title": "INCRBY"
          },
          {
            "id": "13_incrbyfloat",
            "title": "INCRBYFLOAT"
          },
          {
            "id": "14_decr",
            "title": "DECR"
          },
          {
            "id": "15_decrby",
            "title": "DECRBY"
          },
          {
            "id": "16_mset",
            "title": "MSET"
          },
          {
            "id": "17_msetnx",
            "title": "MSETNX"
          },
          {
            "id": "18_mget",
            "title": "MGET"
          },
          {
            "id": "_index",
            "title": "字符串"
          }
        ]
      },
      {
        "id": "02_hash",
        "title": "哈希表",
        "children": [
          {
            "id": "01_hset",
            "title": "HSET"
          },
          {
            "id": "02_hsetnx",
            "title": "HSETNX"
          },
          {
            "id": "03_hget",
            "title": "HGET"
          },
          {
            "id": "04_hexists",
            "title": "HEXISTS"
          },
          {
            "id": "05_hdel",
            "title": "HDEL"
          },
          {
            "id": "06_hlen",
            "title": "HLEN"
          },
          {
            "id": "07_hstrlen",
            "title": "HSTRLEN"
          },
          {
            "id": "08_hincrby",
            "title": "HINCRBY"
          },
          {
            "id": "09_hincrbyfloat",
            "title": "HINCRBYFLOAT"
          },
          {
            "id": "10_hmset",
            "title": "HMSET"
          },
          {
            "id": "11_hmget",
            "title": "HMGET"
          },
          {
            "id": "12_hkeys",
            "title": "HKEYS"
          },
          {
            "id": "13_hvals",
            "title": "HVALS"
          },
          {
            "id": "14_hgetall",
            "title": "HGETALL"
          },
          {
            "id": "15_hscan",
            "title": "HSCAN"
          },
          {
            "id": "_index",
            "title": "哈希表"
          }
        ]
      },
      {
        "id": "03_list",
        "title": "列表",
        "children": [
          {
            "id": "01_lpush",
            "title": "LPUSH"
          },
          {
            "id": "02_lpushx",
            "title": "LPUSHX"
          },
          {
            "id": "03_rpush",
            "title": "RPUSH"
          },
          {
            "id": "04_rpushx",
            "title": "RPUSHX"
          },
          {
            "id": "05_lpop",
            "title": "LPOP"
          },
          {
            "id": "06_rpop",
            "title": "RPOP"
          },
          {
            "id": "07_rpoplpush",
            "title": "RPOPLPUSH"
          },
          {
            "id": "08_lrem",
            "title": "LREM"
          },
          {
            "id": "09_llen",
            "title": "LLEN"
          },
          {
            "id": "10_lindex",
            "title": "LINDEX"
          },
          {
            "id": "11_linsert",
            "title": "LINSERT"
          },
          {
            "id": "12_lset",
            "title": "LSET"
          },
          {
            "id": "13_lrange",
            "title": "LRANGE"
          },
          {
            "id": "14_ltrim",
            "title": "LTRIM"
          },
          {
            "id": "15_blpop",
            "title": "BLPOP"
          },
          {
            "id": "16_brpoplpush",
            "title": "BRPOPLPUSH"
          },
          {
            "id": "_index",
            "title": "列表"
          }
        ]
      },
      {
        "id": "04_set",
        "title": "集合",
        "children": [
          {
            "id": "01_sadd",
            "title": "SADD"
          },
          {
            "id": "02_sismember",
            "title": "SISMEMBER"
          },
          {
            "id": "03_spop",
            "title": "SPOP"
          },
          {
            "id": "04_srandmember",
            "title": "SRANDMEMBER"
          },
          {
            "id": "05_srem",
            "title": "SREM"
          },
          {
            "id": "06_smove",
            "title": "SMOVE"
          },
          {
            "id": "07_scard",
            "title": "SCARD"
          },
          {
            "id": "08_smembers",
            "title": "SMEMBERS"
          },
          {
            "id": "09_sscan",
            "title": "SSCAN"
          },
          {
            "id": "10_sinter",
            "title": "SINTER"
          },
          {
            "id": "11_sinterstore",
            "title": "SINTERSTORE"
          },
          {
            "id": "12_sunion",
            "title": "SUNION"
          },
          {
            "id": "13_sunionstore",
            "title": "SUNIONSTORE"
          },
          {
            "id": "14_sdiff",
            "title": "SDIFF"
          },
          {
            "id": "15_sdiffstore",
            "title": "SDIFFSTORE"
          },
          {
            "id": "_index",
            "title": "集合"
          }
        ]
      },
      {
        "id": "05_zset",
        "title": "有序集合",
        "children": [
          {
            "id": "01_zadd",
            "title": "ZADD"
          },
          {
            "id": "02_zscore",
            "title": "ZSCORE"
          },
          {
            "id": "03_zincrby",
            "title": "ZINCRBY"
          },
          {
            "id": "04_zcard",
            "title": "ZCARD"
          },
          {
            "id": "05_zcount",
            "title": "ZCOUNT"
          },
          {
            "id": "_index",
            "title": "有序集合"
          }
        ]
      }
    ]
  },
  {
    "id": "03_distributed_systems_for_fun_and_profit",
    "title": "",
    "children": [
      {
        "id": "03-distributed-systems-for-fun-and-profit_00-cover",
        "title": "Distributed systems: for fun and profit"
      },
      {
        "id": "01_distributed_systems_at_a_high_level",
        "title": "Distributed systems at a high level"
      },
      {
        "id": "02_up_and_down_the_level_of_abstraction",
        "title": "Up and down the level of abstraction"
      },
      {
        "id": "03_time_and_order",
        "title": "Time and order"
      },
      {
        "id": "04_replication",
        "title": "Replication"
      },
      {
        "id": "05_replication_weak_consistency_model_protocols",
        "title": "Replication: weak consistency model protocols"
      },
      {
        "id": "06_further_reading_and_appendix",
        "title": "Further reading and appendix"
      }
    ]
  },
  {
    "id": "04_distributed_systems_for_fun_and_profit_zh",
    "title": "",
    "children": [
      {
        "id": "04-distributed-systems-for-fun-and-profit-zh_00-cover",
        "title": "趣谈分布式系统"
      },
      {
        "id": "01_distributed_systems_at_a_high_leve_zh",
        "title": "分布式系统概览"
      }
    ]
  },
  {
    "id": "search",
    "title": "Search"
  }
]