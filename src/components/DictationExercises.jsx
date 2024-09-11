import React from "react";
import styles from "./DictationExercises.module.css";
import { useLoaderData, useNavigate } from "react-router-dom";
import { getJWTToken } from "../helper_function/authentication";

import axios from "axios";
import { DictationExerciseItem } from "./DictationExerciseItem";
const apiUrl = import.meta.env.VITE_API_URL;

const loader = async ({ params }) => {
    // console.log(params);
    const res = await axios.get(`${apiUrl}/data/${params.topic}`, {
        headers: {
            Authorization: `Bearer ${getJWTToken() || "no_token"}`,
        },
    });
    console.log(res.data); // {status, data}
    const result = res.data;
    if (result.status) {
        return result.data;
    }
    return null;
};

const DictationExercises = () => {
    const navigate = useNavigate();
    const videos = useLoaderData();
    return (
        <>
            <div className={styles["container"]}>
                <div className={styles["title"]}>Title</div>
                <div>
                    {videos && videos.length > 0 && videos.map((item, idx) => <DictationExerciseItem item={item} />)}
                </div>
            </div>
        </>
    );
};

export { DictationExercises, loader };
