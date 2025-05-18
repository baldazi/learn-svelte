import type { Action } from "svelte/action"

interface ParamsType {
    width:number;
    height: number;
    x: number;
    y: number;
    isShow: boolean
}

const ctxMenuAction: Action<HTMLElement, ParamsType> = (node, params) =>{
    $effect(()=>{

        document.onmousedown = () => {
            params.isShow = false
        }

        node.oncontextmenu = (e) => {
            e.preventDefault()
            console.log({xx:e.clientX, ll: node.offsetLeft, yy:e.clientY, tt: node.offsetTop});
            const rect = node.getBoundingClientRect();
            
            Object.assign(params, {x: e.clientX - rect.left, y: e.clientY-rect.top})

            if (node.offsetHeight -  params.y < params.height)
                params.y = params.y - params.height
            if (node.offsetWidth -  params.x < params.width)
                params.x = params.x - params.width
            
            params.isShow = true
        }
    })
}

export default ctxMenuAction