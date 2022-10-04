import { HTMLAttributes, HTMLInputTypeAttribute } from "react"


interface IPrama {
    type?: HTMLInputTypeAttribute,
    id?: string,
    placeHolder?: string,
    name: string,
    bgColor?: string,
    textColor?: string,
    borderColor?: string,
    className?: HTMLAttributes<HTMLElement>['className'],
    containerClassName?: HTMLAttributes<HTMLElement>['className'],
    prefix?: any,
    suffix?: any,
    required?: boolean,
    value?: any,
    onChange?: HTMLAttributes<HTMLInputElement>['onChange'],
}

function Input({ suffix, prefix, onChange, bgColor = "bg-grey-50", required, value, textColor = "text-black", borderColor = "border-grey-200", className, ...prams }: IPrama) {
    return (
        <div className={`flex rounded-2xl  ${prefix ? 'pl-3' : 'pl-6'}  ${suffix ? 'pr-3' : 'pr-6'} py-4   ${bgColor} ${prams.containerClassName}`}>
            {prefix ? <span className="flex items-center px-1 m-0 text-sm text-grey-300">  {prefix} </span> : null}
            <input
                type={prams.type ?? 'text'}
                id={prams.id ?? ''}
                name={prams.name}
                value={value}
                className={`flex-1 block p-2 py-0 m-0 rounded-none  ${textColor} ` + className ?? ""}
                placeholder={prams.placeHolder}
                required={required ?? false}
                onChange={onChange}
            />

            {suffix ? <span className={`flex items-center px-2   m-0 text-sm border-l-2 text-grey-300  ${borderColor}`}> {suffix}</span> : null}
        </div>
    )
}

export default Input