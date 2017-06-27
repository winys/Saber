import Saber from "./util";
import plugin from "../../plugins/plugin.json";
import ToolManager from './ToolManager';

require("./html-api.js");

const path = require('path');

Saber.plugins = Object.freeze(Saber._dictSort(plugin));

Saber.toolManager = new ToolManager();

export default Saber;