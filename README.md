# 飞书退群 CLI

## 依赖

1. 你有一个飞书开放平台应用，并且有 im:chat 权限
2. 安装了 [Bun CLI](https://bun.sh/docs/cli/install)

## 用法

1. 访问[飞书开放平台调试台](https://open.feishu.cn/api-explorer)，点击左侧「查看鉴权凭证」中的「User Access Token」的获取按钮，获取 Token 。![](https://postimg.aliavv.com/m1/5xjw2w.png)获取完成后，粘贴到编辑器中备用。


2. 在左侧 API 列表中，找到【发送消息】，点击进入 API 调试页面，将右侧页面切换至查询参数，并选择 receive_id_type 为 open_id， 点击上面的【选择成员】，选择你自己，会自动把你的 OpenID 复制到剪贴板里，粘贴到编辑器中备用。

3. clone 项目并 安装依赖

```bash
git clone https://github.com/bestony/quit-feishu-group.git
cd quit-feishu-group
bun install
```

4. 运行

```bash
bun run start
```

在弹出的 UI 里，输入你的 UAT 和 OpenID，会自动展示你当前所在的群（每次最多展示 100 个群）

使用，空格选择你要退出的群（支持多选），选择完成后点击回车，然后就会自动退出。

退出完成后，会自动进行下一批群的展示，直到完成所有群的处理和确认，就会自动退出

## LICENSE 
MIT
