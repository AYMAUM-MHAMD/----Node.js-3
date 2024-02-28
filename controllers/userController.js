const AuthUser = require("../models/authUser");
var moment = require("moment");
var jwt = require("jsonwebtoken");

// 1- get nested objects inside an array
// 2- add nested object inside an array
// 3- delete nested object inside an array

// 4- update nested object inside an array

// /home
// done
const user_index_get = (req, res) => {
  var decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET_KEY);

  AuthUser.findOne({ _id: decoded.id })
    .then((result) => {
      res.render("index", { arr: result.customerInfo, moment: moment });
    })

    .catch((arr) => {
      console.log(arr);
    });
};

const user_post = (req, res) => {
  var decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET_KEY);

  AuthUser.updateOne({ _id: decoded.id }, { $push: { customerInfo: req.body } })
    .then(() => {
      res.redirect("/home");
    })
    .catch((arr) => {
      console.log(arr);
    });
};

const user_delete = (req, res) => {
  AuthUser.updateOne(
    { "customerInfo._id": req.params.id },
    { $pull: { customerInfo: { _id: req.params.id } } }
  )
    .then(() => {
      res.redirect("/home");
    })
    .catch((arr) => {
      console.log(arr);
    });
};

//  view/:id
const user_view_get = (req, res) => {
  AuthUser.findOne({ "customerInfo._id": req.params.id })
    .then((result) => {
      const clickedObject = result.customerInfo.find((item) => {
        return item._id == req.params.id;
      });
      res.render("user/view", { obj: clickedObject, moment: moment });
    })

    .catch((arr) => {
      console.log(arr);
    });
};

const user_edit_get = (req, res) => {
  AuthUser.findOne({ "customerInfo._id": req.params.id })
    .then((result) => {
      const clickedObject = result.customerInfo.find((item) => {
        return item._id == req.params.id;
      });
      res.render("user/edit", { obj: clickedObject, moment: moment });
    })

    .catch((arr) => {
      console.log(arr);
    });
};

const user_put = (req, res) => {
  AuthUser.updateOne(
    { "customerInfo._id": req.params.id },
    { "customerInfo.$": req.body }
    // { "customerInfo.$.age": req.body.age }
  )
    .then((result) => {
      console.log(result);
      res.redirect("/home");
    })
    .catch((err) => {
      console.log(err);
    });
};

const user_search_post = (req, res) => {
  const SearchText = req.body.searchText.trim();
  var decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET_KEY);

  AuthUser.findOne({ _id: decoded.id })
    .then((result) => {
      console.log(result);

      const searchCustomers = result.customerInfo.filter((item) => {
        return item.fireName.includes(SearchText) || item.lastName.includes(SearchText)
      }
      )
      res.render("user/search", { arr: searchCustomers, moment: moment });
    })
    .catch((arr) => {
      console.log(arr);
    });
};

const user_add_get = (req, res) => {
  res.render("user/add");
};

module.exports = {
  user_index_get,
  user_edit_get,
  user_view_get,
  user_search_post,
  user_delete,
  user_put,
  user_add_get,
  user_post,
};
