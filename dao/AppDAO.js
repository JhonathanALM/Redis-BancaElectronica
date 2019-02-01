var redis = require('../libraries/Redis');

var AppDAO = {

    add_user: function (data, callback) {
        var usuario = data.usuario;
        var extract = {
            usuario: usuario,
            ci: data.ci,
            clave: data.clave
        };

        redis.add_set({ key: { "usuario": usuario }, data: extract }, function (resp) {
            if (resp) {
                return callback({ err: false, response: "Data was added successfully " }, 200);
            } else {
                return callback({ err: true, response: "User was not added successfully " }, 400);
            }
        })
    },

    get_user: function (data, callback) {
        redis.get_set({ "usuario": data.usuario }, null, function (resp) {
            if (resp) {
                //return callback({err: false, response: "User found successfully", data: resp}, 200);
                return callback(resp, 200);
            } else {
                return callback({ err: true, response: "User was not found", data: null }, 404);
            }
        })

    },
   

};

module.exports = AppDAO;