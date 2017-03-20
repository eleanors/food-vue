# 配置用户名
git config --global user.name "username"
# 配置邮箱
git config --global user.email "username@email.com"
# 生成 ssh，输完后连敲三个回车即可
ssh-keygen -t rsa
在 settings 页面的 SSH and GPG keys 栏中添加，Title 可以自定义，Key 的内容即为之前生成的 id_rsa.pub 文件内容（复制进来即可）
