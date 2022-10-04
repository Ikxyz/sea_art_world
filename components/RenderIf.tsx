
interface IPram {
    children: any;
    isTrue: boolean;
    elseShow?: any;
}

export default function RenderIf({ isTrue, children, elseShow }: IPram) {

    return <>
        {isTrue ? children : elseShow}
    </>;
}
