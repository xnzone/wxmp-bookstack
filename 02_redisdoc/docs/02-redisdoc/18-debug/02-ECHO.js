module.exports = `

# ECHO message

> 可用版本： >= 1.0.0
> 
> 时间复杂度： O(1)

打印一个特定的信息 \`message\` ，测试时使用。

## 返回值

\`message\` 自身。

## 代码示例

\`\`\`bash
redis> ECHO "Hello Moto"
"Hello Moto"

redis> ECHO "Goodbye Moto"
"Goodbye Moto"
\`\`\``;