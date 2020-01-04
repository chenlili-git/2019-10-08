/** * 用户信息 */  //https://www.jianshu.com/p/4a16b315ae0a
var mongoose = require('./db.js'),
    Schema = mongoose.Schema;
var UserSchema = new Schema({
    username: { type: String }, //用户账号 
    userpwd: { type: String }, //密码 
    logindate: { type: Date } //最近登录时间 
});
module.exports = mongoose.model('User', UserSchema);// 用户存到数据库User表中  

// 1.数据库：新建一个服务器接口  27018  2.在项目中建个db文件夹  3.mongoDb中启动mongoDb   =>   run.bat 这个中的内容是当前项目路径下db文件夹start bin/mongod.exe --dbpath=D:\zhufengstudy\chenlistudy\2019-10-08\2019-12-24\db --port=27018   => 这样项目中的db文件夹就会有数据库的相关文件    然后启动自己的项目就可以了   