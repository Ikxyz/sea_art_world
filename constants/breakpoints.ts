import Devices from "./layout";

const points = new Array(12).fill('').map((e, i) => '.w-' + (i + 1));

const DesktopBreakpoint = points.map((point, i) => `${point}{width:${((i + 1) * 8.33).toFixed(2)}%}`).join(' ');

const MobileBreakpoint = points.map((point) => `${point}{width:100%}`).join(' ');

const Breakpoint = `

${MobileBreakpoint}

@media ${Devices.laptop}{
    ${DesktopBreakpoint}
}

`

export default Breakpoint;


