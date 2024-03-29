const User = require("../models/authUser");
var moment = require("moment");

// /home
const user_index_get = (req, res) => {
  User.find()
    .then((result) => {
      res.render("index", { arr: result, moment: moment });
    })

    .catch((arr) => {
      console.log(arr);
    });
};

const user_edit_get = (req, res) => {
  User.findById(req.params.id)
    .then((result) => {
      res.render("user/edit", { obj: result, moment: moment });
    })

    .catch((arr) => {
      console.log(arr);
    });
};

const user_view_get = (req, res) => {
  User.findById(req.params.id)
    .then((result) => {
      res.render("user/view", { obj: result, moment: moment });
    })

    .catch((arr) => {
      console.log(arr);
    });
};

const user_search_post = (req, res) => {
  const SearchText = req.body.searchText.trim();

  User.find({ $or: [{ fireName: SearchText }, { lastName: SearchText }] })
    .then((result) => {
      console.log(result);
      res.render("user/search", { arr: result, moment: moment });
    })
    .catch((arr) => {
      console.log(arr);
    });
};

const user_delete = (req, res) => {
  User.deleteOne({ _id: req.params.id })
    .then(() => {
      res.redirect("/home");
    })
    .catch((arr) => {
      console.log(arr);
    });
};

const user_put = (req, res) => {
  User.updateOne({ _id: req.params.id }, req.body)
    .then((result) => {
      console.log(result);
      res.redirect("/home");
    })
    .catch((err) => {
      console.log(err);
    });
};

const user_add_get = (req, res) => {
  res.render("user/add");
};

const user_post = (req, res) => {
  User.create(req.body)
    .then(() => {
      res.redirect("/home");
    })
    .catch((arr) => {
      console.log(arr);
    });
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
