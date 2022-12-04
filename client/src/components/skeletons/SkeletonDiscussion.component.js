import React from "react";
import Shimmer from "./shimmer.component";
import SkeletonElement from "./SkeletonElement.component";

const SkeletonDiscussion = () => {

    return (
        <div className="skeleton-wrapper">
            <div className="skeleton-discussion">
                <SkeletonElement type="title" />
            </div>
            <Shimmer />
        </div>
    );
};

export default SkeletonDiscussion;