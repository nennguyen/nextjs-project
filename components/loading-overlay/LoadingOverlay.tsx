'use client'

import React from 'react';
import { useSelector } from 'react-redux';
import "../../styles/loading-overlay.scss";

const LoadingOverlay = () => {
    const isLoading = useSelector((state) => state.loading.isLoading);

    return isLoading ? (
        <div className="loading-overlay">
            <div className="spinner"/>
        </div>
    ) : null;
};

export default LoadingOverlay;
