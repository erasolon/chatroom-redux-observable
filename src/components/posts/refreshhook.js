import {useEffect} from "react";
import {Statuses} from "../../types";
import {useDispatch} from "react-redux";
import {poolPostsStart} from "../../actions/postActions";

export function RefreshPosts(props) {
    const dispatch = useDispatch()
    useEffect(() => {
               const id = setInterval(() => {
                if (props.props.status === Statuses.FETCHING_STATUS_COMPLETED) {
                    let dt = new Date(Math.max.apply(null, props.props.posts.map(function (e) {
                        return new Date(e.time);
                    })));
                    let dd = String(dt.getDate()).padStart(2, '0');
                    let MM = String(dt.getMonth() + 1).padStart(2, '0'); //January is 0!
                    let yyyy = dt.getFullYear();
                    let hh = dt.getHours();
                    let mm = dt.getMinutes();
                    let ss = dt.getSeconds();
                    let dtStr = yyyy + '-' + MM + '-' + dd + '-' + hh + '-' + mm + '-' + ss
                    dispatch(poolPostsStart(dtStr))
                }
            },
                20000);
            return () => clearInterval(id)
        },
        [props, dispatch]
    )
    return "";
}