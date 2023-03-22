import React from "react"

export const BlogItem: React.FC<Props> = ({ image, date, text, author }) => {

    return (

        <div className="blog-item">

            <img 
                
                className="blog-item-image" 
                
                src={image} 
                
                alt={"blog-item"} 
                
            />

            <div className="blog-item-texts">

                <div className="blog-item-texts-meta">

                    <p> Category </p>

                    <p> {date} </p>

                </div>

                <div className="blog-item-texts-short">

                    <p> {text} </p>

                </div>

                <div className="blog-item-texts-author">

                    <img src={author.image} alt="author-image" />

                    <p> {author.name} </p>

                </div>

            </div>

        </div>

    )

}

interface Props {

    image: string,

    date: string,

    text: string,

    author: { image: string, name: string }

}
