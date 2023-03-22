import React, { useRef, useState } from "react";

export const ReviewItem: React.FC<Props> = ({ text, image, author, position, onClick }) => {

    const [fallBackImg, setFallBackImg] = useState(false);

    const ref : any = useRef();

    return (

        <div

            className="review-item"

            onClick={() => onClick()}

        >

            <p> {text} </p>

            <div className="review-item-flex">

                <img

                    ref={ref}

                    src={ fallBackImg ? "icons/placeholder-image.jpg" : image }

                    alt={"review-item"}

                    onLoad={() => ref?.current?.classList?.add("no-bg")}

                    onErrorCapture={()=> setFallBackImg(true)}

                />

                <div className="review-item-flex-texts">

                    <h2> {author} </h2>

                    <small> {position} </small>

                </div>

            </div>

        </div>

    );

}

interface Props {

    text: string,

    image: string,

    author: string,

    position: string,

    onClick(): void

}
