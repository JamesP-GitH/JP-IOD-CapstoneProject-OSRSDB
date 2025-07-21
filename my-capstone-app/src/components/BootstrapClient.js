"use client";

// Courtesy of https://1manstartup.com/blogs/install-bootstrap-for-nextjs-app-router

import { useEffect } from "react";

// This component ensures Bootstrap's JavaScript is loaded in the browser
function BootstrapClient() {
    useEffect(() => {
        // Dynamically require Bootstrap JS on the client side
        require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }, []);

    // This component doesn't render anything — it just triggers the import
    return null;
}

export default BootstrapClient;
