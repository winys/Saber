import Saber from "./util";
import plugin from "../plugins/plugin.json";

Saber.plugins = Saber._dictSort(plugin);

module.exports =  Saber;