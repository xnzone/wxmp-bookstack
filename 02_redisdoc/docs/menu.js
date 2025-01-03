export const menuConfig = [
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
            "title": "STRLEN"
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
            "id": "06_zrange",
            "title": "ZRANGE"
          },
          {
            "id": "07_zrevrange",
            "title": "ZREVRANGE"
          },
          {
            "id": "08_zrangebyscore",
            "title": "ZRANGEBYSCORE"
          },
          {
            "id": "09_zrevrangebyscore",
            "title": "ZREVRANGEBYSCORE"
          },
          {
            "id": "10_zrank",
            "title": "ZRANK"
          },
          {
            "id": "11_zrevzrank",
            "title": "ZREVRANK"
          },
          {
            "id": "12_zrem",
            "title": "ZREM"
          },
          {
            "id": "13_zremrangebyrank",
            "title": "ZREMRANGEBYRANK"
          },
          {
            "id": "14_zremrangebyscore",
            "title": "ZREMRANGEBYSCORE"
          },
          {
            "id": "15_zrangebylex",
            "title": "ZRANGEBYLEX"
          },
          {
            "id": "16_zlexcount",
            "title": "ZLEXCOUNT"
          },
          {
            "id": "17_zremrangebylex",
            "title": "ZREMRANGEBYLEX"
          },
          {
            "id": "18_zscan",
            "title": "ZSCAN"
          },
          {
            "id": "19_zunionstore",
            "title": "ZUNIONSTORE"
          },
          {
            "id": "20_zinterstore",
            "title": "ZINTERSTORE"
          }
        ]
      },
      {
        "id": "06_hyperloglog",
        "title": "HyperLogLog",
        "children": [
          {
            "id": "01_pfadd",
            "title": "PFADD"
          },
          {
            "id": "02_pfcount",
            "title": "PFCOUNT"
          },
          {
            "id": "03_pfmerge",
            "title": "PFMERGE"
          }
        ]
      },
      {
        "id": "07_geo",
        "title": "地理位置",
        "children": [
          {
            "id": "01_geoadd",
            "title": "GEOADD"
          },
          {
            "id": "02_geopos",
            "title": "GEOPOS"
          },
          {
            "id": "03_geodist",
            "title": "GEODIST"
          },
          {
            "id": "04_georadius",
            "title": "GEORADIUS"
          },
          {
            "id": "05_georadiusbymember",
            "title": "GEORADIUSBYMEMBER"
          },
          {
            "id": "06_geohash",
            "title": "GEOHASH"
          }
        ]
      },
      {
        "id": "08_bitmap",
        "title": "位图",
        "children": [
          {
            "id": "01_setbit",
            "title": "SETBIT"
          },
          {
            "id": "02_getbit",
            "title": "GETBIT"
          },
          {
            "id": "03_bitcount",
            "title": "BITCOUNT"
          },
          {
            "id": "04_bitpos",
            "title": "BITPOS"
          },
          {
            "id": "05_bitop",
            "title": "BITOP"
          },
          {
            "id": "06_bitfield",
            "title": "BITFIELD"
          }
        ]
      },
      {
        "id": "09_database",
        "title": "数据库",
        "children": [
          {
            "id": "01_exists",
            "title": "EXISTS"
          },
          {
            "id": "02_type",
            "title": "TYPE"
          },
          {
            "id": "03_rename",
            "title": "RENAME"
          },
          {
            "id": "04_renamenx",
            "title": "RENAMENX"
          },
          {
            "id": "05_move",
            "title": "MOVE"
          },
          {
            "id": "06_del",
            "title": "DEL"
          },
          {
            "id": "07_randomkey",
            "title": "RANDOMKEY"
          },
          {
            "id": "08_dbsize",
            "title": "DBSIZE"
          },
          {
            "id": "09_keys",
            "title": "KEYS"
          },
          {
            "id": "10_scan",
            "title": "SCAN"
          },
          {
            "id": "11_sort",
            "title": "SORT"
          },
          {
            "id": "12_flushdb",
            "title": "FLUSHDB"
          },
          {
            "id": "13_flushall",
            "title": "FLUSHALL"
          },
          {
            "id": "14_select",
            "title": "SELECT"
          },
          {
            "id": "14_swapdb",
            "title": "SWAPDB"
          }
        ]
      },
      {
        "id": "10_expire",
        "title": "自动过期",
        "children": [
          {
            "id": "01_expire",
            "title": "EXPIRE"
          },
          {
            "id": "02_expireat",
            "title": "EXPIREAT"
          },
          {
            "id": "03_ttl",
            "title": "TTL"
          },
          {
            "id": "04_persist",
            "title": "PERSIST"
          },
          {
            "id": "05_pexpire",
            "title": "PEXPIRE"
          },
          {
            "id": "06_pexpireat",
            "title": "PEXPIREAT"
          },
          {
            "id": "07_pttl",
            "title": "PTTL"
          }
        ]
      },
      {
        "id": "11_transation",
        "title": "事务",
        "children": [
          {
            "id": "01_multi",
            "title": "MULTI"
          },
          {
            "id": "02_exec",
            "title": "EXEC"
          },
          {
            "id": "03_discard",
            "title": "DISCARD"
          },
          {
            "id": "04_watch",
            "title": "WATCH"
          },
          {
            "id": "05_unwatch",
            "title": "UNWATCH"
          }
        ]
      },
      {
        "id": "12_lua",
        "title": "Lua脚本",
        "children": [
          {
            "id": "01_eval",
            "title": "EVAL"
          },
          {
            "id": "02_evalsha",
            "title": "EVAL"
          },
          {
            "id": "03_script_load",
            "title": "SCRIPT LOAD"
          },
          {
            "id": "04_script_exists",
            "title": "SCRIPT EXISTS"
          },
          {
            "id": "05_script_flush",
            "title": "SCRIPT FLUSH"
          },
          {
            "id": "06_script_kill",
            "title": "SCRIPT KILL"
          }
        ]
      },
      {
        "id": "13_persistence",
        "title": "持久化",
        "children": [
          {
            "id": "01_save",
            "title": "SAVE"
          },
          {
            "id": "02_bgsave",
            "title": "BGSAVE"
          },
          {
            "id": "03_bgrewriteaof",
            "title": "BGREWRITEAOF"
          },
          {
            "id": "04_lastsave",
            "title": "LASTSAVE"
          }
        ]
      },
      {
        "id": "14_pubsub",
        "title": "发布与订阅",
        "children": [
          {
            "id": "01_publish",
            "title": "PUBLISH"
          },
          {
            "id": "02_subscribe",
            "title": "SUBSCRIBE"
          },
          {
            "id": "03_psubscribe",
            "title": "PSUBSCRIBE"
          },
          {
            "id": "04_unsubscribe",
            "title": "UNSUBSCRIBE"
          },
          {
            "id": "05_punsubscribe",
            "title": "PUNSUBSCRIBE"
          },
          {
            "id": "06_pubsub",
            "title": "PUBSUB"
          }
        ]
      },
      {
        "id": "15_replication",
        "title": "复制",
        "children": [
          {
            "id": "01_slaveof",
            "title": "SLAVEOF"
          },
          {
            "id": "02_role",
            "title": "ROLE"
          }
        ]
      },
      {
        "id": "16_client_and_server",
        "title": "客户端与服务器",
        "children": [
          {
            "id": "01_auth",
            "title": "AUTH"
          },
          {
            "id": "02_quit",
            "title": "QUIT"
          },
          {
            "id": "03_info",
            "title": "INFO"
          },
          {
            "id": "04_shutdown",
            "title": "SHUTDOWN"
          },
          {
            "id": "05_time",
            "title": "TIME"
          },
          {
            "id": "06_client_getname",
            "title": "CLIENT GETNAME"
          },
          {
            "id": "07_client_kill",
            "title": "CLIENT KILL"
          },
          {
            "id": "08_client_list",
            "title": "CLIENT LIST"
          },
          {
            "id": "09_client_setname",
            "title": "CLIENT SETNAME"
          }
        ]
      },
      {
        "id": "17_configure",
        "title": "配置选项",
        "children": [
          {
            "id": "01_config_set",
            "title": "CONFIG SET"
          },
          {
            "id": "02_config_get",
            "title": "CONFIG GET"
          },
          {
            "id": "03_config_resetstat",
            "title": "CONFIG RESETSTAT"
          },
          {
            "id": "04_config_rewrite",
            "title": "CONFIG REWRITE"
          }
        ]
      },
      {
        "id": "18_debug",
        "title": "调试",
        "children": [
          {
            "id": "01_ping",
            "title": "PING"
          },
          {
            "id": "02_echo",
            "title": "ECHO"
          },
          {
            "id": "03_object",
            "title": "OBJECT"
          },
          {
            "id": "04_slowlog",
            "title": "SLOWLOG"
          },
          {
            "id": "05_monitor",
            "title": "MONITOR"
          },
          {
            "id": "06_debug_object",
            "title": "DEBUG OBJECT"
          },
          {
            "id": "07_debug_segfault",
            "title": "DEBUG SEGFAULT"
          }
        ]
      },
      {
        "id": "19_internal",
        "title": "内部命令",
        "children": [
          {
            "id": "01_migrate",
            "title": "MIGRATE"
          },
          {
            "id": "02_dump",
            "title": "DUMP"
          },
          {
            "id": "03_restore",
            "title": "RESTORE"
          },
          {
            "id": "04_sync",
            "title": "SYNC"
          },
          {
            "id": "05_psync",
            "title": "PSYNC"
          }
        ]
      },
      {
        "id": "20_topic",
        "title": "功能文档",
        "children": [
          {
            "id": "01_cluster_intro",
            "title": "Redis 集群规范"
          },
          {
            "id": "02_persistence",
            "title": "持久化"
          },
          {
            "id": "03_pubsub",
            "title": "发布与订阅"
          },
          {
            "id": "04_sentinel",
            "title": "Sentinel"
          },
          {
            "id": "05_cluster_manal",
            "title": "集群教程"
          },
          {
            "id": "06_keyspace",
            "title": "键空间通知"
          },
          {
            "id": "07_protocol",
            "title": "通信协议"
          },
          {
            "id": "08_replication",
            "title": "复制"
          },
          {
            "id": "09_trasation",
            "title": "事务"
          }
        ]
      }
    ]
  }
]