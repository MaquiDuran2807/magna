import HeadingDivider from "./headingDivider"

interface SetionHeaderProps {
    title: string;
}

export const SetionHeader = (
    { title}: SetionHeaderProps
) => {
    
    return (
        <>
        <div className="row ">
            <div className="col-12 text-center  ">
                <h2 className='title-servicios'>
                    <span>Nuestros</span> {title}
                </h2>
                <HeadingDivider/>
            </div>
        </div>
        </>
    )
}