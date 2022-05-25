import React, {useRef} from 'react';
import {useEffect, useState} from "react";
import axios from "axios";
import {Link, Pagination, Stack, TextField, PaginationItem} from "@mui/material";
import {Link as NavLink, useLocation} from 'react-router-dom';
import {createBrowserHistory} from "history";

const BASE_URL = 'http://hn.algolia.com/api/v1/search?';


const HomePage = () => {
    const location = useLocation();
    const { current: history } = useRef(createBrowserHistory({ window }))

    const [posts, setPosts] = useState([]);
    const [query, setQuery] = useState('js');
    const [page, setPage] = useState(parseInt(location.search?.split("=")[1] || 1));
    const [pageQuantity, setPageQuantity] = useState(0);
    useEffect(() => {
        axios.get(BASE_URL + `query=${query}&page=${page - 1}`).then(({data}) => {
            setPageQuantity(data.nbPages);
            setPosts(data.hits);
        })
    }, [page, query])

    return (<>
            <TextField
                fullWidth
                label="query"
                value={query}
                onChange={(event) => {
                    setQuery(event.target.value);
                    setPage(1);
                    history.replace('/');
                }}
            />

            <Stack spacing={2}>
                {!!pageQuantity && (
                    <Pagination
                        count={pageQuantity}
                        page={page}
                        onChange={(_, number) => setPage(number)}
                        sx={{marginY: 3, marginX: 'auto'}}
                        showFirstButton
                        showLastButton
                        renderItem={(item) => (
                            <PaginationItem
                                component={NavLink}
                                to={`/?page=${item.page}`}
                                {...item}
                            />
                        )}
                    />
                )}
                {posts.map(post => (
                    <Link
                        key={post.objectId}
                        href={post.url}
                    >
                        {post.title || post.story_title}
                    </Link>
                ))}
            </Stack>


        </>
    );
};

export default HomePage;