/**
 * 此处用于定义 HTML 一些接口，以方便使用。
 */
if( document && window ) {

    let _hapi = {

        "click" : [
            
            /**
             * saber-herf
             * 点击具有saber
             */
            {
                trigger : "saber-href",
                run ( event ){
                    let url = event.target.getAttribute(this.trigger);
                    Saber.goToLink(url.toString().trim());
                }
            }
        ]

    }

    window.onload = function (){
        for( var key in _hapi){
            for(let api_item of _hapi[key]){
                document.querySelectorAll("["+ api_item.trigger + "]").forEach(item=>{
                    item.addEventListener(key, event => {
                        api_item.run( event );
                    });
                });
            }
        }
    }
}