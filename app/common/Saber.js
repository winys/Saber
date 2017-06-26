import Saber from "./util";
import plugin from "../../plugins/plugin.json";
import Github from './github';
import ToolManager from './ToolManager';

require("./html-api.js");

const path = require('path');

Saber.plugins = Object.freeze(Saber._dictSort(plugin));

Saber.toolManager = new ToolManager();

Saber.Github = new Github();

export default Saber;