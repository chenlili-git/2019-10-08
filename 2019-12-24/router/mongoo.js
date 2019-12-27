const User = require('../schemas/user.js');
/** * 插入 */
let insert = function (obj) {
    // var user = new User({
    //     username: 'chenli', //用户账号 
    //     userpwd: '12345', //密码
    //     logindate: new Date() //最近登录时间 
    // });
    var user = new User(obj);
    user.save(function (err, res) {
        if (err) {
            console.log("Error:" + err);
        } else {
            console.log("Res:" + res);
        }
    });
}
//删除数据
let del = function (obj) {
    var wherestr = { 'username': 'Tracy McGrady' }; User.remove(wherestr, function (err, res) {
        if (err) {
            console.log("Error:" + err);
        } else {
            console.log("Res:" + res);
        }
    })
}
//条件查询
let getByConditions =  function (obj,callback) {
    var wherestr = obj;
    User.find(wherestr,  function (err, res) {
        if (err) {
            console.log("Error:" + err);
        } else {
            //console.log(res);
            //console.log("Res:" + Object.keys(res).length);
        }
    }).then(d=>{
        callback(d);
    })
}


module.exports = {
    insert,
    del,
    getByConditions
}
