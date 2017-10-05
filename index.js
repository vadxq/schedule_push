'use strict'
const schedule = require('node-schedule'),
  nodemailer = require('nodemailer'),
  fs = require('fs'),
  config = require('./config'),
  auth = require('./auth')

// logs
const logger = (msg, info) => {
  let time = (new Date).toLocaleString()
  let stackInfoStr = stackInfo()
  msg = info + ' ' + time + ` ${stackInfoStr.file}:${stackInfoStr.line} ` + msg + '\n'
  fs.writeFile('./logs.log', msg, { 'flag': 'a' }, (err) => {
    if (err) {
      throw err
    }
    console.log('Saved.')
  })
}

const scheduleTask = (time, data) => {
  schedule.scheduleJob(time, () => {
    console.log(data)
    logger(time, 'WARN')
    logger(data, 'data')
    mails(data)
  })
}

for (const {time, course, courseTime, addr} of config.classes) {
  console.log(time)
  scheduleTask(time, {courseTime: courseTime, course: course, addr: addr})
}

//邮件服务
const mails = (data) => {
  nodemailer.createTestAccount((err, account) => {
    let transporter = nodemailer.createTransport({
      host: auth.port.host,
      port: auth.port.port,
      secure: auth.port.secure,
      auth: auth.auth
    })

    let mailOptions = {
      from: auth.mymail, 
      to: auth.tomail, 
      subject: config.detailMail.subject,
      text: config.detailMail.text,
      html: config.detailMail.htmlName + data.courseTime + '的' + data.course + '课即将在' + data.addr + '开始，准备一下啦，别迟到了哟～<br/><br/>' + config.detailMail.htmlLeftname
    }
    
    if (data.courseTime === config.anotherMail.keyword) {
      mailOptions.subject = config.anotherMail.subject
      mailOptions.text = config.anotherMail.text,
      mailOptions.html = config.anotherMail.html
    }
    
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return logger(error, 'error')
      }
      console.log('Message sent: %s', info.messageId)
      logger('Message sent: %s' + info.messageId, 'success')
    })
  })
}

/**
* 追踪日志输出文件名,方法名,行号等信息
* @returns Object
*/
const stackInfo = () => {
  let path = require('path')
  let stackReg = /at\s+(.*)\s+\((.*):(\d*):(\d*)\)/i
  let stackReg2 = /at\s+()(.*):(\d*):(\d*)/i
  let stacklist = (new Error()).stack.split('\n').slice(3)
  let s = stacklist[0]
  let sp = stackReg.exec(s) || stackReg2.exec(s)
  let data = {}
  if (sp && sp.length === 5) {
    data.method = sp[1]
    data.path = sp[2]
    data.line = sp[3]
    data.pos = sp[4]
    data.file = path.basename(data.path)
  }
  return data
}