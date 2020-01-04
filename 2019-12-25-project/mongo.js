var createCollection = function (db) {
    var dbase = db.db("node_db");
    dbase.createCollection('user', function (err, res) {
        if (err) throw err;
        console.log("创建集合!");
        //db.close();
    });
}
var insertOne = function (db) {
    console.log(db)
    var dbo = db.db("node_db");
    var myobj = { user: "chenli", pw: "123" };
    dbo.collection("user").insertOne(myobj, function (err, res) {
        if (err) throw err;
        console.log("文档插入成功");
        //db.close();
    });
}

var insertMany = function (db) {
    var dbo = db.db("node_db");
    var myobj = [
        { name: '菜鸟工具', url: 'https://c.runoob.com', type: 'cn' },
        { name: 'Google', url: 'https://www.google.com', type: 'en' },
        { name: 'Facebook', url: 'https://www.google.com', type: 'en' }
    ];
    dbo.collection("user").insertMany(myobj, function (err, res) {
        if (err) throw err;
        console.log("插入的文档数量为: " + res.insertedCount);
        //db.close();
    });
}
var find = function (db) {
    var dbo = db.db("node_db");
    dbo.collection("user").find({}).toArray(function (err, result) { // 返回集合中所有数据
        if (err) throw err;
        console.log(result);
        //db.close();
    });
}


var updateOne = function (db) {
    var dbo = db.db("node_db");
    var whereStr = { "name": '菜鸟教程' };  // 查询条件
    var updateStr = { $set: { "url": "https://www.runoob.com" } };
    dbo.collection("user").updateOne(whereStr, updateStr, function (err, res) {
        if (err) throw err;
        console.log("文档更新成功");
        //db.close();
    });
}
var updateMany = function (db) {
    var dbo = db.db("node_db");
    var whereStr = { "type": 'en' };  // 查询条件
    var updateStr = { $set: { "url": "https://www.runoob.com" } };
    dbo.collection("user").updateMany(whereStr, updateStr, function (err, res) {
        if (err) throw err;
        console.log(res.result.nModified + " 条文档被更新");
        //db.close();
    });
}

var deleteOne = function (db) {
    var dbo = db.db("node_db");
    var whereStr = { "name": '菜鸟教程' };  // 查询条件
    dbo.collection("user").deleteOne(whereStr, function (err, obj) {
        if (err) throw err;
        console.log("文档删除成功");
        //db.close();
    });
}

var deleteMany = function (db) {
    var dbo = db.db("node_db");
    var whereStr = { type: "en" };  // 查询条件
    dbo.collection("user").deleteMany(whereStr, function (err, obj) {
        if (err) throw err;
        console.log(obj.result.n + " 条文档被删除");
       // db.close();
    });
}

var mongoDb = function () {
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/local";

    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        console.log("数据库已创建!");

        // createCollection(db);
       // console.log(db);
        //console.log(globle)
        return db;
    })
};

module.exports = {
    mongoDb,
    insertOne,
    deleteMany,
    deleteOne,
    updateOne,
    updateMany,
    find,
    insertMany
}