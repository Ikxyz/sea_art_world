

const points = new Array(100).fill('').map((e, i) => '.w-' + (i + 1));


const marginsPoints: Array<string> = []
points.forEach((e, i) => {

    const val = i + 1;

    marginsPoints.push(`.mt-${val}{
    margin-top: ${val}px;
}`)
    marginsPoints.push(`.mb-${val}{
    margin-bottom: ${val}px;
}`)
    marginsPoints.push(`.ml-${val}{
    margin-left: ${val}px;
}`)
    marginsPoints.push(`.mr-${val}{
    margin-right: ${val}px;
}`)
    marginsPoints.push(`.m-${val}{
    margin: ${val}px;
}`)
})

const Margins = marginsPoints.join(' ')


export default Margins;


