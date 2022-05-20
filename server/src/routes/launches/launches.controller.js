const {
  launches: { getAll, addNew, abort },
} = require("../../models");

function httpGetAll(_, res) {
  return res.status(200).json(getAll());
}

function httpAddNew({ body: launch }, res) {
  try {
    return res.status(201).json(addNew(launch));
  } catch ({ message: error }) {
    return res.status(400).json({ error });
  }
}

function httpAbort({ params: { id } }, res) {
  try {
    return res.status(200).json(abort(+id));
  } catch ({ message: error }) {
    return res.status(404).json({ error });
  }
}

module.exports = {
  httpGetAll,
  httpAddNew,
  httpAbort,
};
