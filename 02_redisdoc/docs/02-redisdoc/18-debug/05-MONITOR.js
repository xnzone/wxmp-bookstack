module.exports = `

# MONITOR

> 可用版本： >= 1.0.0
> 
> 时间复杂度： O(N)

实时打印出 Redis 服务器接收到的命令，调试用。

## 返回值

总是返回 \`OK\` 。

## 代码示例

\`\`\`bash
127.0.0.1:6379> MONITOR
OK
# 以第一个打印值为例
# 1378822099.421623 是时间戳
# [0 127.0.0.1:56604] 中的 0 是数据库号码， 127... 是 IP 地址和端口
# "PING" 是被执行的命令
1378822099.421623 [0 127.0.0.1:56604] "PING"
1378822105.089572 [0 127.0.0.1:56604] "SET" "msg" "hello world"
1378822109.036925 [0 127.0.0.1:56604] "SET" "number" "123"
1378822140.649496 [0 127.0.0.1:56604] "SADD" "fruits" "Apple" "Banana" "Cherry"
1378822154.117160 [0 127.0.0.1:56604] "EXPIRE" "msg" "10086"
1378822257.329412 [0 127.0.0.1:56604] "KEYS" "*"
1378822258.690131 [0 127.0.0.1:56604] "DBSIZE"
\`\`\``;