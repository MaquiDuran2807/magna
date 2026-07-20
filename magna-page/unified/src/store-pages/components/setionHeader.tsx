import HeadingDivider from "./HeadingDivider"
import './styles/setionHeader.css'

interface SetionHeaderProps {
    title: string;
    prefix?: string;
}

export const SetionHeader = (
    { title, prefix }: SetionHeaderProps
) => {

    return (
        <div className="row ">
            <div className="col-12 text-center  ">
                <h2 className='title-servicios'>
                    {prefix && <span>{prefix}</span>} {title}
                </h2>
                <HeadingDivider />
            </div>
        </div>
    )
}
