import Config from "./config"
import Util from "./util"
import plugin from "../plugin/plugin.json"
/* target,sources */
let Saber = Object.assign( Config , Util );
Saber.plugins = plugin;

export default Saber;