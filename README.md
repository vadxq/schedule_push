# schedule_push
schedule push  to let you can khow your classes.

## how to run 

1. 配置运行环境，本项目需要node v6.10.0+版本。
2. 进入目录，安装依赖
```
cd schedule push
npm i
```
3. 配置邮件账户，根目录创建auth.js文件，复制以下内容到auth.js，修改你的配置。
```
exports.auth = {
  user: 'dongxianlin@vadxq.com',
  pass: '*********' // 授权码，不是密码
}

exports.port = {
  port: 465,
  secure: true, // true for 465, false for other ports
  host: 'smtp.qq.com' //mail host
}

exports.mymail = '"vadxq" <dongxianlin@vadxq.com>' // 发件用户名和邮箱
exports.tomail = 'dongxianlin@vadxq.com' // 接收邮件列表，多邮箱逗号隔开

```
4. 配置config.js，修改你需要定时提醒的服务
```
exports.detailMail = {
  subject: '某某呀，某某呀',
  text: '某某呀，快上课了哟～',
  htmlName: '<b>某某呀，快上课了哟～</b><br/><br/>',
  htmlLeftname: '---专为你定制的课表邮件提醒<br/>---来自你帅气的显林叔'
}

exports.anotherMail = {
  keyword: 'wanan',
  subject: '某某呀，某某呀',
  text: '某某呀,晚安',
  html: '<b>某某呀，快去睡哟～</b><br/>啦啦啦！<br/><br/>---专为你定制的晚安提醒<br/>---来自你帅气的显林叔'
}

exports.classes = [{
  // 1
  time: '10 30 07 * * 1',
  course: '人体解剖学1',
  courseTime: '07:50-12:10',
  addr: '人体解剖实验室'
},{
  // 2
  time: '10 30 13 * * 1',
  course: '应用软件类实验',
  courseTime: '13:50-15:25',
  addr: '机房'
},
```
其中有两种提醒，一种为课表提醒（detailMail）：从上往下以此为：邮件主题，邮件标题，邮件正文的称呼名字，邮件正文结尾尾缀（可为空）。

另一种为其他提醒，比如我这里是晚安提醒，keyword为识别字符，其他如上。

下面classes为课表内容。time为定时时间。
```
*    *    *    *    *    *
┬    ┬    ┬    ┬    ┬    ┬
│    │    │    │    │    |
│    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
│    │    │    │    └───── month (1 - 12)
│    │    │    └────────── day of month (1 - 31)
│    │    └─────────────── hour (0 - 23)
│    └──────────────────── minute (0 - 59)
└───────────────────────── second (0 - 59, OPTIONAL)
```
比如：``` 10 30 07 * * 1 ```表示在周一7：30：10时间发送。``` 10 30 07 * * * ```表示在每天7：30：10时间发送。

course：课名，courseTime：上课时间，addr：上课地点。

5. 配置无误后，本地运行``` npm start ```

服务器部署``` pm2 start index.js ```

#### 欢迎大家提出建议和意见，谢谢～

#### license：Apache Licens Version 2.0