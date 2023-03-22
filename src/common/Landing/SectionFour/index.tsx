import React, { useEffect, useState } from "react";
import { ComponentHolder, DualArrows, FormField, Pagination } from "components";
import { ReviewItem } from "./ReviewItem";
import { useInView } from "react-cool-inview";
import { classnames } from "utils";
import { blogPostType } from "types";
import { ReadBlog } from "./ReadBlog";

export const SectionFour = () => {

    const [list, setList] = useState<{

        data: blogPostType[],

        page: number,

        perPage: number,

        searchString: string,

        selectedStory?: blogPostType,

        readTrigger: number

    }>({

        data: [],

        page: 1,

        perPage: 20,

        searchString: "",

        readTrigger: 0

    });

    const [presence, setPresence] = useState<boolean | "complete">(false);

    const { observe } = useInView({

        threshold: 0.5,

        onEnter: ({ unobserve }) => {

            setPresence(true);

            unobserve();

        }

    });

    useEffect(() => {

        fetch("/news.json")
            .then((res) => res.json())
            .then((res) => setList((prevState) => ({ ...prevState, data: res?.appleNews })))
            .catch((e) => console.log(e));

    }, []);

    return (

        <ComponentHolder

            className="section-four"

            bodyClass={classnames(

                "section-four-body",

                "lets-animate",

                presence && "transition-reveal"

            )}

            reffer={observe}

        >

            <>

                <div className="section-four-top">

                    <h1> A lot of Apple news just for you ! <br/>:) </h1>

                    <FormField

                        placeHolder={"Search for posts"}

                        onChange={(e) => setList((prevState) => ({ ...prevState, searchString: e }))}

                    />

                </div>

                <div className="section-four-bottom">

                    {list.data?.filter((_, index) => {

                        if (list.searchString) {

                            return (_.title.toLowerCase()).includes(list.searchString.toLowerCase())

                        }

                        const itemsToDisplayStart = (list.page - 1) * list.perPage;

                        const lowerLimit = itemsToDisplayStart;

                        const upperLimit = (list.page) * list.perPage;

                        if (index >= lowerLimit && index < upperLimit) {

                            return true;

                        }

                        return false;

                    }).map((item, index) =>

                        <ReviewItem

                            key={`review-item-${index}`}

                            onClick={() => {

                                setList((prevState) => ({

                                    ...prevState,

                                    readTrigger: prevState.readTrigger + 1,

                                    selectedStory: item

                                }))

                            }}

                            author={item.author}

                            position={item.publishedAt}

                            image={item.urlToImage}

                            text={item.title}

                        />

                    )}

                </div>

                <div className="section-four-pagination">

                    <Pagination

                        isMobile={false}

                        pages={(list?.data?.length || 0) / list.perPage}

                        page={list.page}

                        onClick={(pageAndPerPage) =>

                            setList((prevState) => ({

                                ...prevState,

                                page: pageAndPerPage.page,

                            }))

                        }

                        empty={list?.data?.length === 0}

                        perPage={20}

                    />


                </div>

                <ReadBlog trigger={list.readTrigger} post={list.selectedStory} />

            </>

        </ComponentHolder>

    );

}
