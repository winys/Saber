import Saber from "./util";
import plugin from "../../plugins/plugin.json";

require("./html-api.js");

const path = require('path');

Saber.plugins = Object.freeze(Saber._dictSort(plugin));

export default Saber;