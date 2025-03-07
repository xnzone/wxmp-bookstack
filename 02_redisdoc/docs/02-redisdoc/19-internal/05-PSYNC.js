module.exports = `

# PSYNC master_run_id offset

> 可用版本： >= 2.8.0
> 
> 时间复杂度： 不明确

用于复制功能(replication)的内部命令。

更多信息请参考 [复制（Replication）](../topic/replication.html#replication-topic) 文档。

## 返回值

序列化数据。

## 代码示例

\`\`\`bash
127.0.0.1:6379> PSYNC ? -1
"REDIS0006\xfe\x00\x00\x02kk\x02vv\x00\x03msg\x05hello\xff\xc3\x96P\x12h\bK\xef"
\`\`\``;