import React, { useEffect, useState } from "react";
import { Button, Modal, Star } from "components";
import { blogPostType } from "types";
import { classnames } from "utils";

export const ReadBlog: React.FC<{ trigger?: number, post?: blogPostType }> = ({ trigger, post }) => {

    const [state, setState] = useState<{
        visibility: boolean,
        post?: blogPostType,
        blogRating: number

    }>({
        visibility: false,
        blogRating: 0
    });

    const onExit = () => setState((prevState) => ({

        ...prevState,

        visibility: false,

        post: undefined,

        blogRating: 0

    }));

    const ratePost = (score: number) => {

        setState((prevState) => ({ ...prevState, blogRating: score }));

        const storageRef: any = localStorage.getItem("ratings");

        if (storageRef && JSON.parse(storageRef) && post) {

            const userRatedBlogs: { [key: string]: number } = JSON.parse(storageRef);

            userRatedBlogs[post.id] = score;

            localStorage.setItem("ratings", JSON.stringify(userRatedBlogs));

            return;

        }

        localStorage.setItem("ratings", JSON.stringify({ [post?.id || '']: score }));

    };

    useEffect(() => {

        if (trigger && trigger > 0) {

            let blogRating = 0;

            const storageRef: any = localStorage.getItem("ratings");

            if (storageRef && JSON.parse(storageRef) && post) {

                const userRatedBlogs: { [key: string]: number } = JSON.parse(storageRef);

                blogRating = userRatedBlogs?.[post?.id];

            }

            setState({ post: post, visibility: true, blogRating });

        }

        // eslint-disable-next-line
    }, [trigger]);

    return (

        <>

            <Modal

                visibility={state.visibility}

                toggleOut={() => onExit()}


            >

                <>

                    <h2 className="text-center color-darker mb-2 mt-1"> {post?.title} </h2>

                    <p className="text-center small-text color-darker mb-5"> {post?.description} </p>

                    <div className={classnames("section-four-blog-ratings", `rating-${state.blogRating || "0"}`)}>

                        <span onClick={() => ratePost(1)} dangerouslySetInnerHTML={{ __html: Star }} />

                        <span onClick={() => ratePost(2)} dangerouslySetInnerHTML={{ __html: Star }} />

                        <span onClick={() => ratePost(3)} dangerouslySetInnerHTML={{ __html: Star }} />

                        <span onClick={() => ratePost(4)} dangerouslySetInnerHTML={{ __html: Star }} />

                        <span onClick={() => ratePost(5)} dangerouslySetInnerHTML={{ __html: Star }} />

                    </div>

                    <Button

                        label={"Continue"}

                        onClick={() => onExit()}

                    />

                </>

            </Modal>

        </>

    );

}