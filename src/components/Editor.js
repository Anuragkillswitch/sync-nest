
import React, { useEffect } from "react"
import Codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript';
import 'codemirror/theme/yonce.css';
import 'codemirror/addon/edit/closetag'
import 'codemirror/addon/edit/closebrackets'
 const Editor=()=>{
     useEffect(()=>{
       async function init(){
         Codemirror.fromTextArea(document.getElementById('realtimeEditor'),
         {
             
            mode:{name:'javascript',json:true},
             theme:'yonce',
             autoCloseTags:true,
             autoCloseBrackets:true,
             lineNumbers:true,
             indentUnit:5,
             indentWithTabs:true,
      
         },);
       }   
       init();
     },[]);


    return <textarea className="editor" id="realtimeEditor"></textarea>;
    
}

export default Editor;